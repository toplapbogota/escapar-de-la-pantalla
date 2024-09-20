import initFirmata from "../io/firmata"

function handleStart(onInit) {
  console.log('handleStart')
  try{

    initFirmata(onInit)
  }catch(err){
    console.log(err)
  }
}

export default handleStart