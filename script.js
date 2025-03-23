// Selecionar o formulário
const form = document.querySelector('.contact-form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Melhor forma de transformar FormData em objeto

    fetch('/send', { // Alterado para a URL correta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Enviando como JSON
        },
        body: JSON.stringify(data), // Convertendo os dados para JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Mensagem enviada com sucesso!');
        } else {
            alert(data.error || 'Ocorreu um erro ao enviar a mensagem.'); // Mostrar mensagem de erro caso exista
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro. Tente novamente mais tarde.');
    });
});
