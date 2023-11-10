export default function debounce (callback: Function, timeout = 300) {
  let timer: number
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => { 
      callback.apply(this, args) 
    }, timeout)
  }
}
