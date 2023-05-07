import Sequelize from 'sequelize';

import users from './models/users/user';
import industry from './models/industry/industry';

import config from './dbConfig';

const {
  host,
  port,
  database,
  username,
  password,
  dialect,
  sequelizeLogsEnabled,
} = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  operatorsAliases: false,
  timezone: '+05:30',
  // FIXME:
  dialectOptions: {
    // for reading data from db and appyling the correct time zone
    typeCast(field, next) {
      if (
        field.type === 'DATETIME' ||
        field.type === 'TIMESTAMP' ||
        field.type === 'DATE' ||
        field.type === 'TIME'
      ) {
        return new Date(`${field.string()}Z`);
      }
      return next();
    },
    connectTimeout: 240000,
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    multipleStatements: true,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 30,
    min: 0,
    idle: 10000,
    acquire: 240000,
  },
  logging: sequelizeLogsEnabled, // disable sequelize query logging
});

const db = {
  sequelize,
  Sequelize,
};

// #region USERS

db.Users = sequelize.import('users', users);
db.Industry = sequelize.import('industry', industry);


// #end user activity audit

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
