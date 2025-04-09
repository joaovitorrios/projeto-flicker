document.addEventListener('DOMContentLoaded', () => {
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = './login.html';
        return;
    }

    const form = document.querySelector('.post-form');
    const postText = document.querySelector('.post-text');
    const mediaPreview = document.querySelector('.media-preview');
    const publishBtn = document.querySelector('.publish-btn');
    const addPhotoBtn = document.querySelector('.action-btn:first-child');
    const visibilitySelect = document.querySelector('.visibility-select');
    const allowCommentsCheckbox = document.querySelector('input[type="checkbox"]:first-of-type');
    const allowSharingCheckbox = document.querySelector('input[type="checkbox"]:last-of-type');
    const userAvatar = document.querySelector('.user-avatar');
    const userName = document.querySelector('.user-details h3');

    userAvatar.src = currentUser.avatar;
    userName.textContent = currentUser.name;

    let selectedImage = null;
    let imagePreview = null;

    addPhotoBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    selectedImage = event.target.result;
                    
                    if (imagePreview) {
                        imagePreview.remove();
                    }
                    
                    imagePreview = document.createElement('div');
                    imagePreview.className = 'image-preview';
                    imagePreview.innerHTML = `
                        <img src="${selectedImage}" alt="Preview">
                        <button class="remove-image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    `;
                    
                    mediaPreview.appendChild(imagePreview);
                    
                    imagePreview.querySelector('.remove-image').addEventListener('click', () => {
                        imagePreview.remove();
                        selectedImage = null;
                        imagePreview = null;
                    });
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    publishBtn.addEventListener('click', async () => {
        const content = postText.value.trim();
        
        if (!content && !selectedImage) {
            alert('Adicione algum conteúdo ao seu post');
            return;
        }

        const post = {
            id: Date.now().toString(),
            content,
            image: selectedImage,
            date: new Date().toLocaleString('pt-BR'),
            visibility: visibilitySelect.value,
            allowComments: allowCommentsCheckbox.checked,
            allowSharing: allowSharingCheckbox.checked,
            likes: 0,
            comments: 0,
            author: {
                id: currentUser.id,
                name: currentUser.name,
                avatar: currentUser.avatar,
                verified: currentUser.verified || false
            }
        };

        try {
            if (!currentUser.posts) {
                currentUser.posts = [];
            }
            currentUser.posts.unshift(post);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Salvar o post também no localStorage de posts
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.unshift(post);
            localStorage.setItem('posts', JSON.stringify(posts));

            alert('Post publicado com sucesso!');
            window.location.href = './perfil.html';
        } catch (error) {
            console.error('Erro ao publicar post:', error);
            alert('Erro ao publicar post. Tente novamente.');
        }
    });
}); 