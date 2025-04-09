document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o usuário está logado
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = './login.html';
        return;
    }

    // Carregar dados do perfil
    loadProfileData(currentUser);
    
    // Carregar posts do usuário
    loadUserPosts(currentUser.id);
    
    // Configurar eventos de navegação
    setupNavigation();
});

function loadProfileData(user) {
    // Atualizar avatar
    const avatarImage = document.getElementById('avatarImage');
    if (avatarImage) {
        avatarImage.src = user.avatar || 'assets/default-avatar.jpg';
    }
    
    // Atualizar capa
    const coverImage = document.getElementById('coverImage');
    if (coverImage) {
        coverImage.src = user.coverImage || 'assets/default-cover.jpg';
    }
    
    // Atualizar nome
    const profileName = document.getElementById('profileName');
    if (profileName) {
        profileName.textContent = user.name || 'Usuário';
    }
    
    // Atualizar username
    const profileUsername = document.getElementById('profileUsername');
    if (profileUsername) {
        profileUsername.textContent = `@${user.username || 'usuario'}`;
    }
    
    // Atualizar bio
    const profileBio = document.getElementById('profileBio');
    if (profileBio) {
        profileBio.textContent = user.bio || 'Nenhuma biografia adicionada.';
    }
    
    // Atualizar localização
    const locationElement = document.querySelector('.profile-location span');
    if (locationElement && user.location) {
        locationElement.textContent = user.location;
    } else if (locationElement) {
        locationElement.textContent = 'Localização não especificada';
    }
    
    // Atualizar links
    const linksContainer = document.querySelector('.profile-links');
    if (linksContainer && user.links && user.links.length > 0) {
        linksContainer.innerHTML = '';
        user.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.className = 'profile-link';
            
            const iconElement = document.createElement('svg');
            iconElement.className = 'icon';
            iconElement.setAttribute('viewBox', '0 0 24 24');
            
            const pathElement = document.createElement('path');
            pathElement.setAttribute('d', 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71');
            
            const path2Element = document.createElement('path');
            path2Element.setAttribute('d', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71');
            
            iconElement.appendChild(pathElement);
            iconElement.appendChild(path2Element);
            
            const spanElement = document.createElement('span');
            spanElement.textContent = link.text;
            
            linkElement.appendChild(iconElement);
            linkElement.appendChild(spanElement);
            
            linksContainer.appendChild(linkElement);
        });
    }
    
    // Atualizar estatísticas
    updateStats(user);
}

function updateStats(user) {
    // Carregar posts do usuário para contar
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = posts.filter(post => post.userId === user.id);
    
    // Atualizar contagem de posts
    const postsCount = document.getElementById('postsCount');
    if (postsCount) {
        postsCount.textContent = userPosts.length;
    }
    
    // Atualizar contagem de seguidores
    const followersCount = document.getElementById('followersCount');
    if (followersCount) {
        followersCount.textContent = user.followers || 0;
    }
    
    // Atualizar contagem de seguindo
    const followingCount = document.getElementById('followingCount');
    if (followingCount) {
        followingCount.textContent = user.following || 0;
    }
}

function loadUserPosts(userId) {
    const postsContainer = document.getElementById('userPosts');
    if (!postsContainer) return;
    
    // Limpar posts existentes
    postsContainer.innerHTML = '';
    
    // Carregar posts do localStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = posts.filter(post => post.userId === userId);
    
    if (userPosts.length === 0) {
        // Exibir mensagem quando não há posts
        const noPostsElement = document.createElement('div');
        noPostsElement.className = 'no-posts';
        noPostsElement.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <p>Você ainda não tem nenhum post. Crie seu primeiro post agora!</p>
            <a href="./criar-post.html" class="create-post-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                Criar Post
            </a>
        `;
        postsContainer.appendChild(noPostsElement);
        return;
    }
    
    // Ordenar posts por data (mais recentes primeiro)
    userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Criar grid de posts
    const postsGrid = document.createElement('div');
    postsGrid.className = 'posts-grid';
    
    // Adicionar cada post ao grid
    userPosts.forEach(post => {
        const postElement = createPostElement(post);
        postsGrid.appendChild(postElement);
    });
    
    postsContainer.appendChild(postsGrid);
}

function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post-item';
    postElement.dataset.postId = post.id;
    
    if (post.image) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'post-image';
        
        const image = document.createElement('img');
        image.src = post.image;
        image.alt = 'Post image';
        
        const overlay = document.createElement('div');
        overlay.className = 'post-overlay';
        overlay.innerHTML = `
            <div class="post-stats">
                <div class="stat">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>${post.likes || 0}</span>
                </div>
                <div class="stat">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>${post.comments?.length || 0}</span>
                </div>
            </div>
        `;
        
        imageContainer.appendChild(image);
        imageContainer.appendChild(overlay);
        postElement.appendChild(imageContainer);
    } else if (post.text) {
        const textContainer = document.createElement('div');
        textContainer.className = 'post-text';
        textContainer.textContent = post.text;
        postElement.appendChild(textContainer);
    }
    
    // Adicionar evento de clique para abrir o post
    postElement.addEventListener('click', () => {
        window.location.href = `./post.html?id=${post.id}`;
    });
    
    return postElement;
}

function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 7) {
        return date.toLocaleDateString('pt-BR');
    } else if (days > 0) {
        return `${days}d`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return 'agora';
    }
}

// Funções para manipular imagens
function handleAvatarImageClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    currentUser.avatar = e.target.result;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    document.getElementById('avatarImage').src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function handleCoverImageClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    currentUser.coverImage = e.target.result;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    document.getElementById('coverImage').src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Função para configurar a navegação
function setupNavigation() {
    // Marcar item ativo no menu
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Configurar botão de editar perfil
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            window.location.href = './configurar-perfil.html';
        });
    }
    
    // Configurar botão de compartilhar
    const shareProfileBtn = document.querySelector('.share-profile-btn');
    if (shareProfileBtn) {
        shareProfileBtn.addEventListener('click', () => {
            const url = window.location.href;
            if (navigator.share) {
                navigator.share({
                    title: 'Meu perfil no Flicker',
                    url: url
                });
            } else {
                navigator.clipboard.writeText(url).then(() => {
                    alert('Link do perfil copiado para a área de transferência!');
                });
            }
        });
    }
} 