const { DataTypes } = require("sequelize");
const sequelize = require("./db");
//Define the restaurant model
const Restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
});

// Restaurant.sync({ force: false })
//   .then(() => {
//     console.log("Tabel create r already exists");
//   })
//   .catch((error) => {
//     console.log("error creating tabel:", error);
//   });

module.exports = Restaurant;
