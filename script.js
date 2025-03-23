const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {
    name: formData.get('first-name') + ' ' + formData.get('last-name'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  console.log('Dados do formulário:', data);  // Adicionando log para depuração

  try {
    const response = await fetch('https://portfolio-nu-eight-15.vercel.app/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Verifica se a resposta está OK (status 200-299)
    if (response.ok) {
      const result = await response.json(); // Certificando-se de ler o JSON da resposta
      alert(result.message);  // Exibe mensagem de sucesso
    } else {
      const result = await response.json(); // Lê o JSON da resposta para mensagens de erro
      alert(result.error);  // Exibe mensagem de erro
    }
  } catch (error) {
    console.error('Erro ao enviar o formulário:', error);
    alert('Ocorreu um erro ao enviar o formulário!');
  }
});
