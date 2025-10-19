import {create} from 'zustand';

export const useThemeStore = create((set, get) => ({
    theme: localStorage.getItem('preferred-theme') || 'forest',
    setTheme: (theme) => {
        localStorage.setItem('preferred-theme', theme);
        document.documentElement.setAttribute("data-theme", theme);
        set({theme});
    },
    
}));


