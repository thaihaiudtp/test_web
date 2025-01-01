import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function GenAccessToken(id: number, name: string, email: string, role: number) {
    const token = jwt.sign(
        {
            id: id,
            name: name,
            email: email,
            role: role
        },
        process.env.SECRET || "thaiha",
        {
            expiresIn: "4h",
        }
    );
    return token;
}