export const getDonor = (req, res) => {
  res.status(200).json({ message: 'GET donors' })
}

export const getOneDonor = (req, res) => {
  const { id } = req.params
  res.status(200).json({ message: 'GET this donor: ' + id })
}

export const postOneDonor = (req, res) => {
  res.status(201).json({ message: 'POST donor 😺' })
}

export const updateOneDonor = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'UPDATE this donor: ' + id + ' ✏️' })
}

export const deleteOneDonor = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'DELETE this donor: ' + id + ' 😢' })
}
