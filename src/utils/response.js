
export const response = (req, res, msg = '', data = {}, statusCode) => {
  console.log(statusCode)
  res.status(statusCode).json({
    message: msg,
    response: data
  })
  return
}
