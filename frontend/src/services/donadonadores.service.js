import axios from 'axios'

export const donadores = {
  getDonors: async () => {
    const response = await axios.get('http://localhost:4000/donors/')
    const { resp } = response.data

    console.log(resp)

    return resp
  }
}
