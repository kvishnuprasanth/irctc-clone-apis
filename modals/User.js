import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"), // Enum for role
    defaultValue: "user", // Default role is 'user'
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull:false,
    defaultValue: Date.now(),  
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.now(),  
  }

  
},{
    timestamps: true
});

export default users;
