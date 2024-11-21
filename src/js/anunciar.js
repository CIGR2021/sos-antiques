document.addEventListener('DOMContentLoaded', () => {
    const radioTroca = document.getElementById('tipo-produto--troca');
    const radioVenda = document.getElementById('tipo-produto--venda');
    const radioDoacao = document.getElementById('tipo-produto--doacao');
    const inputPreco = document.getElementById('input__preco-produto');

    function alternarInputPreco() {
        if (radioTroca.checked || radioDoacao.checked) {
            inputPreco.disabled = true;
            inputPreco.value = '';
            inputPreco.removeAttribute('required');
        } else {
            inputPreco.disabled = false;
            inputPreco.setAttribute('required', 'required');
        }
    }

    alternarInputPreco();

    radioTroca.addEventListener('change', alternarInputPreco);
    radioVenda.addEventListener('change', alternarInputPreco);
    radioDoacao.addEventListener('change', alternarInputPreco);
});

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById("form");
    const notificacao = document.getElementById("notificacao");

    formulario.addEventListener('submit', event => {
        event.preventDefault();
        document.querySelector('input[type="number"]').addEventListener('input', function (event) {
            this.value = this.value.replace(',', '.');
        });

        const formData = new FormData(formulario);
        const data = Object.fromEntries(formData);
        const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
        const userLogado = JSON.parse(localStorage.getItem('userLogado'));
        
        if (!userLogado) {
            notificacao.textContent = "Erro: Usuário não está logado.";
            notificacao.classList.remove('alert-success');
            notificacao.classList.add('alert-danger');
            notificacao.style.display = 'block';
            return;
        }

        console.log(data);
        console.log(userLogado);
        
        const produtoId = Date.now();
        const telefoneSomenteNumeros = userLogado.telefone.replace(/\D/g, '');
        if(data.fotoProduto === "" || data.fotoProduto == null) {
            data.fotoProduto = "../img/default-product.png"
        }

        anuncios.push({
            id: produtoId,
            tituloProduto: data.tituloProduto,
            tipoProduto: data.tipoProduto,
            categoriaProduto: data.categoriaProduto,
            condicaoProduto: data.condicaoProduto,
            precoProduto: data.precoProduto,
            descricaoProduto: data.descricaoProduto,
            fotoProduto: data.fotoProduto,
            termoContato: data.termoContato,
            telefone: telefoneSomenteNumeros,
            email: userLogado.user
        })

        localStorage.setItem('anuncios', JSON.stringify(anuncios));

        notificacao.textContent = "Anúncio feito com sucesso!";
        notificacao.classList.remove('alert-danger');
        notificacao.classList.add('alert-success');
        notificacao.style.display = 'block';

        window.location.href = `../pages/produto.html?id=${produtoId}`;
    });
});