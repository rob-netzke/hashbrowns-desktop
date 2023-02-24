const btn = document.getElementById('btn')
const copyBtn = document.getElementById('copy')
const algorithm = document.getElementById('algos')
const outputSize = document.getElementById('outputSize')
const inputString = document.getElementById('inputString')
const outputText = document.getElementById('outputString')

btn.addEventListener('click', async () => {
  const text = inputString.value
  const algo = algorithm.value
  const size = outputSize.value
  const encryption = await window.electronAPI.encrypt(text, algo, size)
  outputText.innerText = encryption
})

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(outputText.innerText)
  alert("Hash copied to clipboard!")
})