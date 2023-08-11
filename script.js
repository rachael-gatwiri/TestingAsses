document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');
    const signupBtn = document.getElementById('signupBtn');
    const cohortNumber = document.getElementById('cohortnumber');
    const fullName = document.getElementById('fullname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const reEnterPassword = document.getElementById('confirm_password');
    const errorMessage = document.getElementById('message');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        errorMessage.innerText = '';
        const emailReg = /^[a-zA-Z0-9._-]+@[thejitu]+\.[a-zA-Z]{2,4}$/; 
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

        let isValid = true;

        if (fullName.value.trim().split(' ').length < 2) {
            showError(fullName, 'Full name must contain at least two names');
            isValid = false;
        }
        else if (!emailReg.test(email.value)) {
            showError(email, 'Invalid email format');
            isValid = false;
        }else if (isNaN(cohortNumber.value) || cohortNumber.value.length > 3) {
            showError(cohortNumber, 'Cohort number must be a number and not more than 3 numbers');
            isValid = false;
        }
         else if (!passwordReg.test(password.value)) {
            showError(password, 'Password must contain at least 8 characters with a combination of uppercase, lowercase, numbers, and special characters');
            isValid = false;
        } else if (password.value !== reEnterPassword.value) {
            showError(reEnterPassword, 'Passwords do not match');
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullName: fullName.value,
                        email: email.value,
                        cohortNumber: cohortNumber.value,
                        password: password.value
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Registration successful:', data.message);
                    form.reset();
                } else {
                    const errorData = await response.json();
                    showError(errorMessage, errorData.error);
                }
            } catch (error) {
                console.error('An error occurred:', error.message);
            }
        }
    });

    function showError(element, message) {
        errorMessage.innerHTML = message;
        element.classList.add('error');
    }
});
