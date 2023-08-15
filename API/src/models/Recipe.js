const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
    sequelize.define('Recipe', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            image: {
                    type: DataTypes.STRING,
                    allowNull: false,
            },
            summary: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            healthScore: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    min: 0,
                    max: 100,
                }
            },
            steps: {
                type: DataTypes.JSON,
                allowNull: false,
            },
        });
    };
