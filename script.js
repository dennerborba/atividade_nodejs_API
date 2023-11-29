document.getElementById('formCadastro').addEventListener('submit', async function (event) {
  event.preventDefault();

  const nome = document.getElementById('inputNome').value
  const email = document.getElementById('inputEmail').value
  const senha = document.getElementById('inputSenha').value
  const confirmSenha = document.getElementById('inputConfirm').value

  if (senha !== confirmSenha) {
    alert('As senhas não são iguais!')
    return
  }
  try{
  const response = await fetch('http://localhost:3000/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, email, senha }),
  })

  const data = await response.json()
  console.log(data)
  } catch (error){
    console.error('Erro:', error)
  }
})

document.getElementById('formLogin').addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = document.getElementById('inputEmail').value;
  const senha = document.getElementById('inputSenha').value;

try{
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();
  console.log(data)

  localStorage.setItem('token', data.token);
} catch (error){
  console.error('Erro:', error)
}
});