//formulario
const cadastrar = document.getElementById("cadastro-form");

// Função para exibir o modal
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
  modal.style.zIndex = '9999';

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
    window.location.href = "../pages/login.html";
  });

  modalContent.appendChild(botaoFechar);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
};

const aplicarMascaraCPF = cpf => {
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
};

//inicio máscara
const aplicarMascaraTelefone = telefone => {
  telefone = telefone.replace(/\D/g, '');
  telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
  telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
  return telefone;
};

const cpfInput = document.getElementById('inputCPF_CNPJ');
const telefoneInput = document.getElementById('inputTelefone');

cpfInput.addEventListener('input', (e) => {
  e.target.value = aplicarMascaraCPF(e.target.value);
});

telefoneInput.addEventListener('input', (e) => {
  e.target.value = aplicarMascaraTelefone(e.target.value);
});

//fim mascara
cadastrar.addEventListener("submit", (event) => {
  event.preventDefault();

  const NomeCompleto = document.getElementById("inputNome").value;
  const Telefone = document.getElementById("inputTelefone").value;
  const CPF_CNPJ = document.getElementById("inputCPF_CNPJ").value;
  const DataNascimento = document.getElementById("inputDataNascimento").value;
  const Email = document.getElementById("inputEmail").value;
  const Senha = document.getElementById("inputPassword").value;
  const foto = '';
  const local = '';
  const saldo = '0.00';

  const senhaErro = document.getElementById('senhaErro');
  senhaErro.textContent = ''; //limpa mensagens de erro anteriores

  //recupera os usuários já cadastrados
  const usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];

  //verifica se já existe um usuário com o mesmo email
  const usuarioExistente = usuarios.find(usuario => usuario.Email === Email);
  if (usuarioExistente) {
    senhaErro.textContent = 'Já existe um usuário cadastrado com este e-mail.';
    senhaErro.classList.add('error-message-show');

    return; //se sim interrompe o cadastro
  }

  //expressões regulares para validação de senha
  const regex = /(.)\1{1,}|qwerty|asdf|zxcv|ytrewq|fdsa|vcxz/;
  const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //função de validação da senha
  const validarSenha = (senha) => {
    senhaErro.classList.remove('error-message-show');
    if (!senhaForte.test(senha)) {
      senhaErro.textContent = 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
      senhaErro.classList.add('error-message-show');
      return false;
    }
    if (regex.test(senha)) {
      senhaErro.textContent = 'Senha inválida. Contém padrões não aceitos.';
      senhaErro.classList.add('error-message-show');
      return false;
    }
    return true;
  };

  //validação da senha
  if (validarSenha(Senha)) {
    //adiciona o novo usuário
    usuarios.push({
      NomeCompleto,
      Telefone,
      CPF_CNPJ,
      DataNascimento,
      Email,
      Senha,
      foto,
      local,
      saldo
    });

    //armazena o usuário no array atualizado no localStorage
    localStorage.setItem("Usuarios", JSON.stringify(usuarios));

    exibirModal("Cadastro realizado com sucesso!");
  }
});

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('inputPassword');

togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  
  //troca o ícone do botão de visualizar/ocultar senha
  togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
});
