import initFirmata from "../io/firmata"

function handleStart() {
  console.log('handleStart')
  try{

    initFirmata()
  }catch(err){
    console.log(err)
  }
}

export default handleStart