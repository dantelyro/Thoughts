const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login')
  }

  static async loginPost(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email: email } })

    //verificar usuario
    if (!user) {
      req.flash('message', 'Usuario não encontrado')
      res.render('auth/login')

      return
    }

    //verificar senha
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
      req.flash('message', 'Senha inválida')
      res.render('auth/login')

      return
    }

    //inicializar usuario
    req.session.userid = user.id

    req.flash('message', 'Autenticação realizada com sucesso!')

    req.session.save(() => {
      res.redirect('/')
    })
  }

  static register(req, res) {
    res.render('auth/register')
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body

    //verificar se a senha é igual a confirmação de senha
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente')
      res.render('auth/register')

      return
    }

    //verificar se o usuario existe
    const checkIfUserExists = await User.findOne({ where: { email: email } })

    if (checkIfUserExists) {
      req.flash('message', 'Este email ja esta em uso, tente novamente')
      res.render('auth/register')

      return
    }

    //criar senha cryptografada
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = {
      name,
      email,
      password: hashedPassword,
    }

    try {
      const createdUser = await User.create(user)

      //inicializar usuario
      req.session.userid = createdUser.id

      req.flash('message', 'Cadastro realizado com sucesso!')

      req.session.save(() => {
        res.redirect('/')
      })
    } catch (err) {
      console.log(err)
    }
  }

  static logout(req, res) {
    req.session.destroy()
    res.redirect('/login')
  }
}
