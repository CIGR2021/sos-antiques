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

function salvarFotoDePerfil(novaFotoUrl, userLogado) {
    const fotoPerfil = document.getElementById("fotoPerfil");

    if (novaFotoUrl.trim()) {
        fotoPerfil.src = novaFotoUrl;
        userLogado.foto = novaFotoUrl;

        const usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];
        const index = usuarios.findIndex(usuario => usuario.Email == userLogado.user);
        console.log(index)

        if (index !== -1) {
            usuarios[index].foto = novaFotoUrl;
            localStorage.setItem('Usuarios', JSON.stringify(usuarios));
        }

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
        document.getElementById('nameUsuario').value = userLogado.nome || '';
        document.getElementById('cpfUsuario').value = userLogado.cpf || '';
        document.getElementById('telUsuario').value = userLogado.telefone || '';
        document.getElementById('cidadeUsuario').value = userLogado.local || '';
        document.getElementById('senhaUsuario').value = '';
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
        location.reload();
    }
});

const botaoSalvarEdicao = document.getElementById("btn-salvarDados");

botaoSalvarEdicao.addEventListener('click', function () {
    const nomeAtualizado = document.getElementById('nameUsuario').value;
    const cpfAtualizado = document.getElementById('cpfUsuario').value;
    const telefoneAtualizado = document.getElementById('telUsuario').value;
    const senhaAtualizada = document.getElementById('senhaUsuario').value;
    const cidadeUsuario = document.getElementById('cidadeUsuario').value;

    let userLogado = JSON.parse(localStorage.getItem('userLogado'));
    let usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];

    if (userLogado) {
        userLogado.nome = nomeAtualizado || userLogado.nome;
        userLogado.cpf = cpfAtualizado || userLogado.cpf;
        userLogado.telefone = telefoneAtualizado || userLogado.telefone;
        userLogado.local = cidadeUsuario || userLogado.local;
        if (senhaAtualizada) {
            userLogado.senha = senhaAtualizada;
        }

        const indexUsuario = usuarios.findIndex(usuario => usuario.Email === userLogado.user);
        console.log(indexUsuario)
        if (indexUsuario !== -1) {
            usuarios[indexUsuario].NomeCompleto = userLogado.nome;
            usuarios[indexUsuario].Telefone = userLogado.telefone;
            usuarios[indexUsuario].CPF_CNPJ = userLogado.cpf;
            usuarios[indexUsuario].local = userLogado.local;
            if (senhaAtualizada) {
                usuarios[indexUsuario].Senha = userLogado.senha;
            }
        }

        localStorage.setItem('userLogado', JSON.stringify(userLogado));
        localStorage.setItem('Usuarios', JSON.stringify(usuarios));

        alert('Dados atualizados com sucesso!');
    } else {
        alert('Erro ao salvar as alterações. Nenhum usuário logado encontrado.');
    }
    location.reload();
});
