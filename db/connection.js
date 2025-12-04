const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const fs = require('fs');    
const path = require('path'); 

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER.replace('@', '.'),
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 4000,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.join(__dirname, '../certs/ca.pem')),
        require: true,
      },
    },
  }
);

module.exports = sequelize;
