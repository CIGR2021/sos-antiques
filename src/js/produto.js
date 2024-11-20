document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const produtoId = params.get('id');

    const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    
    const btnComprarProduto = document.getElementById("btnComprarProduto");
    const btnEditarProduto = document.getElementById("btnEditarProduto");
    const btnApagarProduto = document.getElementById("btnApagarProduto");
    const confirmacaoApagarProduto = document.getElementById("confirmacaoApagarProduto");
    const confirmacaoAlterarProduto = document.getElementById("confirmacaoAlteracaoProduto");
    const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

    const fotoProduto = document.getElementById('fotoProduto');
    const tituloProduto = document.getElementById('tituloProduto');
    const condicaoProduto = document.getElementById('condicaoProduto');
    const categoriaProduto = document.getElementById('categoriaProduto');
    const descricaoProduto = document.getElementById('descricaoProduto');
    const telefone = document.getElementById('telefone');
    const email = document.getElementById('email');
    const precoProduto = document.getElementById('precoProduto');
    const saldoAtual = document.getElementById('saldoAtual');
    const valorDoProduto = document.getElementById("valorDoProduto");
    const inputAdicionarSaldo = document.getElementById("inputAdicionarSaldo");
    
    const produto = anuncios.find(item => item.id == produtoId);

    if (produto) {
        fotoProduto.src = produto.fotoProduto;
        tituloProduto.textContent = produto.tituloProduto;
        condicaoProduto.textContent = produto.condicaoProduto
        categoriaProduto.textContent = produto.categoriaProduto
        descricaoProduto.textContent = produto.descricaoProduto;
        saldoAtual.textContent += userLogado.saldo;
        valorDoProduto.textContent += produto.precoProduto;

        if(produto.termoContato == "aceita") {
            telefone.href = `https://wa.me/${produto.telefone}`;
            email.textContent = `E-mail do anunciante: ${produto.email}`;
        } else { 
            email.textContent = "Este anunciante não disponibilizou informação para contato.";
            telefone.style = "display: none"
        }
        if(produto.tipoProduto == "Venda") {
            precoProduto.textContent = `R$ ${produto.precoProduto}`.replace('.', ',');
            btnComprarProduto.textContent = "Comprar"
        } else {
            precoProduto.textContent = `Produto para: ${produto.tipoProduto}`;
            btnComprarProduto.textContent = "Chamar anunciante"
            btnComprarProduto.removeAttribute('data-bs-toggle');
            btnComprarProduto.removeAttribute('data-bs-target');
            btnComprarProduto.addEventListener('click', function () {
                window.open(`https://wa.me/${produto.telefone}`, '_blank');
            });
        }

        if(produto.email == userLogado.user) {
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
        window.location.href = "/pages/catalogo.html";
    }

    function editarProduto() {

        if (produto.tipoProduto === "Venda") {
            document.getElementById("tipo-produto--venda").checked = true;
        } else if (produto.tipoProduto === "Troca") {
            document.getElementById("tipo-produto--troca").checked = true;
        } else if (produto.tipoProduto === "Doação") {
            document.getElementById("tipo-produto--doacao").checked = true;
        }

        document.getElementById("select-categoria").value = produto.categoriaProduto;
        document.getElementById("select-condicao").value = produto.condicaoProduto;
        document.getElementById("input__tituloproduto").value = produto.tituloProduto;
        document.getElementById("input__descricao-produto").value = produto.descricaoProduto || "";
        document.getElementById("input__preco-produto").value = produto.precoProduto || "";
        document.getElementById("foto-produto").value = produto.fotoProduto || "";

        const termoContatoCheckbox = document.getElementById("termo-contato");
        termoContatoCheckbox.checked = produto.termoContato === "aceita";
    }

    function salvarAlteracoesProduto() {

        produto.tipoProduto = document.querySelector('input[name="tipoProduto"]:checked').value || produto.tipoProduto;
        produto.categoriaProduto = document.getElementById("select-categoria").value || produto.categoriaProduto;
        produto.condicaoProduto = document.getElementById("select-condicao").value || produto.condicaoProduto;
        produto.tituloProduto = document.getElementById("input__tituloproduto").value || produto.tituloProduto;
        produto.descricaoProduto = document.getElementById("input__descricao-produto").value || produto.descricaoProduto;
        produto.precoProduto = document.getElementById("input__preco-produto").value || produto.precoProduto;
        produto.fotoProduto = document.getElementById("foto-produto").value || produto.fotoProduto;

        const termoContatoCheckbox = document.getElementById("termo-contato");
        produto.termoContato = termoContatoCheckbox.checked ? "aceita" : "não aceita";
    
        const novaLista = anuncios.map(item => item.id === produto.id ? produto : item);
        localStorage.setItem('anuncios', JSON.stringify(novaLista));
    
        alert('Alterações salvas com sucesso!');
        location.reload();
    }

    function comprarProduto() {
        const saldoAdicionado = parseFloat(inputAdicionarSaldo.value);
        const saldoUsuario = parseFloat(userLogado.saldo);
        const saldoTotal = saldoAdicionado + saldoUsuario;
        const preco = parseFloat(produto.precoProduto);

        console.log(saldoTotal)

        if(saldoTotal >= preco) {
            userLogado.saldo = saldoTotal - preco;

            localStorage.setItem('userLogado', JSON.stringify(userLogado));

            const usuarios = JSON.parse(localStorage.getItem('Usuarios'));
            const index = usuarios.findIndex(usuario => usuario.Email === userLogado.user);
            if (index !== -1) {
                usuarios[index].saldo = userLogado.saldo;
            }

            const vendedor = usuarios.find(usuario => usuario.Email === produto.email);
            if(vendedor) {
                vendedor.saldo = parseFloat(vendedor.saldo) + preco
            }

            localStorage.setItem('Usuarios', JSON.stringify(usuarios));
            
            const anunciosComprados = JSON.parse(localStorage.getItem('anunciosComprados')) || [];
            produto.comprador = userLogado.user;

            const dataAtual = new Date();
            const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            produto.dataCompra = dataFormatada;
            anunciosComprados.push(produto);
            localStorage.setItem('anunciosComprados', JSON.stringify(anunciosComprados));

            const novaListaAnuncios = anuncios.filter(item => item.id !== produto.id);
            localStorage.setItem('anuncios', JSON.stringify(novaListaAnuncios));

            alert('Compra realizada com sucesso!');
            window.location.href = "/pages/catalogo.html";
        } else {
            alert('Saldo insuficiente para a compra!');
        }
    }

    confirmacaoApagarProduto?.addEventListener('click', apagarProduto);
    btnEditarProduto.addEventListener('click', editarProduto);
    confirmacaoAlterarProduto.addEventListener('click', salvarAlteracoesProduto);
    btnFinalizarCompra.addEventListener('click', comprarProduto);
});