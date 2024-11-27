document.addEventListener('DOMContentLoaded', () => {
    const solicitacoesAjuda = document.getElementById('solicitacoes-ajuda');
    const listaPedidoAjuda = JSON.parse(localStorage.getItem('Pedido de Ajuda')) || [];
    // const userLogado = JSON.parse(localStorage.getItem('userLogado')) || [];

    // const desejos = anuncios.filter(item => item.isFavorite !== false && item.email !== userLogado.user && item);
    
    // localStorage.setItem('Lista de Desejos', JSON.stringify(desejos));

    const renderizarProdutos = filtrados => {
        solicitacoesAjuda.innerHTML = ''; // Limpa o container antes de renderizar os produtos filtrados
        filtrados.map(pedido => {
            solicitacoesAjuda.innerHTML += `
                <div class="card d-flex flex-row">
                <div class="card-content">
                    <h5 class="card-titulo text-capitalize">COD - ${pedido.Id}</h5>
                    <div class="d-flex flex-column justify-content-between gap-1">
                        <p class="card-texto text-capitalize">Solicitado por: <span class="fs-4">${pedido.NomeCompleto}</span></p>
                        <p class="card-texto">Email do usuário: <span class="fs-4">${pedido.Email}</span></p>
                        <p class="card-texto">Telefone do usuário: <span class="fs-4">${pedido.Telefone}</span></p>
                        <p class="card-texto">Assunto da solicitação: <span class="fs-4">${pedido.PedidoAjuda.Assunto}</span></p>
                        <p class="card-texto">Problema/Dúvida a ser resolvido: <span class="fs-4">${pedido.PedidoAjuda.ProblemaDuvida}</span></p>
                    </div>
                </div>
            </div>
            `;
        });
    }

    // carregar todos os produtos como "novidades" no primeiro carregamento
    renderizarProdutos(listaPedidoAjuda);
});
