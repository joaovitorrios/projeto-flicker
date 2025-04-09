document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = './login.html';
        return;
    }

    const feedContainer = document.querySelector('.feed-container');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.author.avatar}" alt="Avatar" class="user-avatar">
                <div class="user-details">
                    <h3>${post.author.name}</h3>
                    <span class="post-date">${post.date}</span>
                </div>
            </div>
            <div class="post-content">
                ${post.content ? `<p>${post.content}</p>` : ''}
                ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            </div>
            <div class="post-stats">
                <div class="stat">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>${post.likes}</span>
                </div>
                <div class="stat">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>${post.comments}</span>
                </div>
            </div>
        `;
        return postElement;
    }

    function renderPosts() {
        if (!feedContainer) {
            console.error('Container do feed não encontrado');
            return;
        }

        feedContainer.innerHTML = '';
        
        if (posts.length === 0) {
            feedContainer.innerHTML = '<p class="no-posts">Nenhum post encontrado</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = createPostElement(post);
            feedContainer.appendChild(postElement);
        });
    }

    renderPosts();
}); 