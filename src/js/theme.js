import { refs } from "./refs";
import { loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "./storage";

// встановлення темної теми;
function setDarkTheme() {
    refs.body.classList.add("dark");
    console.log('set dark theme');
    
}

// встановлення світлої теми;
function setLightTheme() {
    refs.body.classList.remove("dark");
    console.log('set light theme');
}

// функція переключення теми за допомогою кнопки в хедері (її потрібно повісити на слухач подій на цю кнопку);
export function toggleTheme() {
    refs.body.classList.toggle("dark");
    if (refs.body.classList.contains("dark")) {
        saveToLocalStorage('theme', 'dark');
    }
    else {
        saveToLocalStorage('theme', 'light');
    }
    console.log(`toggle theme`);
}

// функція яка повертає до автоматичного вибору теми залежно від часу доби (повісити на слухач подій спеціальної кнопки, якщо така буде);
export function setAutoTheme() {
    removeFromLocalStorage('theme');
    setThemeByTime();
}

// функція встановлення теми за часом доби;
function setThemeByTime() {
  const hour = new Date().getHours();
    const isDark = hour >= 20 || hour < 7;  
    if (isDark) {
        setDarkTheme();
    }
    else {
        setLightTheme();
    }
}

// функція встановлення теми при завантаженні сторінки;
function setTheme() {
    if (loadFromLocalStorage('theme') === 'light') {
        setLightTheme();
    }
    else if (loadFromLocalStorage('theme') === 'dark') {
        setDarkTheme();
    }
    else {
        setThemeByTime();
    }
}


// запуск функції встановлення теми, спрацьовує при кожному завантаженні сторінки;
setTheme();

