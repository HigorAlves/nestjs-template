export interface IUser {
  email: string
  password: string
  birthday: { day: number; month: number; year: number }
  firstName: string
  gender: boolean
  image: string
  lastName: string
  locale: { currency: 'BRL' | 'USD'; language: 'Portuguese' | 'English' }
  role: 'client' | 'admin'
}
