import { DataTypes, Model } from "sequelize";
import sequelize from "@/config/db.config";

class Test extends Model {
    id!: number;
    name_test!: string;
    class_test!: number;
    diffcult_test!: string;
    status!: number;
}

Test.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_test: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        class_test: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        diffcult_test: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    }, {
        sequelize,
        modelName: "Test",
        tableName: "test",
        timestamps: true,
    }
);
export default Test;