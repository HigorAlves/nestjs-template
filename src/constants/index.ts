import * as Dotenv from 'dotenv'
Dotenv.config()

export const MONGO_DB = {
  URL: process.env.DATABASE_URL
}

export const JWT = {
  secret: process.env.JWT_SECRET,
  duration: 60 * 60 * 8 // seconds - minutes - hours
}

export const SENTRY = {
  dsn: process.env.SENTRY_DSN
}

export const PORT = process.env.PORT || 8080
