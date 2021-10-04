import { response } from './../utils/response'
import { createToken } from './../lib/auth'

const mockup = {
  id: 100,
  email: 'danielcu@isabel.com',
  password: 'passwd'
}
export const login = async (req, res) => {
  const { email, password } = req.body

  if (!(email === mockup.email)) {
    response(req, res, 'Email ivalid', 400)
    return
  }

  if (!(password === mockup.password)) {
    response(req, res, 'Password invalid', 400)
    return
  }

  const token = createToken({ payload: mockup.id })
  response(req, res, token, 200)
}
