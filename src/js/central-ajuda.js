//formulario
const centralAjuda = document.getElementById("central-ajuda-form");

// Função para exibir o modal
const exibirModal = (mensagem) => {
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
    window.location.href = "../pages/catalogo.html";
  });

  modalContent.appendChild(botaoFechar);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
};

//inicio máscara
const aplicarMascaraTelefone = telefone => {
  telefone = telefone.replace(/\D/g, '');
  telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
  telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
  return telefone;
};

const telefoneInput = document.getElementById('inputTelefone');

telefoneInput.addEventListener('input', (e) => {
  e.target.value = aplicarMascaraTelefone(e.target.value);
});

//fim mascara
centralAjuda.addEventListener("submit", (event) => {
  event.preventDefault();

  const Email = document.getElementById("inputEmail").value;
  const Assunto = document.getElementById("inputAssunto").value;
  const ProblemaDuvida = document.getElementById("textAreaProblemaDuvida").value;

  //recupera os usuários já cadastrados
  const usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];
  //verifica se já existe um usuário com o mesmo email
  const usuarioExistente = usuarios.find(usuario => usuario.Email === Email && usuario);

  const pedido = {
    ...usuarioExistente,
    "PedidoAjuda": {
      Assunto,
      ProblemaDuvida
    }
  };
  
  localStorage.setItem('Pedido de Ajuda', JSON.stringify(pedido));

  // Exibe o modal
  exibirModal("A solicitação de ajuda foi realizada com sucesso, aguarde que a equipe de suporte entrará em contato!");
});
