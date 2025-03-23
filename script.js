document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-button");
    const successMessage = document.getElementById("success-message");

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
                alert("Ocorreu um erro. Tente novamente mais tarde.");
            }
        })
        .catch(() => alert("Erro ao enviar mensagem."));
    });
});
