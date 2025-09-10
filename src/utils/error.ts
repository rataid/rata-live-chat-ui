class CustomError extends Error {
  constructor(message: any) {
    console.error(message)
    super(`\n\n\n${message}`)
    this.name = 'Die and dump'
  }
}

export const dd = (anyVariable: any) => {
  if (typeof anyVariable === 'string') {
    throw new CustomError(anyVariable)
  } else {
    throw new CustomError(JSON.stringify(anyVariable, null, 2))
  }
}
