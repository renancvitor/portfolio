const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {
    name: formData.get('first-name') + ' ' + formData.get('last-name'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);  // Exibe mensagem de sucesso
    } else {
      alert(result.error);  // Exibe mensagem de erro
    }
  } catch (error) {
    console.error('Erro ao enviar o formulário:', error);
    alert('Ocorreu um erro ao enviar o formulário.');
  }
});
