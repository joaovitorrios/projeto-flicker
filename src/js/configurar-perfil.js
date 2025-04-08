document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.config-profile-form');
    const coverUpload = document.getElementById('cover-upload');
    const avatarUpload = document.getElementById('avatar-upload');
    const coverPreview = document.querySelector('.cover-preview');
    const avatarPreview = document.querySelector('.avatar-preview');

  
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = './login.html';
        return;
    }


    if (currentUser.name) document.getElementById('name').value = currentUser.name;
    if (currentUser.username) document.getElementById('username').value = currentUser.username;
    if (currentUser.location) document.getElementById('location').value = currentUser.location;
    if (currentUser.website) document.getElementById('website').value = currentUser.website;
    if (currentUser.linkedin) document.getElementById('linkedin').value = currentUser.linkedin;
    if (currentUser.avatar) avatarPreview.src = currentUser.avatar;
    if (currentUser.cover) coverPreview.src = currentUser.cover;


    function handleImageUpload(file, previewElement) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewElement.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }


    coverUpload.addEventListener('change', (e) => {
        handleImageUpload(e.target.files[0], coverPreview);
    });

    avatarUpload.addEventListener('change', (e) => {
        handleImageUpload(e.target.files[0], avatarPreview);
    });

  
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            location: document.getElementById('location').value,
            website: document.getElementById('website').value,
            linkedin: document.getElementById('linkedin').value,
            avatar: avatarPreview.src,
            cover: coverPreview.src,
            profileConfigured: true
        };

        try {
  
            const updatedUser = { ...currentUser, ...formData };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        
            window.location.href = './perfil.html';
        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
        }
    });

   
    document.querySelector('.skip-btn').addEventListener('click', () => {
        
        const updatedUser = { ...currentUser, profileConfigured: true };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
       
        window.location.href = './feed.html';
    });
}); 