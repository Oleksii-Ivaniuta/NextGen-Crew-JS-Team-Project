// збереження до локал сторадж
export function saveToLocalStorage(id, element) {
    localStorage.setItem(id, JSON.stringify(element));
}


// завантаження з локал сторадж
export function loadFromLocalStorage(id) {
    try {
           const data = JSON.parse(localStorage.getItem(id));
    return data;
   }
    catch (error) {
        console.log(`load from local storage ${error}`);
        }
}

// видалення з локал сторадж
export function removeFromLocalStorage(id) {
    localStorage.removeItem(id);
}