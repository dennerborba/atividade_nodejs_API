const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

const usuarios = []
app.use(express.json())

app.post('/cadastro', (req, res) => {
  for(let i = 0; i < usuarios.length; i++){
    if(usuarios[i].email == req.body.email){
        res.status(406).send("Este usuário já foi cadastrado!");
        return
    }
  }

  let hash = bcrypt.hashSync(req.body.senha, 10)
  let obj = {
    id: usuarios.length + 1,
    nome: req.body.nome,
    email: req.body.email,
    senha: hash
  }
  usuarios.push(obj)
  res.status(201).send(obj)

})

app.post('/login', (req, res) => {
  let achou = false
  let token = ''
  for(let i = 0; i < usuarios.length; i++){
      if(usuarios[i].email == req.body.email){
         achou = bcrypt.compareSync(req.body.senha,usuarios[i].senha)  
         token = jwt.sign(
          {
              id:usuarios[i].id, 
              nome:usuarios[i].nome,
              email:usuarios[i].email,
          })  
         break    
      }
  }

  if(!achou){
      res.status(404).send("Usuário ou senha inválido")
      return
  }
  
  res.status(200).send(token)
})


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })