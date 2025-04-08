document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const errorMessage = document.querySelector('.error-message');
    const successMessage = document.querySelector('.success-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;


        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';

        
        if (password !== confirmPassword) {
            errorMessage.textContent = 'As senhas não coincidem';
            errorMessage.style.display = 'block';
            return;
        }

        if (password.length < 6) {
            errorMessage.textContent = 'A senha deve ter pelo menos 6 caracteres';
            errorMessage.style.display = 'block';
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
        
                successMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando...';
                successMessage.style.display = 'block';
                
        
                form.reset();
                
                
                setTimeout(() => {
                    window.location.href = './login.html';
                }, 2000);
            } else {
                
                errorMessage.textContent = data.error || 'Erro ao criar conta';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            errorMessage.textContent = 'Erro ao criar conta. Tente novamente.';
            errorMessage.style.display = 'block';
        }
    });
}); 