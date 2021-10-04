export const getState = (req, res) => {
  res.status(200).json({ message: 'GET States 🍕' })
}

export const getOneState = (req, res) => {
  const { id } = req.params
  res.status(200).json({ message: 'GET this State: ' + id + ' 🍦' })
}

export const postOneState = (req, res) => {
  res.status(201).json({ message: 'POST State 🍩' })
}

export const updateOneState = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'PUT this State: ' + id + ' 🍟' })
}

export const deleteOneState = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'DELETE this State: ' + id + ' 🥞' })
}
