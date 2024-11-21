document.addEventListener('DOMContentLoaded', () => {
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    const anunciosComprados = JSON.parse(localStorage.getItem('anunciosComprados')) || [];
    const containerProdutos = document.getElementById("containerProdutos");

    if (userLogado) {
        exibirProdutosUsuario(anunciosComprados, userLogado.user, containerProdutos);
    } else {
        alert('Nenhum usuário logado encontrado.');
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
                    <img src="${produto.fotoProduto}" class="card-img-top card-imagem" alt="...">
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