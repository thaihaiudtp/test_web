import { NextResponse } from "next/server";
import User from "@/model/user.model";
import GenAccessToken from "@/util/jwt";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
    const {email, password} = await req.json();
    if(!email || !password){
        return NextResponse.json(
            {success: false, message: 'Fields are required!'},
            {status: 401}
        )
    }
    
    const existEmail = await User.findOne({where: {email}});
    if(existEmail === null){
        return NextResponse.json(
            {success: false, message: 'Email not found'},
            {status: 401}
        )
    } else {
        try {
            const matchPassword = await bcrypt.compare(password, existEmail.password);
            if(!matchPassword){
                return NextResponse.json(
                    {
                        success: false,
                        message: 'Password is incorrect',
                    },
                    {
                        status: 401
                    }
                )
            }
            const token = GenAccessToken(existEmail.id, existEmail.name, existEmail.email, existEmail.role);
            console.log(token);
            return NextResponse.json(
                {
                    success: true,
                    message: 'Login successful',
                    token: token
                },
                {
                    status: 200
                }
            )
        } catch (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: error,
                },
                {
                    status: 500
                }
            )
        }
    }


}