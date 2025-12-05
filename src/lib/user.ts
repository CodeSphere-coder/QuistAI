const USER_STORAGE_KEY = 'prabodha_user';

export interface UserProfile {
    username: string;
    age: number;
}

export const loadUser = (): UserProfile | null => {
    try {
        const stored = localStorage.getItem(USER_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored) as UserProfile;
        }
    } catch (error) {
        console.error('Failed to load user profile:', error);
    }
    return null;
};

export const saveUser = (profile: UserProfile): void => {
    try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
        console.error('Failed to save user profile:', error);
    }
};

export const clearUser = (): void => {
    try {
        localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear user profile:', error);
    }
};

