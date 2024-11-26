const exibirModal = mensagem => {
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
    });
  
    modalContent.appendChild(botaoFechar);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
};

const renderizarPerfilUsuario = userLogado => {
    const fotoPerfil = document.getElementById("fotoPerfil");
    const nomeUsuario = document.getElementById("nomeUsuario");
    const localUsuario = document.getElementById("localUsuario");
    const telefoneUsuario = document.getElementById("telefoneUsuario");
    const emailUsuario = document.getElementById("emailUsuario");

    fotoPerfil.src = userLogado.foto || "../img/default-avatar.jpeg";
    nomeUsuario.textContent = userLogado.nome;
    localUsuario.textContent = userLogado.local || "Não informado";
    telefoneUsuario.textContent = userLogado.telefone;
    emailUsuario.textContent = userLogado.user;
}

const exibirProdutosUsuario = (produtos, emailUsuario, container) => {
    const meusProdutos = produtos.filter(produto => produto.email === emailUsuario);

    container.innerHTML = ''; // Limpa o container antes de adicionar produtos
    meusProdutos.map(produto => {
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
                        <a href="../pages/produto.html?id=${produto.id}" class="card-btn">Visualizar</a>
                    </div>
                </div>
            </div>
        `;
    });
}

const salvarFotoDePerfil = (novaFotoUrl, userLogado) => {
    const fotoPerfil = document.getElementById("fotoPerfil");

    if (novaFotoUrl.trim()) {
        fotoPerfil.src = novaFotoUrl;
        userLogado.foto = novaFotoUrl;

        const usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];
        const index = usuarios.findIndex(usuario => usuario.Email === userLogado.user);

        if (index !== -1) {
            usuarios[index].foto = novaFotoUrl;
            localStorage.setItem('Usuarios', JSON.stringify(usuarios));
        }

        localStorage.setItem('userLogado', JSON.stringify(userLogado));

        exibirModal("Foto de perfil atualizada com sucesso!")
    } else {
        exibirModal("Por favor, insira uma URL válida para a foto.")
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
        exibirModal("Nenhum usuário logado encontrado.")
    }
});

// Evento para salvar a foto de perfil
const botaoSalvarFoto = document.getElementById("btn-salvarFoto");
const inputUrlFoto = document.getElementById("input-fotoPerfil");

botaoSalvarFoto.addEventListener('click', () => {
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    if (userLogado) {
        salvarFotoDePerfil(inputUrlFoto.value, userLogado);
        location.reload();
    }
});

const botaoSalvarEdicao = document.getElementById("btn-salvarDados");

botaoSalvarEdicao.addEventListener('click', () => {
    const nomeAtualizado = document.getElementById('nameUsuario').value;
    const cpfAtualizado = document.getElementById('cpfUsuario').value;
    const telefoneAtualizado = document.getElementById('telUsuario').value;
    const senhaAtualizada = document.getElementById('senhaUsuario').value;
    const cidadeUsuario = document.getElementById('cidadeUsuario').value;

    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    const usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];

    if (userLogado) {
        userLogado.nome = nomeAtualizado || userLogado.nome;
        userLogado.cpf = cpfAtualizado || userLogado.cpf;
        userLogado.telefone = telefoneAtualizado || userLogado.telefone;
        userLogado.local = cidadeUsuario || userLogado.local;
        if (senhaAtualizada) {
            userLogado.senha = senhaAtualizada;
        }

        const indexUsuario = usuarios.findIndex(usuario => usuario.Email === userLogado.user);
        
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

        exibirModal("Dados atualizados com sucesso!")
    } else {
        exibirModal("Erro ao salvar as alterações. Nenhum usuário logado encontrado.")
    }
    location.reload();
});
