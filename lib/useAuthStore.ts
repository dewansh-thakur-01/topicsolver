import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: number;
}

interface StoredAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // Stored client/server hash
  createdAt: number;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  registeredAccounts: Record<string, StoredAccount>; // email -> account
  
  // Actions
  signIn: (email: string, password: string) => { success: boolean; message: string };
  signUp: (name: string, email: string, password: string) => { success: boolean; message: string; alreadyRegistered?: boolean };
  signOut: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

// Simple hash generator for client persistent security
function hashPassword(pwd: string): string {
  let hash = 0;
  for (let i = 0; i < pwd.length; i++) {
    const char = pwd.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + pwd.length;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      registeredAccounts: {
        'kailash@example.com': {
          id: 'usr_kailash_default',
          name: 'Kailash',
          email: 'kailash@example.com',
          passwordHash: hashPassword('password123'),
          createdAt: Date.now() - 86400000
        },
        'student@example.com': {
          id: 'usr_student_demo',
          name: 'Student User',
          email: 'student@example.com',
          passwordHash: hashPassword('student123'),
          createdAt: Date.now() - 86400000 * 2
        }
      },

      signUp: (name: string, email: string, password: string) => {
        const cleanEmail = email.toLowerCase().trim();
        const cleanName = name.trim() || cleanEmail.split('@')[0];
        const state = get();

        if (!cleanEmail || !password) {
          return { success: false, message: 'Email and password are required.' };
        }

        if (password.length < 6) {
          return { success: false, message: 'Password must be at least 6 characters long.' };
        }

        // Check if email already registered
        if (state.registeredAccounts[cleanEmail]) {
          return {
            success: false,
            alreadyRegistered: true,
            message: 'An account with this email already exists. Please Sign In with your password.'
          };
        }

        const newAccount: StoredAccount = {
          id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
          name: cleanName,
          email: cleanEmail,
          passwordHash: hashPassword(password),
          createdAt: Date.now()
        };

        const authUser: AuthUser = {
          id: newAccount.id,
          name: newAccount.name,
          email: newAccount.email,
          createdAt: newAccount.createdAt
        };

        set((s) => ({
          registeredAccounts: {
            ...s.registeredAccounts,
            [cleanEmail]: newAccount
          },
          user: authUser,
          token: 'jwt_tok_' + newAccount.id,
          isAuthenticated: true
        }));

        return {
          success: true,
          message: `Welcome to Topic Solver, ${cleanName}!`
        };
      },

      signIn: (email: string, password: string) => {
        const cleanEmail = email.toLowerCase().trim();
        const state = get();

        if (!cleanEmail || !password) {
          return { success: false, message: 'Please provide both email and password.' };
        }

        const account = state.registeredAccounts[cleanEmail];

        if (!account) {
          return {
            success: false,
            message: 'No account found with this email. Please Sign Up first.'
          };
        }

        const expectedHash = hashPassword(password);
        if (account.passwordHash !== expectedHash) {
          return {
            success: false,
            message: 'Incorrect password. Please verify and try again.'
          };
        }

        const authUser: AuthUser = {
          id: account.id,
          name: account.name,
          email: account.email,
          createdAt: account.createdAt
        };

        set({
          user: authUser,
          token: 'jwt_tok_' + account.id,
          isAuthenticated: true
        });

        return {
          success: true,
          message: `Welcome back, ${account.name}!`
        };
      },

      signOut: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      updateUser: (updates: Partial<AuthUser>) => {
        set((state) => {
          if (!state.user) return state;
          const updatedUser = { ...state.user, ...updates };
          return {
            user: updatedUser,
            registeredAccounts: {
              ...state.registeredAccounts,
              [updatedUser.email]: {
                ...state.registeredAccounts[updatedUser.email],
                name: updatedUser.name
              }
            }
          };
        });
      }
    }),
    {
      name: 'topic_solver_auth_session'
    }
  )
);
