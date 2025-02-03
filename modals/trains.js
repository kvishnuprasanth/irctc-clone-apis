import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const trains = sequelize.define("trains", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  train_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_time:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seats:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:0,
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

export default trains;
