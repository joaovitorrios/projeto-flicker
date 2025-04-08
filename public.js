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

// Quebra de linha
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));

