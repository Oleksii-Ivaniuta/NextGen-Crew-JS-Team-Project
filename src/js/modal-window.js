
document.addEventListener('DOMContentLoaded', function() {
    const successModal = document.getElementById('successModal');
    const closeButtons = document.querySelectorAll('.work-together-close-modal');
    const body = document.body;

    window.showSuccessModal = function() {
        successModal.style.display = 'block';
        body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);
    };

    function closeModal() {
        successModal.style.display = 'none';
        body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyDown);
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') closeModal();
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    window.addEventListener('click', function(event) {
        if (event.target === successModal) closeModal();
    });
});