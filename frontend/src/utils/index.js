export const formatDateTable = (date) => {
  const format = date.split('T').join(' ').split('.000Z')
  return format
}
export const formatKeyTable = (key) => {
  const format = key.replace(/_/g, ' ').toUpperCase()
  return format
}
