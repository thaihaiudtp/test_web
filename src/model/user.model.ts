import { DataTypes, Model } from "sequelize";
import sequelize from "@/config/db.config";
import bcrypt from "bcrypt";
class User extends Model {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    score!: number;
    status!: boolean;
    role!: number;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "user",
        timestamps: true,
        hooks: {
            beforeCreate: async(user: User) => {
                if (user.password) {
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                }
            },
            beforeUpdate: async(user: User) => {
                if (user.password) {
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                }
            }
        }
    }
);
export default User;

