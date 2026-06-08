export type UserRole = "user" | "admin";

export type PaymentMethod = "pix" | "card" | "bank";

export type UserProfile = {
  id: string;
  matricula: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethod: PaymentMethod;
  role: UserRole;
  balance: number;
  bonusBalance: number;
  cashbackEarned: number;
  createdAt: string;
  kycVerified: boolean;
};

export type RegisterFormData = {
  fullName: string;
  cpf: string;
  birthDate: string;
  matricula: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  city: string;
  state: string;
  zip: string;
  password: string;
  confirmPassword: string;
  paymentMethod: PaymentMethod;
  pixKey: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  acceptTerms: boolean;
};

export const EMPTY_REGISTER: RegisterFormData = {
  fullName: "",
  cpf: "",
  birthDate: "",
  matricula: "",
  email: "",
  phone: "",
  street: "",
  number: "",
  city: "",
  state: "",
  zip: "",
  password: "",
  confirmPassword: "",
  paymentMethod: "pix",
  pixKey: "",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  acceptTerms: false,
};
