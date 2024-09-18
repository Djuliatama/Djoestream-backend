'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video.init({
    video_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    video_url: DataTypes.STRING,
    description: DataTypes.TEXT,
    filepath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Video',
    tableName: 'Video',
    timestamps: false
  });
  return Video;
};