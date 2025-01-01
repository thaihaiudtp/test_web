import { NextResponse } from "next/server";
import Test from "@/model/test.model";
export async function GET() {
    try {
        const response = await Test.findAll();
        if(!response){
            return NextResponse.json(
                {
                    error: "No data found",
                },
                {
                    status: 404,
                }
            )
        }
        return NextResponse.json(
            {
                success: true,
                data: response,
            },
            {
                status: 200,
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