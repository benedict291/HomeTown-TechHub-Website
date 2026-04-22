// Contact Form Handling with PHP
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.querySelector('.submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Create form data
        const formData = new FormData(this);
        
        // Send data to PHP file
        fetch('contact-process.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formStatus.textContent = data.message;
                formStatus.className = 'form-status success';
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                formStatus.textContent = data.message;
                formStatus.className = 'form-status error';
            }
        })
        .catch(error => {
            formStatus.textContent = 'Sorry, something went wrong. Please try again later.';
            formStatus.className = 'form-status error';
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}