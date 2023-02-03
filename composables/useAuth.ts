import axios from "axios";
export const useAuth = () => {
  // user
  // email -> string
  // name -> string
  // created_at -> Date
  // updated_at -> Date
  // login
  interface LoginPayload {
    email: string;
    password: string;
  }
  async function login(payload: LoginPayload) {
    await axios.post("/login", payload);
    useRouter().push("/me");
  }
  // logout
  async function logout() {
    await axios.post("/logout");
    useRouter().replace("/login");
  }
  // register
  interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  async function register(payload: RegisterPayload) {
    await axios.post("/register", payload);
    await login({
      email: payload.email,
      password: payload.password,
    });
  }

  return {
    login,
    logout,
    register,
  };
};
