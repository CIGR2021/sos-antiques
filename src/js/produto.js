document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const produtoId = params.get('id');

    const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    
    const btnComprarProduto = document.getElementById("btnComprarProduto");
    const btnEditarProduto = document.getElementById("btnEditarProduto");
    const btnApagarProduto = document.getElementById("btnApagarProduto");
    const confirmacaoApagarProduto = document.getElementById("confirmacaoApagarProduto");

    const fotoProduto = document.getElementById('fotoProduto');
    const tituloProduto = document.getElementById('tituloProduto');
    const condicaoProduto = document.getElementById('condicaoProduto');
    const categoriaProduto = document.getElementById('categoriaProduto');
    const descricaoProduto = document.getElementById('descricaoProduto');
    const telefone = document.getElementById('telefone');
    const email = document.getElementById('email');
    const precoProduto = document.getElementById('precoProduto');
    
    const produto = anuncios.find(item => item.id === produtoId);

    if (produto) {
        fotoProduto.src = produto.fotoProduto;
        tituloProduto.textContent = produto.tituloProduto;
        condicaoProduto.textContent = produto.condicaoProduto
        categoriaProduto.textContent = produto.categoriaProduto
        descricaoProduto.textContent = produto.descricaoProduto;

        if(produto.termoContato === "aceita") {
            telefone.href = `https://wa.me/${produto.telefone}`;
            email.textContent = `E-mail do anunciante: ${produto.email}`;
        } else { 
            email.textContent = "Este anunciante não disponibilizou informação para contato.";
            telefone.style = "display: none"
        }
        if(produto.tipoProduto === "Venda") {
            precoProduto.textContent = `R$ ${produto.precoProduto}`.replace('.', ',');
        } else {
            precoProduto.textContent = `Produto para: ${produto.tipoProduto}`;
        }

        if(produto.email === userLogado.user) {
            btnComprarProduto.style = "display: none"
            btnEditarProduto.style = "display: block"
            btnApagarProduto.style = "display: block"
        }
    } else {
        tituloProduto.textContent = "Produto não encontrado.";
    }

    function apagarProduto() {
        const novaLista = anuncios.filter(item => item.id !== parseInt(produtoId));
        localStorage.setItem('anuncios', JSON.stringify(novaLista));
        alert('Anúncio apagado com sucesso!');
        window.location.href = "../pages/catalogo.html";
    }

    confirmacaoApagarProduto?.addEventListener('click', apagarProduto);
    btnEditarProduto?.addEventListener('click', () => {
        alert('Função de edição em desenvolvimento!');
    });
});