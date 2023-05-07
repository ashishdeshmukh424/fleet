import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // select: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      // schema: 'client-plateform1',
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
      // If don't want deletedAt
      deletedAt: false,
      paranoid: false,
      hooks: {},
    },
    
  );

  Users.associate = (models) => {
    Users.belongsTo(models.Industry, {
      foreignKey: 'industryId',
    });
  };

  Users.getAll = async (includePassword) => {
    if (includePassword) return Users.findAll({});

    return Users.findAll({
      attributes: { exclude: ['password'] },
    });
  };

  Users.createNew = async (input, transaction) => {
    console.log('🚀 ^~^ - Users.createNew= - input:', input);
    return Users.create({ ...input }, {
      transaction,
    });
  };

  Users.getAllByPaginated = async (identifiers, queryParams) => {
    console.log('🚀 ^~^ - Users.getAllByPaginated= - identifiers:', identifiers, queryParams);
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return Users.findAll(sqlQuery);
  };

  Users.getOne = async (identifiers) => {
    return Users.findOne({
      where: identifiers,
      // attributes: { exclude: ['password'] },
    });
  };

  Users.doesExistUniqueCode = async (identifiers) => {
    const oneExists = await Users.findOne({
      where: { [Sequelize.Op.or]: identifiers, isDeleted: false },
    });
    if (oneExists != null && identifiers.code === oneExists.code) return true;
    else return false;
  };


  return Users;
};
