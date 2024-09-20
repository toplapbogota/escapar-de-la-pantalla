import GUI from 'lil-gui'; 
import init from '../init.js';
const gui = new GUI();

gui.add(window.location,'reload')

gui.add({init},'init')

export default gui