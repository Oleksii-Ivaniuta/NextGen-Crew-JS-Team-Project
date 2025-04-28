document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeButtons = document.querySelectorAll('.work-together-close-modal');
    const body = document.body;

    function saveFormData() {
        const formData = {
            email: form.elements['user-email'].value,
            message: form.elements['message'].value
        };
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    }

    function restoreFormData() {
        const savedData = localStorage.getItem('contactFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            form.elements['user-email'].value = formData.email || '';
            form.elements['message'].value = formData.message || '';
        }
    }

    restoreFormData();

    form.addEventListener('input', saveFormData);

    function closeModal() {
        successModal.style.display = 'none';
        body.style.overflow = 'auto'; 
        document.removeEventListener('keydown', handleKeyDown); 
    }

    function openModal() {
        successModal.style.display = 'block';
        body.style.overflow = 'hidden'; 
        document.addEventListener('keydown', handleKeyDown); 
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeModal();
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
                localStorage.removeItem('contactFormData');
                openModal();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error sending message. Please try again.');
            }

        } catch (error) {
            console.error('Ошибка запроса:', error);
            iziToast.error({
                title: 'Error',
                message: error.message.includes('Failed to fetch') 
                    ? 'Error sending message. Please try again.' 
                    : error.message,
                position: 'topRight',
                timeout: 5000,
                progressBar: true,
                closeOnClick: true
            });
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            closeModal();
        }
    });
});