declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PG_URI: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
      NEXTAUTH_URL: string
      JWT_SECRET: string
    }
  }
}

export {}
