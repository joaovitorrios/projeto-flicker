function fixarFotoPerfil() {
    const input = document.getElementById('fileInput');
    const img = document.getElementById('profilePic');
  
    if (input.files && input.files[0]) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        img.src = e.target.result; // Exibe a imagem no <img>
        localStorage.setItem('fotoPerfil', e.target.result); // Salva no navegador
      };
  
      reader.readAsDataURL(input.files[0]); // Lê a imagem como Base64
    }
  }
  
  // Quando a página for carregada, recupera a imagem salva
  window.onload = function () {
    const savedImage = localStorage.getItem('fotoPerfil');
    if (savedImage) {
      document.getElementById('profilePic').src = savedImage;
    }
  };
  