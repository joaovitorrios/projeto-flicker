


function initMobileMenu() {
    const menuButton = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    if (menuButton && sidebar) {
        menuButton.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (overlay) {
                overlay.classList.toggle('active');
            }
        });

 
        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
        }


        const menuItems = sidebar.querySelectorAll('a, button');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                sidebar.classList.remove('active');
                if (overlay) {
                    overlay.classList.remove('active');
                }
            });
        });
    }
}

function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.nav-item');
    
    menuItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (currentPath.includes(itemPath)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}


function initNavigation() {
   
    setActiveMenuItem();

   
    initMobileMenu();


    const newPostBtn = document.querySelector('.new-post-btn');
    if (newPostBtn) {
        newPostBtn.addEventListener('click', () => {
            window.location.href = './criar-post.html';
        });
    }

    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            window.location.href = './configurações.html';
        });
    }

   
    const notificationsCount = localStorage.getItem('unreadNotifications') || 0;
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge && notificationsCount > 0) {
        notificationBadge.textContent = notificationsCount;
        notificationBadge.style.display = 'block';
    }
}


document.addEventListener('DOMContentLoaded', initNavigation);