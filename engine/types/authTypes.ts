export interface RegisterRequest { email: string; password: string; displayName?: string }
export interface LoginRequest { email: string; password: string }
export interface AuthResponse { token: string; userId: string }
