document.addEventListener('DOMContentLoaded', () => {
    const listaDesejos = document.getElementById('lista-desejos');
    const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
    const userLogado = JSON.parse(localStorage.getItem('userLogado')) || [];

    const desejos = anuncios.filter(item => item.isFavorite !== false && item.email !== userLogado.user && item);
    
    localStorage.setItem('Lista de Desejos', JSON.stringify(desejos));

    const renderizarProdutos = filtrados => {
        listaDesejos.innerHTML = ''; // Limpa o container antes de renderizar os produtos filtrados
        filtrados.map(produto => {
            let precoDoProduto = '';
            if (produto.tipoProduto === 'Venda') {
                precoDoProduto = `R$ ${produto.precoProduto}`;
            } else {
                precoDoProduto = produto.tipoProduto;
            }
            listaDesejos.innerHTML += `
                <div class="card d-flex flex-column justify-content-between">
                    <div class="card-imagem-container">
                        <img src="${produto.fotoProduto}" class="card-img-top card-imagem" alt="${produto.tituloProduto}">
                    </div>
                    <div class="card-content">
                        <div class="d-flex justify-content-between align-content-center align-items-center">
                            <h5 class="card-titulo text-capitalize">${produto.tituloProduto}</h5>
                        </div>
                        <div class="d-flex justify-content-between align-content-center align-items-center">
                            <p class="card-preco">${precoDoProduto}</p>
                            <a href="../pages/produto.html?id=${produto.id}">
                                <button class="card-btn">Visualizar</button>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // carregar todos os produtos como "novidades" no primeiro carregamento
    renderizarProdutos(desejos);
});
