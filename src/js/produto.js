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
    modal.style.zIndex = '1000';
  
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
      if(link !== "") window.location.href = link;
    });
  
    modalContent.appendChild(botaoFechar);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
};

document.addEventListener('DOMContentLoaded', () => {
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
    
    const produto = anuncios.find(item => Number(item.id) === Number(produtoId));

    if (produto) {
        fotoProduto.src = produto.fotoProduto;
        tituloProduto.textContent = produto.tituloProduto;
        condicaoProduto.textContent = produto.condicaoProduto
        categoriaProduto.textContent = produto.categoriaProduto
        descricaoProduto.textContent = produto.descricaoProduto;
        saldoAtual.textContent += userLogado.saldo;
        valorDoProduto.textContent += produto.precoProduto;

        if(produto.termoContato === "aceita") {
            telefone.href = `https://wa.me/${produto.telefone}`;
            email.textContent = `E-mail do anunciante: ${produto.email}`;
        } else { 
            email.textContent = "Este anunciante não disponibilizou informação para contato.";
            telefone.style = "display: none"
        }
        if(produto.tipoProduto === "Venda") {
            precoProduto.textContent = `R$ ${produto.precoProduto}`.replace('.', ',');
            btnComprarProduto.textContent = "Comprar"
        } else {
            precoProduto.textContent = `Produto para: ${produto.tipoProduto}`;
            btnComprarProduto.textContent = "Chamar anunciante"
            btnComprarProduto.removeAttribute('data-bs-toggle');
            btnComprarProduto.removeAttribute('data-bs-target');
            btnComprarProduto.addEventListener('click', () => {
                window.open(`https://wa.me/${produto.telefone}`, '_blank');
            });
        }

        if(produto.email === userLogado.user) {
            btnComprarProduto.style = "display: none"
            btnEditarProduto.style = "display: block"
            btnApagarProduto.style = "display: block"
        }

    } else {
        tituloProduto.textContent = "Produto não encontrado.";
    }

    const apagarProduto = () => {
        const novaLista = anuncios.filter(item => Number(item.id) !== Number(produtoId));
        localStorage.setItem('anuncios', JSON.stringify(novaLista));
        exibirModal("Anúncio apagado com sucesso!", "../pages/catalogo.html")
    }

    const editarProduto = () => {

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

    const salvarAlteracoesProduto = () => {

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
    
        exibirModal("Alterações salvas com sucesso!")
        location.reload();
    }

    const comprarProduto = () => {
        const saldoAdicionado = parseFloat(inputAdicionarSaldo.value);
        const saldoUsuario = parseFloat(userLogado.saldo);
        const saldoTotal = saldoAdicionado + saldoUsuario;
        const preco = parseFloat(produto.precoProduto);

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

            exibirModal("Compra realizada com sucesso!", "../pages/catalogo.html")
        } else {
            exibirModal("Saldo insuficiente para a compra!")
        }
    }

    confirmacaoApagarProduto?.addEventListener('click', apagarProduto);
    btnEditarProduto.addEventListener('click', editarProduto);
    confirmacaoAlterarProduto.addEventListener('click', salvarAlteracoesProduto);
    btnFinalizarCompra.addEventListener('click', comprarProduto);    
});