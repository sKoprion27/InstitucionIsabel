const bcrypt = require('bcrypt')
const saltRounds = 10

const salt = bcrypt.genSaltSync(saltRounds)

export const encrypt = {
  createHash: (data) => {
    const hash = bcrypt.hashSync(data, salt)
    return hash
  },
  compareHashPassword: async (password, hash) => {
    const match = await bcrypt.compareSync(password, hash)
    console.log('MATCH PASWORD', match)
    if (match) {
      return true
    } else {
      return false
    }
  }
}
