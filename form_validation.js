document.getElementById('admissionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        alert('Form submitted successfully!');
        // Here you can add code to actually submit the form data to the server
        // Example: submitFormData();
    }
});

function validateForm() {
    const studentName = document.getElementById('studentName').value.trim();
    const fatherName = document.getElementById('fatherName').value.trim();
    const email = document.getElementById('email').value.trim();
    const dob = document.getElementById('dob').value;
    const prevClass = document.getElementById('prevClass').value.trim();
    const currentClass = document.getElementById('currentClass').value.trim();
    const parentMobile = document.getElementById('parentMobile').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!studentName || !fatherName || !email || !dob || !prevClass || !currentClass || !parentMobile) {
        alert('Please fill out all required fields.');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (!/^\d{10}$/.test(parentMobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return false;
    }

    if (!validateDate(dob)) {
        alert('Please enter a valid date of birth.');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

function validateDate(date) {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate);
}


function submitFormData() {
    const formData = new FormData(document.getElementById('admissionForm'));
    fetch('/submitForm', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Form submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        });
}