document.addEventListener('DOMContentLoaded', function() {
    const radioTroca = document.getElementById('tipo-produto--troca');
    const radioVenda = document.getElementById('tipo-produto--venda');
    const radioDoacao = document.getElementById('tipo-produto--doacao');
    const inputPreco = document.getElementById('input__preco-produto');

    function alternarInputPreco() {
        if (radioTroca.checked || radioDoacao.checked) {
            inputPreco.disabled = true;
            inputPreco.value = '';
        } else {
            inputPreco.disabled = false;
        }
    }

    alternarInputPreco();

    radioTroca.addEventListener('change', alternarInputPreco);
    radioVenda.addEventListener('change', alternarInputPreco);
    radioDoacao.addEventListener('change', alternarInputPreco);
});

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById("form");
    const notificacao = document.getElementById("notificacao");

    formulario.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(formulario);
        const data = Object.fromEntries(formData);
        const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
        
        console.log(data);
        
        anuncios.push({
            tituloProduto: data.tituloProduto,
            tipoProduto: data.tipoProduto,
            categoriaProduto: data.categoriaProduto,
            condicaoProduto: data.condicaoProduto,
            precoProduto: data.precoProduto,
            descricaoProduto: data.descricaoProduto,
            fotoProduto: data.fotoProduto,
            termoPontato: data.termoPontato
        })

        localStorage.setItem('anuncios', JSON.stringify(anuncios));

        notificacao.textContent = "Anúncio feito com sucesso!";
        notificacao.classList.remove('alert-danger');
        notificacao.classList.add('alert-success');
        notificacao.style.display = 'block';
    });
});