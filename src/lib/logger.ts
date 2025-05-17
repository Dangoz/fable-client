const isDevelopment = process.env.NODE_ENV !== 'production'

export const clientLogger = {
  info: (msg: string, ...args: any[]) => {
    if (isDevelopment) {
      console.info(`[CLIENT] ${msg}`, ...args)
    }
  },

  error: (msg: string, ...args: any[]) => {
    console.error(`[CLIENT] ${msg}`, ...args)
  },

  warn: (msg: string, ...args: any[]) => {
    console.warn(`[CLIENT] ${msg}`, ...args)
  },

  debug: (msg: string, ...args: any[]) => {
    if (isDevelopment) {
      console.debug(`[CLIENT] ${msg}`, ...args)
    }
  },
}
