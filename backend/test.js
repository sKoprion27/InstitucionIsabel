const string = 'http://res.cloudinary.com/institucionisabel/image/upload/v1636863417/donations/zhzimiky2ijcesgdevwz.jpg'

const getPublicId = (url) => {
  const arr = url.split('/')
  const path = `${arr[arr.length - 2]}/${arr[arr.length - 1].split('.')[0]}`
  return path
}

console.log(getPublicId(string))
