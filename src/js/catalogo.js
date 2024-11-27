document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    const titulo = document.querySelector('.secao-principal__titulo');
    const produtos = JSON.parse(localStorage.getItem('anuncios')) || [];
    const userLogado = JSON.parse(localStorage.getItem('userLogado')) || [];

    /*  Produtos pré-criados para entrega 1    
    produtos.push({
        tituloProduto: "Jaqueta Retro Masculina - Planet Hollywood",
        tipoProduto: "Troca",
        categoriaProduto: "vestuario",
        condicaoProduto: "usado",
        precoProduto: "",
        descricaoProduto: "Jaqueta retro em bom estado.",
        fotoProduto: `https://lh3.googleusercontent.com/pw/AP1GczPSaP0GquvGmzkmQtpCBiVzx7fLQdCRS9nBCcmiK1B0hB5U31cN__E1-8ehhCD5dGHRtbb7I0b1CqLBVfp2ByKOFeDawttrFukypVST8WbExsrnOWxM2jOIwLl66VseZBb9xLcYdoJnlVLsESVixq8i=w739-h880-s-no-gm`,
        termoContato: true
    })
    
    produtos.push({
        tituloProduto: "Abajur da década de 80",
        tipoProduto: "Venda",
        categoriaProduto: "moveis",
        condicaoProduto: "usado",
        precoProduto: "160,00",
        descricaoProduto: "Abajur antigo em excelente estado.",
        fotoProduto: `https://lh3.googleusercontent.com/pw/AP1GczOK2EVWACts4pIWMj5DAyzlQC_goBXWvK68APHcCEz2eM5WfMaT2Oe_ghdMcI29KyDpDprly9vlXQwalUzZX5Fr0-mov8jL4p8xNVMmdYI-jjwYxG-B3Xnk273MGowbjJNj2ObruOrInhfbePmAsIyE=w651-h880-s-no-gm?authuser=0`,
        termoContato: true
    })
 */

    const renderizarProdutos = filtrados => {
        cardContainer.innerHTML = ''; // Limpa o container antes de renderizar os produtos filtrados
        filtrados.forEach(produto => {
            let precoDoProduto = produto.tipoProduto === 'Venda' ? `R$ ${produto.precoProduto}` : produto.tipoProduto;
            
            cardContainer.innerHTML += `
                <div class="card d-flex flex-column justify-content-between">
                    <div class="card-imagem-container">
                        <img src="${produto.fotoProduto}" class="card-img-top card-imagem" alt="${produto.tituloProduto}">
                    </div>
                    <div class="card-content">
                        <div class="d-flex justify-content-between align-content-center align-items-center">
                            <h5 class="card-titulo text-capitalize">${produto.tituloProduto}</h5>
                            ${
                                produto.email !== userLogado.user
                                ? `<button class="card-btn btn-favoritar" data-id="${produto.id}" title="${produto.isFavorite ? "Clique para Remover da lista de favoritos" : "Clique para Adicionar a lista de favoritos"}">${produto.isFavorite ? "Desfavoritar" : "Favoritar"}</button>`
                                : ''
                            }
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

        // Adiciona evento de favoritar para cada botão individualmente
        document.querySelectorAll('.btn-favoritar').forEach(button => {
            button.addEventListener('click', favoritar);
        });
    };

    // Função para favoritar/desfavoritar produto
    const favoritar = event => {
        const produtoId = Number(event.target.getAttribute('data-id'));
        const produtosAtualizados = produtos.map((produto) => {
            if (produto.id === produtoId) {
                return { ...produto, isFavorite: !produto.isFavorite };
            }
            return produto;
        });

        localStorage.setItem('anuncios', JSON.stringify(produtosAtualizados));
        renderizarProdutos(produtosAtualizados); // Atualiza a renderização dos produtos
        location.reload();
    };

    // Inicializa a renderização de todos os produtos
    renderizarProdutos(produtos);

    // Funções de filtro
    const aplicarFiltro = filtro => {
        const produtosFiltrados = produtos.filter(filtro);
        renderizarProdutos(produtosFiltrados);
    };

    // Eventos de clique para filtros
    document.getElementById('btn-item__novidades').addEventListener('click', () => {
        titulo.innerHTML = "Novidades"
        aplicarFiltro(() => true); // Todos os produtos
    });

    document.getElementById('btn-item__venda').addEventListener('click', () => {
        titulo.innerHTML = "Itens de Venda"
        aplicarFiltro(produto => produto.tipoProduto === 'Venda');
    });

    document.getElementById('btn-item__troca').addEventListener('click', () => {
        titulo.innerHTML = "Itens de Troca"
        aplicarFiltro(produto => produto.tipoProduto === 'Troca');
    });

    document.getElementById('btn-item__doacoes').addEventListener('click', () => {
        titulo.innerHTML = "Doações"
        aplicarFiltro(produto => produto.tipoProduto === 'Doação');
    });

    document.getElementById('btn-item__desejos').addEventListener('click', () => {
        titulo.innerHTML = "Lista de Desejos"
        aplicarFiltro(produto => produto.isFavorite === true);
    });
});
