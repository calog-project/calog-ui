import {create} from "zustand"

interface AuthState {
  isLoggedIn: boolean;
  user: { email: string } | null;
  login: (email: string, accessToken: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (email, accessToken) => {
    //TODO 세션스토리지에 액세스토큰 저장
    sessionStorage.setItem('accessToken', accessToken);
    set({ isLoggedIn: true, user: { email } });
  },
  logout: () => {
    //TODO 세션스토리지에 액세스토큰 삭제
    sessionStorage.removeItem('accessToken');
    set({ isLoggedIn: false, user: null });
  },
}));

export default useAuthStore;