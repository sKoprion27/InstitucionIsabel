import { response } from './../utils/response'
// GET, POST, PUT, DELETE

// GET ALL
export const getUsers = (req, res) => {
  response(req, res, 'GET users', 200)
}

// GET ONE
export const getOneUser = (req, res) => {
  const { id } = req.params
  console.log('Usuario que quiero consultar', id)
  response(req, res, `GET ONE user ${id}`, 200)
}

// POST ONE

export const postOneUser = (req, res) => {
  const userToPost = req.body
  console.log(userToPost)
  response(req, res, `POST ONE user ${JSON.stringify(userToPost)}`, 201)
}

// UPDATE ONE
export const updateOneUser = (req, res) => {
  console.log('ID to UPDATE 😀', req.params.id)
  response(req, res, 'PUT ONE user', 201)
}

// DELETE ONE
export const deleteOneUser = (req, res) => {
  console.log('ID to DELETE 😀', req.params.id)
  response(req, res, 'DELETE ONE user', 201)
}
