document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const closeButtons = document.querySelectorAll('.work-together-close-modal');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            email: formData.get('user-email'),
            comment: formData.get('message') 
        };

        try {
            const response = await fetch('https://portfolio.js.h.gotit.study/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 201) {
                const result = await response.json();
                console.log('Успешный ответ:', result);
                form.reset();
                successModal.style.display = 'block';
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || `Ошибка сервера: ${response.status}`);
            }

        } catch (error) {
            console.error('Ошибка запроса:', error);
            showError(error.message || 'Ошибка сети. Пожалуйста, проверьте соединение.');
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            successModal.style.display = 'none';
            errorModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target === successModal || event.target === errorModal) {
            successModal.style.display = 'none';
            errorModal.style.display = 'none';
        }
    });
});