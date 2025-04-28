document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeButtons = document.querySelectorAll('.work-together-close-modal');
    const body = document.body;
    let isSubmitting = false;

    function saveFormData() {
        const formData = {
            email: form.elements['user-email'].value.trim(),
            message: form.elements['message'].value.trim()
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

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateForm(email, message) {
        if (!email || !message) {
            iziToast.warning({
                title: 'Attention',
                message: 'All fields are required!',
                position: 'topRight',
                timeout: 3000
            });
            return false;
        }

        if (!validateEmail(email)) {
            iziToast.warning({
                title: 'Attention',
                message: 'Please enter a valid email address!',
                position: 'topRight',
                timeout: 3000
            });
            return false;
        }

        return true;
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
        if (e.key === 'Escape') closeModal();
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        const email = form.elements['user-email'].value.trim();
        const message = form.elements['message'].value.trim();

        if (!validateForm(email, message)) return;

        isSubmitting = true;
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            const response = await fetch('https://portfolio-js.b.goit.study/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    comment: message
                })
            });

            if (response.status === 201) {
                const result = await response.json();
                console.log('Success:', result);
                form.reset();
                localStorage.removeItem('contactFormData');
                openModal();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error sending message. Please try again later.');
            }
        } catch (error) {
            console.error('Request error:', error);
            iziToast.error({
                title: 'Error',
                message: error.message.includes('Failed to fetch') 
                    ? 'Connection error. Please check your internet and try again.' 
                    : error.message,
                position: 'topRight',
                timeout: 5000,
                progressBar: true,
                closeOnClick: true
            });
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            isSubmitting = false;
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    window.addEventListener('click', function(event) {
        if (event.target === successModal) closeModal();
    });
});