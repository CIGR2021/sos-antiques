// Atualizar o perfil do userLogado
function renderizarPerfilUsuario(userLogado) {
    const fotoPerfil = document.getElementById("fotoPerfil");
    const nomeUsuario = document.getElementById("nomeUsuario");
    const localUsuario = document.getElementById("localUsuario");
    const telefoneUsuario = document.getElementById("telefoneUsuario");
    const emailUsuario = document.getElementById("emailUsuario");

    fotoPerfil.src = userLogado.foto || `/img/default-avatar.jpeg`;
    nomeUsuario.textContent = userLogado.nome;
    localUsuario.textContent = userLogado.local || "Não informado";
    telefoneUsuario.textContent = userLogado.telefone;
    emailUsuario.textContent = userLogado.user;
}

// Exibir os produtos do userLogado
function exibirProdutosUsuario(produtos, emailUsuario, container) {
    const meusProdutos = produtos.filter(produto => produto.email === emailUsuario);

    container.innerHTML = ''; // Limpa o container antes de adicionar produtos
    meusProdutos.forEach(produto => {
        const precoDoProduto = produto.tipoProduto === 'Venda' 
            ? `R$ ${produto.precoProduto}` 
            : produto.tipoProduto;

        container.innerHTML += `
            <div class="card d-flex flex-column justify-content-between">
                <div class="card-imagem-container">
                    <img src="${produto.fotoProduto}" class="card-img-top card-imagem" alt="...">
                </div>
                <div class="card-content">
                    <h5 class="card-titulo text-capitalize">${produto.tituloProduto}</h5>
                    <div class="d-flex justify-content-between align-content-center align-items-center">
                        <p class="card-preco">${precoDoProduto}</p>
                        <a href="/pages/produto.html?id=${produto.id}" class="card-btn">Visualizar</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Atualizar a foto de perfil
function salvarFotoDePerfil(novaFotoUrl, userLogado) {
    const fotoPerfil = document.getElementById("fotoPerfil");

    if (novaFotoUrl.trim()) {
        // Atualiza a foto de perfil do usuário logado
        fotoPerfil.src = novaFotoUrl;
        userLogado.foto = novaFotoUrl;

        // Atualiza o usuário na lista de usuários
        const usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];
        const index = usuarios.findIndex(usuario => usuario.Email == userLogado.user);
        console.log(index)

        if (index !== -1) {
            // Atualiza o usuário encontrado na lista de usuários
            usuarios[index].foto = novaFotoUrl;

            // Salva a lista de usuários atualizada no localStorage
            localStorage.setItem('Usuarios', JSON.stringify(usuarios));
        }

        // Atualiza o userLogado no localStorage
        localStorage.setItem('userLogado', JSON.stringify(userLogado));

        alert('Foto de perfil atualizada com sucesso!');
    } else {
        alert('Por favor, insira uma URL válida para a foto.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    const produtos = JSON.parse(localStorage.getItem('anuncios')) || [];
    const containerProdutos = document.getElementById("containerProdutos");

    if (userLogado) {
        renderizarPerfilUsuario(userLogado);
        exibirProdutosUsuario(produtos, userLogado.user, containerProdutos);
    } else {
        alert('Nenhum usuário logado encontrado.');
    }
});

// Evento para salvar a foto de perfil
const botaoSalvarFoto = document.getElementById("btn-salvarFoto");
const inputUrlFoto = document.getElementById("input-fotoPerfil");

botaoSalvarFoto.addEventListener('click', function() {
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    if (userLogado) {
        salvarFotoDePerfil(inputUrlFoto.value, userLogado);
    }
});

const botaoSalvarEdicao = document.getElementById("btn-salvarDados");