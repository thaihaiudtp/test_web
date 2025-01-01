import { NextResponse } from "next/server";
import User from "@/model/user.model";

export async function POST(req: Request) {
    try {
        const {name, email, password} = await req.json();
        if(!name || !email || !password){
            return NextResponse.json(
                {success: false, message: "All field are required!"},
                {status: 400}
            );
        }
        const existEmail = await User.findOne({where: {email}});
        if(existEmail){
            return NextResponse.json(
                { success: false, message: "Email already exist!"},
                {status: 400}
            );
        }
        await User.create({name, email, password});
        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json(
          { 
            success: false,
            message: "An error occurred during registration." },
          { status: 500 }
        );
    }
}