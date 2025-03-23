document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-button");
    const successMessage = document.getElementById("success-message");

    const emailInput = document.getElementById("email");
    const emailHelp = document.getElementById("emailHelp");

    form.addEventListener("input", function () {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;

        const isValidEmail = emailInput.checkValidity();

        if (isValidEmail) {
            emailHelp.style.display = "none";
        } else {
            emailHelp.style.display = "block";
        }
    });

    // Envio do formulário com feedback visual
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                successMessage.style.display = "block";
                form.reset();
                submitButton.disabled = true;
            } else {
                alert("Ocorreu um erro. Tente novamente mais tarde.");
            }
        })
        .catch((error) => {
            console.error('Erro ao enviar mensagem:', error);
            alert("Erro ao enviar mensagem.");
        });
    });
});
