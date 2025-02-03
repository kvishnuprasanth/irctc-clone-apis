import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.PG_DATABASE,process.env.PG_USER,process.env.PG_PASSWORD,{
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default sequelize;
