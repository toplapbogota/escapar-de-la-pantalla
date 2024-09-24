import { pinsManager, checkPins } from "./pins/pinsManager";

const pines = [];
let contadorIndice = 0;
let pines_global;
let intervalo = 1000;
let loopID = -1;
let loopIds = [];


function prender(...pinesID) {
  checkPins(pinesID, 'prender');
  console.log("pines : ", pinesID);

  for (let i = 0; i < pinesID.length; i++) {
    console.log(i);
    pinsManager.getPinById(pinesID[i]).high();
    // pines[pinesID[i]].high();
  }
}
global.prender = prender
global.encender = prender

function apagar(...pinesID) {
  checkPins(pinesID, 'prender');
  console.log("pines : ", pinesID);

  for (let i = 0; i < pinesID.length; i++) {
    console.log(i);
    pinsManager.getPinById(pinesID[i]).low();
  }
}

global.apagar = apagar

function onceArduino(...pinesID) {
  checkPins(pinesID, 'loopArduino');
  // let pines = pinsManager.j5Pins
  loopID = setInterval(() => { doLoopPins(pinesID, true) }, intervalo);
  loopIds.push(loopID);
}

global.onceArduino = onceArduino;

function cambiarIntervalo(argument) {
  intervalo = argument;
  clearInterval(loopID);
  loop();
}

global.cambiarIntervalo = cambiarIntervalo;

function loop(...pinesID) {
  checkPins(pinesID, 'loopArduino');
  // let pines = pinsManager.j5Pins
  if (pinesID.length !== 0) {
    pines_global = pinesID;
  }
  else {
    pinesID = pines_global;
  }


  loopID = setInterval(() => { doLoopPins(pinesID) }, intervalo)
  loopIds.push(loopID);
}

global.loop = loop

function detenerLoop() {
  clearInterval(loopID)
}

global.detenerLoop = detenerLoop

function apagarTodo() {
  const pins = pinsManager.pins;
  console.log('apagarTodo : ', pins);
  pinsManager.stopAll();
  clearInterval(loopID)
  loopID = null;
  loopIds.forEach(x => {
    clearInterval(x)

  })
  // apagarServos();
  apagarPinesSimultaneos();
}

function apagarPinesSimultaneos() {
  if (pinesSimultaneos) {
    pinesSimultaneos.forEach(function (pin_object) {
      clearTimeout(pin_object.init_id)
      clearTimeout(pin_object.stop_id)
    })
    pinesSimultaneos.length = 0;
  }
}

global.apagarTodo = apagarTodo

let pinesSimultaneos;
/**
 * 
 * @param  {...any} pinesData a list of {pin,start,lapse} objects
 */
function simultaneos(...pinesData) {
  apagarPinesSimultaneos();
  //console.log("PinesData : ",PinesData);
  var pinesIds = pinesData.map(pinDatum => pinDatum.pin);
  let fivePins = checkPins(pinesIds, 'sameTime');
  // return;
  pinesSimultaneos = pinesData;
  for (var i = 0; i < pinesData.length; i++) {
    let pinId = pinesData[i].pin;
    pinesData[i].id = i;
    pinesData[i].fivePin = pinsManager.getPinById(pinId);
    pinesData[i].ciclo = function () {
      this.init_id = setTimeout(() => {
        console.log('start', this.pin);
        this.fivePin.high();
        this.stop_id = setTimeout(() => {
          console.log('stop', this.pin);
          this.fivePin.low();
          pinesSimultaneos[this.id].ciclo();
        },
          this.lapse * 1000)
      }, this.start * 1000)
    }
    pinesData[i].ciclo();

  }

}

global.simultaneos = simultaneos


function doLoopPins(pinesID, isOnce = false) {

  console.log('-------------------------------')
  let currentId = pinesID[contadorIndice];
  let previousId;
  let lastId = pinesID[pinesID.length - 1];
  pinsManager.getPinById(currentId).high();
  // pines[].high();

  if (contadorIndice > 0) {
    previousId = pinesID[contadorIndice - 1];
    pinsManager.getPinById(previousId).low();
    // pines[previousId].low();
  }
  else {
    pinsManager.getPinById(lastId).low();
    // pines[lastId].low();   
  }

  contadorIndice++;

  if (contadorIndice >= pinesID.length) {
    contadorIndice = 0;
    if (isOnce) clearInterval(loopID);
  }


}