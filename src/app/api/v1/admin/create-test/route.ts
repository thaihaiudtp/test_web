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
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json(
            {
                success: false,
                error: errorMessage,
            },
            {
                status: 500,
            }
        )
    }
}