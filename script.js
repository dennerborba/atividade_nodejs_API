document.getElementById('formCadastro').addEventListener('submit', function (event) {
  event.preventDefault();

  const cadastroForm = {
   nome : document.getElementById('inputNome').value,
   email : document.getElementById('inputEmail').value,
   senha : document.getElementById('inputSenha').value,
   confirmSenha : document.getElementById('inputConfirm').value
  }

  if (cadastroForm.senha !== cadastroForm.confirmSenha) {
    alert('As senhas não são iguais!')
    return
  }

  fetch('http://localhost:3010/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cadastroForm)
      })
      .then(response => {
        if (response.ok) {
          alert('Usuário cadastrado com sucesso!')
        } else {
          throw new Error('Usuário já foi cadastrado!')
        }
      })
      .catch(error => {
        alert(error.message);
      });
    });

document.getElementById('formLogin').addEventListener('submit', 
function (event) {
  event.preventDefault();

  const loginForm = {   
  email : document.getElementById('loginEmail').value,
  senha : document.getElementById('loginSenha').value
  }

fetch('http://localhost:3010/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginForm),
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Usuário ou senha inválidos.')
    }
  })
  .then(token => {
    localStorage.setItem('token', token)
    alert('Login bem-sucedido!');
  })
  .catch(error => {
    alert(error.message);
  })
})