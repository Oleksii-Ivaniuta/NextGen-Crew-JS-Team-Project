document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const closeButtons = document.querySelectorAll('.work-together-close-modal');
    const body = document.body;

    function closeAllModals() {
        successModal.style.display = 'none';
        errorModal.style.display = 'none';
        body.style.overflow = 'auto'; 
        document.removeEventListener('keydown', handleKeyDown); 
    }

    function openModal(modal) {
        modal.style.display = 'block';
        body.style.overflow = 'hidden'; 
        document.addEventListener('keydown', handleKeyDown); 
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            email: formData.get('user-email'),
            comment: formData.get('message') 
        };

        try {
            const response = await fetch('https://portfolio-js.b.goit.study/api/requests', {
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
                openModal(successModal);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error sending message. Please try again.');
            }

        } catch (error) {
            console.error('Ошибка запроса:', error);
            errorMessage.textContent = error.message.includes('Failed to fetch') 
                ? 'Error sending message. Please try again.' 
                : error.message;
            openModal(errorModal);
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    window.addEventListener('click', function(event) {
        if (event.target === successModal || event.target === errorModal) {
            closeAllModals();
        }
    });
});