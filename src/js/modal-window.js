document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const closeButtons = document.querySelectorAll('.work-together-close-modal');

    // Проверка элементов
    if (!form || !successModal || !errorModal || !errorMessage || closeButtons.length === 0) {
        console.error('Не все элементы найдены! Проверьте классы и ID');
        return;
    }

    // Обработчик отправки формы
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            email: formData.get('user-email'),
            message: formData.get('message'),
            userId: 1 // Тестовый ID для JSONPlaceholder
        };

        try {
            // Отправка на тестовый API JSONPlaceholder
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            const result = await response.json();
            console.log('Тестовый ответ:', result);
            
            // Успешная отправка
            form.reset();
            successModal.style.display = 'block';

        } catch (error) {
            console.error('Ошибка запроса:', error);
            showError(error.message || 'Network error. Please check your connection.');
        }
    });

    // Функция для показа ошибки
    function showError(message) {
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
    }

    // Закрытие модальных окон
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            successModal.style.display = 'none';
            errorModal.style.display = 'none';
        });
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target === successModal || event.target === errorModal) {
            successModal.style.display = 'none';
            errorModal.style.display = 'none';
        }
    });
});