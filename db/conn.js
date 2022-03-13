const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('database', 'username', 'senha', {
  dialect: 'postgres',
  host: 'ip',
  port: 'port'
})

try {
  sequelize.authenticate()
  console.log('conectado com sucesso')
} catch (err) {
  console.log(`Não foi possivel conectar: ${err}`)
}

module.exports = sequelize
