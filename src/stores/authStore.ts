import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  image?: string;
  nickname: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  restoreSession: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  accessToken: null,

  login: (user, accessToken) => {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('user', JSON.stringify(user));
    set({ isLoggedIn: true, user, accessToken });
  },

  logout: () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    set({ isLoggedIn: false, user: null, accessToken: null });
  },

  restoreSession: () => {
    const token = sessionStorage.getItem('accessToken');
    const userStr = sessionStorage.getItem('user');
    if (token && userStr) {
      const user = JSON.parse(userStr);
      set({ isLoggedIn: true, user, accessToken: token });
    }
  },
}));

export default useAuthStore;
