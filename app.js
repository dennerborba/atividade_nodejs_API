const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const port = 3010

app.use(cors());
app.use(express.json())

const usuarios = []

app.post('/usuarios', (req, res) => {

    for(let i = 0; i < usuarios.length; i++){
        if(usuarios[i].email == req.body.email){
            res.status(406).send("Usuário já cadastrado");
            return
        }
    }
    let hash = bcrypt.hashSync(req.body.senha,10)
    let obj = {
        id: usuarios.length + 1,
        nome: req.body.nome,
        email: req.body.email,
        senha: hash,
    }
   usuarios.push(obj)
   res.status(201).send(obj)
})

app.post('/usuarios/login', (req, res) => {
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
            },'123')  
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