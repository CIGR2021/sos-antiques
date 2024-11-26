const button = document.querySelector('#entrar')

button.addEventListener('click', event => entrar(event))


const entrar = event => {
    event.preventDefault();
    const username = document.querySelector('#inputEmail');
    const userLabel = document.querySelector('#labelEmail');
    
    const password = document.querySelector('#inputPassword');
    const passLabel = document.querySelector('#labelPassword');

    const msgError = document.querySelector('#msgError');

    if (!username.value || !password.value) {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Por favor, preencha todos os campos.';
        msgError.setAttribute('style', 'color: red')
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('Usuarios')) || []
    
    let userValid = {
        nome: '',
        user: '',
        senha: ''
    }
    
    usuarios.map(item => {
        
        if(username.value === item.Email && password.value === item.Senha)
            userValid = {
                nome: item.NomeCompleto,
                user: item.Email,
                senha: item.Senha,
                telefone: item.Telefone,
                foto: item.foto,
                cpf: item.CPF_CNPJ,
                nascimento: item.DataNascimento,
                local: item.local,
                saldo: item.saldo
            }
    })

    if(username.value === userValid.user && password.value === userValid.senha) {
        setTimeout(() => {
            window.location.href = "../pages/catalogo.html";
        })

        const token = Math.random().toString(16).substring(2)
        localStorage.setItem('token', token)

        localStorage.setItem('userLogado', JSON.stringify(userValid))
    } else {
        userLabel.setAttribute('style', 'color: red')
        username.setAttribute('style', 'border-color: red')
        passLabel.setAttribute('style', 'color: red')
        password.setAttribute('style', 'border-color: red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Usuário ou senha incorreto'
        username.focus()
    }
}
