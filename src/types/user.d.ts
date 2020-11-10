export type IUser = {
  id?: string;
  firstName: string;
  lastName: string;
  gender: boolean;
  image: string;
  birthdate: {
    day: number;
    month: number;
    year: number;
  };
  email: string;
  locale: {
    currency: 'BRL' | 'USD';
    language: 'Portuguese' | 'English';
  };
  role: 'admin' | 'client';
};
