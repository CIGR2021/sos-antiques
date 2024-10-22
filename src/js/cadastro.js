// Cadastro
const cadastrar = document.getElementById("cadastro-form");

cadastrar.addEventListener("submit", (event) => {
  event.preventDefault();

  const NomeCompleto = document.getElementById("inputNome").value;
  const Telefone = document.getElementById("inputTelefone").value;
  const CPF_CNPJ = document.getElementById("inputCPF_CNPJ").value;
  const DataNascimento = document.getElementById("inputDataNascimento").value;
  const Email = document.getElementById("inputEmail").value;
  const Senha = document.getElementById("inputPassword").value;
  const AceitarTermo = document.getElementById("inputCheckBoxAgree").checked;
  const Novidades = document.getElementById("inputCheckBoxNews").checked;

  // Recupera os usuários já cadastrados
  const usuarios = JSON.parse(localStorage.getItem("Usuarios")) || [];

  const regex = /(.)\1{1,}|012|123|234|345|456|567|678|789|890|098|987|876|765|654|543|432|321|210|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|zyx|yxw|xwv|wvu|vut|uts|tsr|srq|rqp|qpo|pon|onm|nml|mlk|lkj|kji|jih|ihg|hgf|gfe|fed|edc|dcb|cba|qwerty|asdf|zxcv|ytrewq|fdsa|vcxz/;
  
  const validarSenha = (senha) => {
    // Verificar se a senha contém padrões não aceitos
    if (regex.test(senha)) {
      return false;
    }
    return true;
  };

  if (validarSenha(Senha)) {
    // Adiciona o novo usuário {
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
    alert("Cadastro realizado com sucesso!");

    window.location.href = "/src/pages/login.html";
  } else {
    alert("Senha inválida. Contém padrões não aceitos.");
  }
});
