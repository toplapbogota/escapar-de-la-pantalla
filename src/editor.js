import CodeMirror from 'codemirror-minified/lib/codemirror'
import 'codemirror-minified/mode/javascript/javascript'

export default class Editor {
  constructor(parent) {
    const opts = {
      mode: { name: 'javascript', globalVars: true },
      value: 'dosis',
      theme: 'tomorrow-night-eighties',
      extraKeys : this.extraKeys(),
      
    }
    this.cm = CodeMirror.fromTextArea(parent, opts)
    window.cm = this.cm
    this.cm.refresh()

    this.cm.setValue('\n \n console.log("Escapar de la pantalla") \n\n toplap Bogotá ::  CTRL+enter')
    
  }
  extraKeys(){
    self=this
    return {
      'Ctrl-Enter': function(cm) {
        var text = self.selectCurrentBlock(cm)
        self.localStorageSave(cm);
      },      
    }
  }
  selectCurrentBlock (cm) { // thanks to graham wakefield + gibber
    var pos = cm.getCursor()
     var startline = pos.line
    var endline = pos.line
    var currentText = cm.getLine(startline).trim();
    while (startline > 0 && currentText !== '') {
      startline--
      currentText = cm.getLine(startline).trim();
    }
    currentText = cm.getLine(endline).trim();
    while (endline < cm.lineCount() &&  currentText!== '') {
      endline++
      currentText = cm.getLine(endline).trim();
    }
    var pos1 = {
      line: startline,
      ch: 0
    }
    var pos2 = {
      line: endline,
      ch: 0
    }
    var str = cm.getRange(pos1, pos2)
    return str
    return {
      start: pos1,
      end: pos2,
      text: str
    }
  }
  localStorageSave(cm) {
    let lastCode = cm.doc.getValue();
    let stringToSave = JSON.stringify({code:lastCode})
    localStorage.setItem(APP_NAME,stringToSave)
  }
}
