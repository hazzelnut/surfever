// Turns xxxxxxxxxx into (xxx) xxx-xxxx
export function normalizeTel(value: string, previousValue: string) {
  // only allows 0-9 inputs
  const currentValue = value.replace(/[^\d]/g, '')
  const cvLength = currentValue.length 

  if (!previousValue || value.length > previousValue.length) {

    // returns: "x", "xx", "xxx"
    if (cvLength < 4) return currentValue 

    // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}` 

    // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}` 
  }
  
  // If value empty, return it
  return value
}

// Turns (xxx) xxx-xxxx into xxxxxxxxxx
export function stripTel(value: string) {
  return value.replace(/(-|\(|\))|\s+/g, '')
}

export function normalizeCode(value: string) {
  if (!value) return value

  return value.replace(/[^a-z|A-Z]+/g, '').toUpperCase()
}
