import M from 'materialize-css'

export const toastInit = (message, color) => {
  const options = {
    html: message || 'Toast',
    inDuration: 300,
    outDuration: 375,
    displayLength: color ? 2000 : 700,
    classes: `rounded white-text ${color || 'green darken-1'}`,
    completeCallback: () => {
      console.log('Finish alert')
    }
  }
  M.toast(options)
}
