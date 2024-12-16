import {connectDB} from "@/dbConfig/dbConfig"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'
import {sendEmail} from "@/helper/mailer"
import jwt from 'jsonwebtoken'



connectDB()



export async function GET(req: NextRequest) {
    const response = NextResponse.json({
        message: "Logged out successfully",
        success: true,
    });

    response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie
    });

    return response;
}