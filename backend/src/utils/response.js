
export const response = (req, res, dataMessage, statusCode) => {
  res.status(statusCode).json({ data: dataMessage })
  return
}
