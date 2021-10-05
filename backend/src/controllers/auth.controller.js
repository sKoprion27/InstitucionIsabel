import { response } from './../utils/response'
import { auth } from './../lib/auth'

const mockup = {
  id: 100,
  email: 'danielcu@isabel.com',
  password: 'passwd'
}
export const login = async (req, res) => {
  const { email, password } = req.body

  if (!(email === mockup.email)) {
    response(req, res, 'LOGIN', 'invalid email', 400)
    return
  }

  if (!(password === mockup.password)) {
    response(req, res, 'LOGIN', 'invalid password', 400)
    return
  }

  const token = auth.createToken({ payload: mockup.id })
  response(req, res, 'LOGIN', token, 200)
}
