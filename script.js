document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-button");
    const successMessage = document.getElementById("success-message");
    
    // Validação do e-mail
    const emailInput = document.getElementById("email");
    const emailHelp = document.getElementById("emailHelp");

    // Evento de blur (quando o campo de e-mail perde o foco)
    emailInput.addEventListener("blur", function () {
        const emailValue = emailInput.value;
        
        // Verifica se o e-mail é válido com base no padrão definido
        const isValidEmail = emailInput.checkValidity();

        // Exibe a mensagem de erro se o e-mail for inválido
        if (!isValidEmail) {
            emailHelp.style.display = "block"; // Mostra a mensagem
        } else {
            emailHelp.style.display = "none"; // Oculta a mensagem
        }
    });

    // Verifica se todos os campos estão preenchidos para ativar o botão
    form.addEventListener("input", function () {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;
    });

    // Envio do formulário com feedback visual
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio imediato para mostrar feedback

        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                successMessage.style.display = "block"; // Mostra mensagem de sucesso
                form.reset(); // Limpa o formulário
                submitButton.disabled = true; // Desativa o botão novamente
            } else {
                // Mostra o alerta apenas se o response não for ok
                alert("Ocorreu um erro. Tente novamente mais tarde.");
            }
        })
        .catch((error) => {
            // Mostra o erro apenas se houver uma falha na requisição
            console.error('Erro ao enviar mensagem:', error);
            alert("Erro ao enviar mensagem.");
        });
    });
});
