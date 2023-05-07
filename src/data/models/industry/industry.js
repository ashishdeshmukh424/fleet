import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const Industry = sequelize.define(
    'Industry',
    {
      // uuid: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      //   unique: true,
      //   defaultValue: Sequelize.UUIDV4,
      // },
      industryName: {
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

  // Industry.associate = (models) => {
  //   Industry.belongsTo(models.Industry, {
  //     foreignKey: 'industryId',
  //   });
  // };

  Industry.getAll = async (includePassword) => {
    // if (includePassword) return Industry.findAll({});

    return Industry.findAll({
      // attributes: { exclude: ['password'] },
    });
  };

  Industry.createNew = async (input, transaction) => {
    console.log('🚀 ^~^ - Industry.createNew= - input:', input);
    return Industry.create({ ...input }, {
      transaction,
    });
  };

  Industry.getAllByPaginated = async (identifiers, queryParams) => {
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return Industry.findAll(sqlQuery);
  };

  Industry.getOne = async (identifiers) => {
    return Industry.findOne({
      where: identifiers,
      // attributes: { exclude: ['password'] },
    });
  };


  return Industry;
};
