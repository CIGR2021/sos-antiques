document.addEventListener('DOMContentLoaded', function () {
    const cardContainer = document.querySelector('.card-container');
    const produtoUrl = 'https://3bd58c72-f964-4b92-93e0-0271a7351617-00-dz66xwnwvvxl.janeway.repl.co/anuncios';

    fetch(`${produtoUrl}`)
        .then(response => response.json())
        .then(produtoData => produtoData.forEach(function (produto) {
            console.log(produto);
            let precoDoProduto = '';
            if(produto.tipoProduto == 'venda') {
                precoDoProduto = `${`R$ ${produto.precoProduto}`}`;
            } else {
                precoDoProduto = produto.tipoProduto;
            }
            cardContainer.innerHTML += `
                <div class="card d-flex flex-column justify-content-between">
                    <img src="${produto.fotoProduto}" class="card-img-top card-imagem" alt="...">
                    <div class="card-content">
                        <h5 class="card-titulo">${produto.tituloProduto}</h5>
                            <div class="d-flex justify-content-between align-content-center align-items-center">
                                <p class="card-preco">${precoDoProduto}</p>
                                <a href="/src/pages/produto.html" class="card-btn">Visualizar</a>
                            </div>
                    </div>
                </div>
            `
        }))
})