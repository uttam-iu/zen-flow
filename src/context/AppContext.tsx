'use client';

import { PROJECT_TYPE } from '@/types/project.types';
import { USER_TYPE } from '@/types/user.types';
import { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
    user: USER_TYPE | null;
    theme: 'light' | 'dark';
    project: PROJECT_TYPE | null;
}

interface AppContextType {
    state: AppState;
    setUser: (user: USER_TYPE | null) => void;
    setProject: (project: PROJECT_TYPE | null) => void;
    toggleTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AppState>({
        user: null,
        theme: 'light',
        project: null,
    });

    const setUser = (user: USER_TYPE | null): void => {
        setState((prev) => ({ ...prev, user }));
    };

    const setProject = (project: PROJECT_TYPE | null): void => {
        setState((prev) => ({ ...prev, project }));
    };

    const toggleTheme = (): void => {
        setState((prev) => ({
            ...prev,
            theme: prev.theme === 'light' ? 'dark' : 'light',
        }));
    };

    return (
        <AppContext.Provider value={{ state, setUser, setProject, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(AppContext);
    if (context === undefined) {
        console.log('context')
        // throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
}
