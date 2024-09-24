const pines = [];
let contadorIndice = 0;
let pines_global;
let intervalo = 1000;
let loopID = -1;


export default function enablePins() {
  {
    for (let i = 0; i < 13; i++) {
      var pin = new five.Pin({ pin: i, mode: 1 });
      pines.push(pin);
      pin.low();
    }
    console.log("pins.js: start!!!, pines", pines);
  }
}

function prender(...pinesID) {
  console.log("pines : ", pinesID);

  for (let i = 0; i < pinesID.length; i++) {
    const pin = pines[pinesID[i]]
    console.log('pin: ', pin);
    pin.high();
  }
}
global.prender = prender
global.encender = prender

function apagar(...pinesID) {
  console.log("pines : ", pinesID);

  for (let i = 0; i < pinesID.length; i++) {
    pines[pinesID[i]].low();
  }
}

global.apagar = apagar

function onceArduino(...pinesID) {
  console.log("pines : ", pinesID);

  pines_global = pinesID;


  loopID = setInterval(() => {
    pines[pinesID[contadorIndice]].high();

    if (contadorIndice > 0) {
      pines[pinesID[contadorIndice - 1]].low();
    }

    contadorIndice++;

    if (contadorIndice >= pinesID.length) {
      clearInterval(loopID)
    }

  }, intervalo)
}

global.onceArduino = onceArduino;

function cambiarIntervalo(argument) {
  intervalo = argument;
  clearInterval(loopID);
  loop();
}

global.cambiarIntervalo = cambiarIntervalo;

function loop(...pinesID) {
  console.log("pines : ", pinesID);

  if (pinesID.length !== 0) {
    pines_global = pinesID;
  }
  else {
    pinesID = pines_global;
  }


  loopID = setInterval(() => {
    pines[pinesID[contadorIndice]].high();

    if (contadorIndice > 0) {
      pines[pinesID[contadorIndice - 1]].low();
    }
    else {
      pines[pinesID[pinesID.length - 1]].low();
    }

    contadorIndice++;

    if (contadorIndice >= pinesID.length) {
      contadorIndice = 0;
    }

  }, intervalo)
}

global.loopArduino = loop

function detenerLoop() {
  clearInterval(loopID)
}

global.detenerLoop = detenerLoop

function apagarTodo() {
  for (let i = 0; i < 13; i++) {
    var pin = pines[i];
    pin.low();
  }
  if (pinesSimultaneos) {
    pinesSimultaneos.forEach(function (pin_object) {
      clearTimeout(pin_object.init_id)
      clearTimeout(pin_object.stop_id)
    })
  }
  apagarServos();
}

global.apagarTodo = apagarTodo

let pinesSimultaneos;
function simultaneos(...PinesData) {
  //console.log("PinesData : ",PinesData);
  pinesSimultaneos = PinesData;
  for (var i = 0; i < PinesData.length; i++) {
    PinesData[i].id = i;
    PinesData[i].ciclo = function () {
      this.init_id = setTimeout(() => {
        console.log('start', this.pin);
        pines[this.pin].high();
        this.stop_id = setTimeout(() => {
          console.log('stop', this.pin);
          pines[this.pin].low();
          pinesSimultaneos[this.id].ciclo();
        },
          this.lapse * 1000)
      }, this.start * 1000)
    }
    PinesData[i].ciclo();

  }
}

global.simultaneos = simultaneos
