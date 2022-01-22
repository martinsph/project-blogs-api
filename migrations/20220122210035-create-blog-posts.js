'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.DATE
      },
      updated: {
        type: Sequelize.DATE
      },
      userId: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};