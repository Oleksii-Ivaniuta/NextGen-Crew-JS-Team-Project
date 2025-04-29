
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const emailInput = form.elements['user-email'];
    const messageInput = form.elements['message'];
    let isSubmitting = false;

    const checkMark = document.createElement('div');
    checkMark.innerHTML = '✓';
    checkMark.style.position = 'absolute';
    checkMark.style.right = '8px';
    checkMark.style.top = '50%';
    checkMark.style.transform = 'translateY(-50%)';
    checkMark.style.width = '16px';
    checkMark.style.height = '16px';
    checkMark.style.borderRadius = '50%';
    checkMark.style.backgroundColor = '#4CAF50';
    checkMark.style.color = 'white';
    checkMark.style.display = 'flex';
    checkMark.style.alignItems = 'center';
    checkMark.style.justifyContent = 'center';
    checkMark.style.fontSize = '12px';
    checkMark.style.display = 'none';
    
    const inputWrapper = document.createElement('div');
    inputWrapper.style.position = 'relative';
    inputWrapper.style.display = 'inline-block';
    inputWrapper.style.width = '100%';
    emailInput.parentNode.insertBefore(inputWrapper, emailInput);
    inputWrapper.appendChild(emailInput);
    inputWrapper.appendChild(checkMark);

    const errorElement = document.createElement('div');
    errorElement.textContent = 'Invalid email, try again';
    errorElement.style.color = '#FF5252';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    errorElement.style.display = 'none';
    inputWrapper.parentNode.insertBefore(errorElement, inputWrapper.nextSibling);

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function updateEmailValidation() {
        const email = emailInput.value.trim();
        if (email.length === 0) {
            checkMark.style.display = 'none';
            emailInput.style.borderColor = '';
            errorElement.style.display = 'none';
        } else if (validateEmail(email)) {
            checkMark.style.display = 'flex';
            emailInput.style.borderColor = '#4CAF50';
            errorElement.style.display = 'none';
        } else {
            checkMark.style.display = 'none';
            emailInput.style.borderColor = '#FF5252';
            errorElement.style.display = 'block';
        }
    }

    emailInput.addEventListener('input', function() {
        updateEmailValidation();
        saveFormData();
    });

    function saveFormData() {
        const formData = {
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    }

    function restoreFormData() {
        const savedData = localStorage.getItem('contactFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            emailInput.value = formData.email || '';
            messageInput.value = formData.message || '';
            updateEmailValidation();
        }
    }

    function validateForm() {
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

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
            errorElement.style.display = 'block';
            emailInput.style.borderColor = '#FF5252';
            return false;
        }

        return true;
    }

    restoreFormData();

    messageInput.addEventListener('input', saveFormData);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        if (!validateForm()) return;

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
                    email: emailInput.value.trim(),
                    comment: messageInput.value.trim()
                })
            });

            if (response.status === 201) {
                const result = await response.json();
                console.log('Success:', result);
                form.reset();
                localStorage.removeItem('contactFormData');
                checkMark.style.display = 'none';
                emailInput.style.borderColor = '';
                errorElement.style.display = 'none';
                
                if (window.showSuccessModal) {
                    window.showSuccessModal();
                }
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
});