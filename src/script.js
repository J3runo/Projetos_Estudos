let carros = [];

function cadastrar() {
    const modelo = document.getElementById("Modelo").value;
    const cor = document.getElementById("cor").value;
    const ano = document.getElementById("ano").value;
    const preco = document.getElementById("preco").value;
    const foto = document.getElementById("foto").value || 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Ferrari_LaFerrari_Front_(17805613483).jpg'; 

    carros.push({ modelo, cor, ano, preco, foto }); 

    
    document.getElementById("Modelo").value = '';
    document.getElementById("cor").value = '';
    document.getElementById("ano").value = '';
    document.getElementById("preco").value = '';
    document.getElementById("foto").value = '';

    renderizar();
}

function renderizar() {
    const listaCarros = document.getElementById("lista-carros");
    listaCarros.innerHTML = "";

    for (let i = 0; i < carros.length; i++) {
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.marginBottom = "10px"; 

        const span = document.createElement("span");
        span.textContent = `Modelo: ${carros[i].modelo}`;
        
        const span1 = document.createElement("span");
        span1.textContent = `Cor: ${carros[i].cor}`;
        
        const span2 = document.createElement("span");
        span2.textContent = `Ano: ${carros[i].ano}`;
        
        const span3 = document.createElement("span");
        span3.textContent = `Preço: ${carros[i].preco}`;

        const img = document.createElement('img');
        img.src = "./sandero.jpg"
        img.src = carros[i].foto;

        const btn = document.createElement("button");
        btn.textContent = "Remover"; 
        btn.onclick = () => removerCarro(i); 
        
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