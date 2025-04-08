document.addEventListener('DOMContentLoaded', () => {
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = './login.html';
        return;
    }

    
    document.querySelector('.profile-cover').src = currentUser.cover || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809';
    document.querySelector('.profile-avatar').src = currentUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';
    document.querySelector('.profile-name').textContent = currentUser.name || 'Usuário';
    document.querySelector('.profile-username').textContent = `@${currentUser.username || 'usuario'}`;
    
    
    const locationElement = document.querySelector('.profile-location');
    if (currentUser.location) {
        locationElement.textContent = currentUser.location;
        locationElement.style.display = 'flex';
    } else {
        locationElement.style.display = 'none';
    }
    
    
    const websiteLink = document.querySelector('.profile-link[href*="website"]');
    const linkedinLink = document.querySelector('.profile-link[href*="linkedin"]');
    
    if (currentUser.website) {
        websiteLink.href = currentUser.website;
        websiteLink.textContent = currentUser.website.replace(/^https?:\/\//, '');
        websiteLink.parentElement.style.display = 'flex';
    } else {
        websiteLink.parentElement.style.display = 'none';
    }
    
    if (currentUser.linkedin) {
        linkedinLink.href = currentUser.linkedin;
        linkedinLink.textContent = 'LinkedIn';
        linkedinLink.parentElement.style.display = 'flex';
    } else {
        linkedinLink.parentElement.style.display = 'none';
    }
    

    document.querySelector('.followers-count').textContent = currentUser.followers || 0;
    document.querySelector('.following-count').textContent = currentUser.following || 0;
    document.querySelector('.posts-count').textContent = currentUser.posts ? currentUser.posts.length : 0;
    

    const postsContainer = document.querySelector('.profile-posts');
    if (currentUser.posts && currentUser.posts.length > 0) {
        postsContainer.innerHTML = '';
        
        currentUser.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <div class="post-header">
                    <img src="${currentUser.avatar}" alt="Avatar" class="post-avatar">
                    <div class="post-info">
                        <div class="post-name-container">
                            <h3>${currentUser.name}</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <span class="post-time">${post.date}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
                <div class="post-actions">
                    <button class="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span>${post.likes || 0}</span>
                    </button>
                    <button class="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span>${post.comments || 0}</span>
                    </button>
                    <button class="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        <span>Compartilhar</span>
                    </button>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    } else {
        postsContainer.innerHTML = '<p class="no-posts">Nenhum post ainda. Crie seu primeiro post!</p>';
    }
    

    document.querySelectorAll('.post').forEach(post => {
        post.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
}); 