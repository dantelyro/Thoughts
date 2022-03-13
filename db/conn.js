const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('gabriel', 'postgres', 'ef9f61827a9f6ed3d93e21a7673b29a1', {
  dialect: 'postgres',
  host: '189.126.105.68',
  port: '706',
})

try {
  sequelize.authenticate()
  console.log('conectado com sucesso')
} catch (err) {
  console.log(`Não foi possivel conectar: ${err}`)
}

module.exports = sequelize
