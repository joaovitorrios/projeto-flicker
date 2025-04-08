document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.config-profile-form');
    const coverUpload = document.getElementById('cover-upload');
    const avatarUpload = document.getElementById('avatar-upload');
    const coverPreview = document.querySelector('.cover-preview');
    const avatarPreview = document.querySelector('.avatar-preview');

    // Função para preview de imagem
    function handleImageUpload(file, previewElement) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewElement.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Event listeners para upload de imagens
    coverUpload.addEventListener('change', (e) => {
        handleImageUpload(e.target.files[0], coverPreview);
    });

    avatarUpload.addEventListener('change', (e) => {
        handleImageUpload(e.target.files[0], avatarPreview);
    });

    // Manipulação do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            location: document.getElementById('location').value,
            website: document.getElementById('website').value,
            linkedin: document.getElementById('linkedin').value,
            avatar: avatarPreview.src,
            cover: coverPreview.src
        };

        try {
            // Aqui você pode adicionar a lógica para salvar os dados no servidor
            // Por enquanto, vamos apenas salvar no localStorage
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const updatedUser = { ...currentUser, ...formData };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // Redirecionar para o feed
            window.location.href = './feed.html';
        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
        }
    });

    // Botão de pular
    document.querySelector('.skip-btn').addEventListener('click', () => {
        window.location.href = './feed.html';
    });
}); 