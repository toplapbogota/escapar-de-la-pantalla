import './ui/gui'
import './polyfills/hrtime'

import Editor from './editor'

const editorTextArea = document.querySelector('textarea')

new Editor(editorTextArea)