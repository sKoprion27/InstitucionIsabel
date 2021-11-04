import M from 'materialize-css'

export const toastInit = (message, color) => {
  const options = {
    html: message || 'Toast',
    inDuration: 300,
    outDuration: 375,
    displyLength: 2500,
    classes: `rounded white-text ${color || 'green darken-1'}`,
    completeCallback: () => {
      console.log('dismissed')
    }
  }
  M.toast(options)
}
