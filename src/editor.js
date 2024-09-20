import CodeMirror from 'codemirror-minified/lib/codemirror'
import 'codemirror-minified/mode/javascript/javascript'
export default class Editor {
  constructor(parent) {
    const opts = {
      mode: { name: 'javascript', globalVars: true },
      value: 'dosis',
      theme: 'tomorrow-night-eighties',
      
    }
    this.cm = CodeMirror.fromTextArea(parent, opts)
    window.cm = this.cm
    this.cm.refresh()

    this.cm.setValue('\n \n // Escapar de la pantalla ::  CTRL+shift+enter')
    
  }
}
