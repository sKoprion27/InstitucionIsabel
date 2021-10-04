const bcrypt = require('bcrypt')
const saltRounds = 10

const salt = bcrypt.genSaltSync(saltRounds)

export const encrypt = {
  createHash: (data) => {
    const hash = bcrypt.hashSync(data, salt)
    return hash
  },
  compareHashPassword: async (data, user) => {
    const match = await bcrypt.compare(data, user.password)
    if (match) {
      return true
    } else {
      return false
    }
  }
}
