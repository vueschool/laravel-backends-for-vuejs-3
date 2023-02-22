import axios from "axios";
import type { User, LoginPayload, RegisterPayload } from "@/types";

const user = ref<User | null>(null);
export const useAuth = () => {
  async function getUser(): Promise<User | null> {
    if (user.value) return user.value;
    try {
      const res = await axios.get("/user");
      const user = res.data;
      return {
        ...user,
        created_at: new Date(user.created_at),
        updated_at: new Date(user.updated_at),
        email_verified_at: user.email_verified_at
          ? new Date(user.email_verified_at)
          : null,
        two_factor_confirmed_at: user.two_factor_confirmed_at
          ? new Date(user.two_factor_confirmed_at)
          : null,
      };
    } catch (err) {
      return null;
    }
  }

  async function initUser() {
    user.value = await getUser();
  }

  async function login(payload: LoginPayload) {
    await axios.post("/login", payload);
    useRouter().push("/me");
  }
  async function logout() {
    await axios.post("/logout");
    user.value = null;
    useRouter().replace("/login");
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
    initUser,
    user,
  };
};
