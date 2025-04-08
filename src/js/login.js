document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const errorMessage = document.querySelector('.error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
               
                localStorage.setItem('currentUser', JSON.stringify(data));
                
                if (data.profileConfigured === false) {
                    
                    window.location.href = './configurar-perfil.html';
                } else {
                  
                    window.location.href = './feed.html';
                }
            } else {
            
                errorMessage.textContent = data.error;
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            errorMessage.textContent = 'Erro ao fazer login. Tente novamente.';
            errorMessage.style.display = 'block';
        }
    });
}); 