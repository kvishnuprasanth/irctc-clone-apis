import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import users from "./User.js";
import trains from "./trains.js";

const bookings = sequelize.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
        model: users,
        key: "id",
      },
  
  },
  train_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: trains,
        key: "id",
      },
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

export default bookings;
