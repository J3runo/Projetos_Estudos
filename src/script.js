let carros = [];
const apiKey = "AIzaSyDyzRs4QOEojd3zKUZtVYrxDsOcQI6sQjI";
const searchEngineId = "87721b9db36ed49e3";

function cadastrar() {
  const modelo = document.getElementById("Modelo").value;
  const cor = document.getElementById("cor").value;
  const ano = document.getElementById("ano").value;
  const preco = document.getElementById("preco").value;

  buscaImagemCarro(modelo, cor, ano).then(function (foto) {
    carros.push({ modelo, cor, ano, preco, foto });

    document.getElementById("Modelo").value = "";
    document.getElementById("cor").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("foto").value = "";

    renderizar();
  });
}

function renderizar() {
  const listaCarros = document.getElementById("lista-carros");
  listaCarros.innerHTML = "";

  for (let i = 0; i < carros.length; i++) {
    const li = document.createElement("li");
    const div = document.createElement("div");

    const span = document.createElement("span");
    span.textContent = `Modelo: ${carros[i].modelo}`;

    const span1 = document.createElement("span");
    span1.textContent = `Cor: ${carros[i].cor}`;

    const span2 = document.createElement("span");
    span2.textContent = `Ano: ${carros[i].ano}`;

    const span3 = document.createElement("span");
    span3.textContent = `Preço: ${carros[i].preco}`;

    const img = document.createElement("img");
    img.src = carros[i].foto;
    img.alt = "Imagem do carro";

    const btn = document.createElement("button");
    btn.textContent = "Remover";
    btn.onclick = function () {
      removerCarro(i);
    };

    li.appendChild(div);
    div.appendChild(span);
    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(span3);
    div.appendChild(btn);
    li.appendChild(img);

    listaCarros.appendChild(li);
  }
}

function removerCarro(index) {
  carros.splice(index, 1);
  renderizar();
}

async function buscaImagemCarro(modelo, cor, ano) {
  const query = encodeURIComponent(`${modelo} ${ano} ${cor} car`);
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${searchEngineId}&searchType=image&key=${apiKey}&num=1&safe=active`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].link;
    } else {
      return "https://upload.wikimedia.org/wikipedia/commons/b/b6/Ferrari_LaFerrari_Front_(17805613483).jpg";
    }
  } catch (error) {
    console.error("Erro ao buscar a imagem:", error);
    return "https://upload.wikimedia.org/wikipedia/commons/b/b6/Ferrari_LaFerrari_Front_(17805613483).jpg";
  }
}
