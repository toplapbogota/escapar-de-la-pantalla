import five, { Board } from 'johnny-five';
import enablePins from './pins';


global.five = five

function handleIOReady(io) {
  return () => {
  console.log('handleIOReady')
  const board = global.board = new Board({ io, repl: false });
  board.on('message', (msg) => {
    console.log("board message: ", msg);
  });
  board.on('ready', () => {
    console.log('johnny five in browser !!!!');
    enablePins()
  });
  board.on('error', console.error);
  }
}

export default handleIOReady