declare global {
  interface Window {}

  namespace NodeJS {
    interface ProcessEnv {
    }
  }
}
