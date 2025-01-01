import { Sequelize } from "sequelize";
import * as mysql2 from 'mysql2';
const sequelize = new Sequelize('sql5755150', 'sql5755150', 'aYPca1iwdk', {
    host: 'sql5.freesqldatabase.com',
    dialect: 'mysql', 
    dialectModule: mysql2, 
});

export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();
export default sequelize;
