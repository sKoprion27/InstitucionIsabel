import '@babel/polyfill'
import { PORT, app } from './app'

async function main() {
  await app.listen(PORT)
  console.log(`http://localhost:${PORT} 🚀 CODESK_SERVIDOR`)
}

main()
