export const getCFDI = (req, res) => {
  res.status(200).json({ message: 'GET CFDIs 🐧' })
}

export const getOneCFDI = (req, res) => {
  const { id } = req.params
  res.status(200).json({ message: 'GET this CFDI: ' + id + ' 🐨' })
}

export const postOneCFDI = (req, res) => {
  res.status(201).json({ message: 'POST CFDI 🐼' })
}

export const updateOneCFDI = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'PUT this CFDI: ' + id + ' 🐻' })
}

export const deleteOneCFDI = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'DELETE this CFDI: ' + id + ' 🦘' })
}
