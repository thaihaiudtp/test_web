import { NextResponse } from "next/server";
import Test from "@/model/test.model";

export async function POST(req: Request) {
    const {name_test, class_test, diffcult_test} = await req.json();
    if(!name_test || !class_test || !diffcult_test){
        return NextResponse.json(
            {
                success: false,
                error: "Missing required fields",
            }, 
            {
                status: 401,
            }
        )
    }
    try {
        await Test.create({name_test, class_test, diffcult_test});
        return NextResponse.json(
            {
                success: true,
                message: "Test created successfully",
            },
            {
                status: 201,
            }
        )
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            {
                status: 500,
            }
        )
    }
}