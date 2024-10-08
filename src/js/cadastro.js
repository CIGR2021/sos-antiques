// Cadastro
const cadastrar = document.getElementById('cadastro-form');

cadastrar.addEventListener('submit', (event) => {
    event.preventDefault();

    const NomeCompleto = document.getElementById('inputNome').value;
    const Telefone = document.getElementById('inputTelefone').value;
    const CPF_CNPJ = document.getElementById('inputCPF_CNPJ').value;
    const DataNascimento = document.getElementById('inputDataNascimento').value;
    const Email = document.getElementById('inputEmail').value
    const Senha = document.getElementById('inputPassword').value;
    const AceitarTermo = document.getElementById('inputCheckBoxAgree').checked;
    const Novidades = document.getElementById('inputCheckBoxNews').checked;

    // console.log('Usuário', username, "Senha", password);
    // Recupera os usuários já cadastrados
    const usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];

    // Adiciona o novo usuário ao array
    if(usuarios.CPF_CNPJ === CPF_CNPJ){
        alert('Usuário já Cadastrado!');
    } else {
        usuarios.push({
            NomeCompleto,
            Telefone,
            CPF_CNPJ,
            DataNascimento,
            Email,
            Senha,
            AceitarTermo,
            Novidades,
        });

        // Armazena o array atualizado no localStorage
        localStorage.setItem("Usuarios", JSON.stringify(usuarios));
        alert('Cadastro realizado com sucesso!');
    }
    window.location.href = '/src/pages/login.html';
});