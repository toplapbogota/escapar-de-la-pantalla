import GUI from 'lil-gui'; 
import handleStart from '../serial/handleStart';
const gui = new GUI();

gui.add(window.location,'reload')

gui.add({handleStart},'handleStart')

export default gui