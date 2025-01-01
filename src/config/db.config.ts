import { Sequelize } from "sequelize";
import * as mysql2 from 'mysql2';
const sequelize = new Sequelize('elearning', 'root', '0902', {
    host: 'localhost',
    dialect: 'mysql', 
    dialectModule: mysql2, // Đảm bảo sử dụng MySQL
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
