const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
        name: formData.get('first-name') + ' ' + formData.get('last-name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
    } else {
        alert(result.error);
    }
});
