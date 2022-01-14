declare type ClockTimer = {
  time: string;
  hours: number;
};

declare type AppContext = {
  user: User;
  isLoading: boolean;
  login: (credentials: Credentials) => void;
  logout: () => void;
  token: string;
  setToken: (token: string | boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  errors: ValidationError[];
  onClearError: (id: string) => void;
  onResetErrors: () => void;
};

declare type ValidationError = {
  message: string;
  id: string;
};

declare type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
  checkPassword: string;
};

declare type User = {
  id: string;
  username: string;
  email: string;
  customer: string;
  subscription: string;
};

declare type Credentials = {
  login: string;
  password: string;
};

declare type Plant = {
  id: number;
  name: string;
  model: string;
};

declare interface Inverter extends Plant {
  energy: number;
  power: number;
};

declare type Subscription = {
  id: string;
  product: Product;
  currency: string;
  trial: number;
  price: {
    amount: number;
    formatted: string;
  };
  frequency: string;
};

declare type Product = {
  id: string;
  description: string;
};