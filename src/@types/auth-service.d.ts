export interface AuthServiceProps {
    login: (username: string, password: string) => any;
    isLoggedIn: boolean;
    logout: () => void;
    refreshAccessToken: () => Promise<void>
    register: (username: string, password: string, email: string, image: File | null) => Promise<any>;
}