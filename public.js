// Criar título
const titulo = document.createElement("h2");
titulo.textContent = "📸 Postar Foto com Legenda";
document.body.appendChild(titulo);

// Criar input para imagem
const inputImagem = document.createElement("input");
inputImagem.type = "file";
inputImagem.accept = "image/*";
document.body.appendChild(inputImagem);

// Quebra de linha
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));

// Criar input para legenda
const inputLegenda = document.createElement("input");
inputLegenda.type = "text";
inputLegenda.placeholder = "Digite uma legenda...";
inputLegenda.style.width = "300px";
document.body.appendChild(inputLegenda);


document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));


const botao = document.createElement("button");
botao.textContent = "Postar";
document.body.appendChild(botao);


const feed = document.createElement("div");
feed.style.marginTop = "20px";
document.body.appendChild(feed);


document.body.style.fontFamily = "sans-serif";
document.body.style.background = "#f0f0f0";
document.body.style.textAlign = "center";
document.body.style.padding = "20px";

// Evento de clique no botão
botao.onclick = () => {
  const arquivo = inputImagem.files[0];

  if (!arquivo) {
    alert("Selecione uma imagem para a postaguem.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const url = e.target.result;

    const post = document.createElement("div");
    post.style.background = "#fff";
    post.style.padding = "10px";
    post.style.borderRadius = "10px";
    post.style.width = "300px";
    post.style.margin = "20px auto";
    post.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    const img = document.createElement("img");
    img.src = url;
    img.style.width = "100%";
    img.style.borderRadius = "10px";

    const caption = document.createElement("div");
    caption.textContent = inputLegenda.value || "Sem legenda";
    caption.style.marginTop = "10px";
    caption.style.fontWeight = "bold";

    post.appendChild(img);
    post.appendChild(caption);
    feed.prepend(post);

    inputImagem.value = "";
    inputLegenda.value = "";
  };

  reader.readAsDataURL(arquivo);
};
