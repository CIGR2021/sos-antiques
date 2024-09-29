document.addEventListener('DOMContentLoaded', function () {
    const cardContainer = document.querySelector('.card-container');
    const produtos = JSON.parse(localStorage.getItem('anuncios')) || [];

    function renderizarProdutos(filtrados) {
        cardContainer.innerHTML = ''; // Limpa o container antes de renderizar os produtos filtrados
        filtrados.forEach(function (produto) {
            let precoDoProduto = '';
            if (produto.tipoProduto === 'Venda') {
                precoDoProduto = `R$ ${produto.precoProduto}`;
            } else {
                precoDoProduto = produto.tipoProduto;
            }
            cardContainer.innerHTML += `
                <div class="card d-flex flex-column justify-content-between">
                    <div class="card-imagem-container">
                        <img src="${produto.fotoProduto}" class="card-img-top card-imagem" alt="...">
                    </div>
                    <div class="card-content">
                        <h5 class="card-titulo">${produto.tituloProduto}</h5>
                        <div class="d-flex justify-content-between align-content-center align-items-center">
                            <p class="card-preco">${precoDoProduto}</p>
                            <a href="/src/pages/produto.html" class="card-btn">Visualizar</a>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // carregar todos os produtos como "novidades" no primeiro carregamento
    renderizarProdutos(produtos);

    const btnNovidades = document.getElementById('btn-item__novidades');
    const btnVenda = document.getElementById('btn-item__venda');
    const btnTroca = document.getElementById('btn-item__troca');
    const btnDoacoes = document.getElementById('btn-item__doacoes');

    // carregar todos produtos
    btnNovidades.addEventListener('click', function () {
        renderizarProdutos(produtos);
    });

    // filtro produtos de venda
    btnVenda.addEventListener('click', function () {
        const produtosVenda = produtos.filter(produto => produto.tipoProduto === 'Venda');
        renderizarProdutos(produtosVenda);
    });

    // filtro produtos de troca
    btnTroca.addEventListener('click', function () {
        const produtosTroca = produtos.filter(produto => produto.tipoProduto === 'Troca');
        renderizarProdutos(produtosTroca);
    });

    // filtro produtos de doação
    btnDoacoes.addEventListener('click', function () {
        const produtosDoacao = produtos.filter(produto => produto.tipoProduto === 'Doação');
        renderizarProdutos(produtosDoacao);
    });
});
