import './ui/gui'
import './polyfills/hrtime'

import Editor from './editor'
import handleEval from './evaluation'

const editorTextArea = document.querySelector('textarea')

const editor = new Editor(editorTextArea)

editor.on('eval', handleEval)