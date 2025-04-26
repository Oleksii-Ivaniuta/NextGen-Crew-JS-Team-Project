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
// кнопка авто теми увімкнена
function autoThemeBtnActive() {
    refs.autoThemeBtn.style.color = "#f0f0f0";
    refs.autoThemeBtn.style.background = "var(--accet-green)";
}
// кнопка авто теми вимкнена
function autoThemeBtnNotActive() {
    refs.autoThemeBtn.style.color = "#00b068";
    refs.autoThemeBtn.style.background = "#bbbbbb";
}

// функція переключення теми за допомогою кнопки toggle;
export function toggleTheme() {
    refs.body.classList.toggle("dark");
    autoThemeBtnNotActive();
    if (refs.body.classList.contains("dark")) {
        saveToLocalStorage('theme', 'dark');
    }
    else {
        saveToLocalStorage('theme', 'light');
    }
    console.log(`toggle theme`);
}

// функція яка повертає до автоматичного вибору теми залежно від часу доби за допомогою кнопки auto;
export function setAutoTheme() {
    removeFromLocalStorage('theme');
    setThemeByTime();
    autoThemeBtnActive();
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
        autoThemeBtnNotActive();
    }
    else if (loadFromLocalStorage('theme') === 'dark') {
        setDarkTheme();
        autoThemeBtnNotActive();
    }
    else {
        setThemeByTime();
    }
}



// запуск функції встановлення теми, спрацьовує при кожному завантаженні сторінки;
setTheme();



refs.toggleThemeBtn.addEventListener("click", toggleTheme);
refs.autoThemeBtn.addEventListener("click", setAutoTheme);