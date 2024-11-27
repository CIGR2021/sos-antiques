const exibirModal = (mensagem, link) => {
    const modal = document.createElement('div');
    modal.id = 'modalSucesso';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';
  
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    modalContent.style.textAlign = 'center';
  
    const mensagemTexto = document.createElement('p');
    mensagemTexto.innerText = mensagem;
    modalContent.appendChild(mensagemTexto);
  
    const botaoFechar = document.createElement('button');
    botaoFechar.innerText = 'Fechar';
    botaoFechar.style.marginTop = '10px';
    botaoFechar.style.padding = '10px 20px';
    botaoFechar.style.backgroundColor = '#4CAF50';
    botaoFechar.style.color = '#fff';
    botaoFechar.style.border = 'none';
    botaoFechar.style.cursor = 'pointer';
    botaoFechar.style.borderRadius = '4px';
  
    botaoFechar.addEventListener('click', () => {
      document.body.removeChild(modal);
      if(link) window.location.href = link;
    });
  
    modalContent.appendChild(botaoFechar);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
};

document.addEventListener('DOMContentLoaded', () => {
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    const anunciosComprados = JSON.parse(localStorage.getItem('anunciosComprados')) || [];
    const containerProdutos = document.getElementById("containerProdutos");

    if (userLogado) {
        exibirProdutosUsuario(anunciosComprados, userLogado.user, containerProdutos);
    } else {
        exibirModal("Nenhum usuário logado encontrado.")
    }
});

function exibirProdutosUsuario(anunciosComprados, emailUsuario, container) {
    const meusProdutos = anunciosComprados.filter(produto => produto.comprador === emailUsuario);

    container.innerHTML = ''; // Limpa o container antes de adicionar produtos
    meusProdutos.map(produto => {
        const precoDoProduto = produto.tipoProduto === 'Venda' 
            ? `R$ ${produto.precoProduto}` 
            : produto.tipoProduto;

        container.innerHTML += `
            <div class="card d-flex flex-row">
                <div class="card-imagem-container">
                    <img src="${produto.fotoProduto}" class="card-img-top card-imagem" alt="${produto.tituloProduto}">
                </div>
                <div class="card-content">
                    <h5 class="card-titulo text-capitalize">${produto.tituloProduto}</h5>
                    <div class="d-flex flex-column justify-content-between gap-1">
                        <p class="card-texto text-capitalize">Condição: ${produto.condicaoProduto}</p>
                        <p class="card-texto">${precoDoProduto}</p>
                        <p class="card-texto">Data da compra: ${produto.dataCompra}</p>
                    </div>
                </div>
            </div>
        `;
    });
}