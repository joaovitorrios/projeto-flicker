document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        name: 'Nome do Usuário',
        username: '@username',
        bio: 'Biografia do usuário',
        avatar: './assets/default-avatar.png',
        cover: './assets/default-cover.jpg',
        posts: [],
        followers: 0,
        following: 0
    };

    const profileAvatar = document.querySelector('.profile-avatar img');
    const profileCover = document.querySelector('.profile-cover img');
    const profileName = document.querySelector('.profile-name');
    const profileUsername = document.querySelector('.profile-username');
    const profileBio = document.querySelector('.profile-bio');
    const postsCount = document.querySelector('.posts-count');
    const followersCount = document.querySelector('.followers-count');
    const followingCount = document.querySelector('.following-count');
    const postsContainer = document.querySelector('.posts-container');


    profileAvatar.src = currentUser.avatar;
    profileCover.src = currentUser.cover;
    profileName.textContent = currentUser.name;
    profileUsername.textContent = currentUser.username;
    profileBio.textContent = currentUser.bio;
    postsCount.textContent = currentUser.posts.length;
    followersCount.textContent = currentUser.followers;
    followingCount.textContent = currentUser.following;

   
    function loadUserPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const userPosts = posts.filter(post => post.userId === currentUser.id);

        if (userPosts.length === 0) {
            postsContainer.innerHTML = `
                <div class="no-posts">
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <p>Nenhum post ainda</p>
                    <a href="./criar-post.html" class="create-post-btn">Criar seu primeiro post</a>
                </div>
            `;
            return;
        }

        postsContainer.innerHTML = userPosts.map(post => `
            <div class="post" data-id="${post.id}">
                <div class="post-header">
                    <img src="${post.userAvatar}" alt="${post.userName}" class="post-avatar">
                    <div class="post-info">
                        <h3>${post.userName}</h3>
                        <span>${post.timestamp}</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                    ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
                </div>
                <div class="post-actions">
                    <button class="like-btn" data-likes="${post.likes}">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span>${post.likes}</span>
                    </button>
                    <button class="comment-btn">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <span>Comentar</span>
                    </button>
                    <button class="share-btn">
                        <svg class="icon" viewBox="0 0 24 24">
                            <circle cx="18" cy="5" r="3"/>
                            <circle cx="6" cy="12" r="3"/>
                            <circle cx="18" cy="19" r="3"/>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                        </svg>
                        <span>Compartilhar</span>
                    </button>
                </div>
            </div>
        `).join('');

  
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const postId = this.closest('.post').dataset.id;
                const post = userPosts.find(p => p.id === postId);
                if (post) {
                    post.likes++;
                    this.querySelector('span').textContent = post.likes;
                    localStorage.setItem('posts', JSON.stringify(posts));
                }
            });
        });
    }

    
    loadUserPosts();
}); 