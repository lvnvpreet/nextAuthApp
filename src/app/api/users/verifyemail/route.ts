import {connectDB} from "@/dbConfig/dbConfig"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

import {sendEmail} from "@/helper/mailer"   // Import the sendEmail function from the mailer.ts file for validation massage to user successfully registered..


connectDB()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        if (!reqBody) {
            return NextResponse.json({error:"Please provide the required information"},{status: 400})
        }
        const {token} = reqBody
        console.log(reqBody)

    const user = User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

    if (!user) {
        return NextResponse.json({error:"Invalid or expired token"},{status: 400})
    }

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    
    await user.save()

    return NextResponse.json({
        message: "Email verified successfully",
        success: true
    }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

