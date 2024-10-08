'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefreshToken.init({
    refreshToken: DataTypes.UUID,
    user_id: DataTypes.INTEGER,
    expired_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });
  return RefreshToken;
};