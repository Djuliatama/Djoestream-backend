'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    comment_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    video_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    content: DataTypes.TEXT,
    // created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comment',
    timestamps: false
  });
  return Comment;
};

