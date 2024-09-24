function handleEval(codeText) {
  console.log('handleEval codeText: ', codeText);
  window.eval(codeText)
}

export default handleEval;