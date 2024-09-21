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
        const anunciosURL = `https://3bd58c72-f964-4b92-93e0-0271a7351617-00-dz66xwnwvvxl.janeway.replit.dev/anuncios`;

        fetch(`${anunciosURL}`, {
            method: 'POST',
            body: JSON.stringify({
                "titulo-produto": data['titulo-produto'],
                "tipo-produto": data['tipo-produto'],
                "categoria-produto": data['categoria-produto'],
                "condicao-produto": data['condicao-produto'],
                "preco-produto": data['preco-produto'],
                "descricao-produto": data['descricao-produto'],
                "foto-produto": data['foto-produto'],
                "termo-contato": data['termo-contato']
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                notificacao.textContent = "Anúncio feito com sucesso!";
                notificacao.classList.remove('alert-danger');
                notificacao.classList.add('alert-success');
            } else {
                return response.json().then(err => { 
                    throw new Error(err.message);
                });
            }
        })
        .catch(error => {
            notificacao.textContent = `Erro ao fazer o anúncio: ${error.message}`;
            notificacao.classList.remove('alert-success');
            notificacao.classList.add('alert-danger');
        })
        .finally(() => {
            notificacao.style.display = 'block';
        });
    });
});