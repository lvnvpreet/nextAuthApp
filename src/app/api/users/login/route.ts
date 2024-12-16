import {connectDB} from "@/dbConfig/dbConfig"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'
import {sendEmail} from "@/helper/mailer"
import jwt from 'jsonwebtoken'



connectDB()
    export async function POST(req: NextRequest) {
        try {
            const reqBody = await req.json()
            const {email, password} = reqBody
            //console.log(email, password)
            if(!email || !password){
                return NextResponse.json({error:"Please fill all the fields"},{status: 400})
            }
            const user = await User.findOne({email})
            if(!user){
                return NextResponse.json({message: "User does not exist"},{status: 400})
            }
            const isvalidPassword = await bcryptjs.compare(password, user.password)
            if(!isvalidPassword){
                return NextResponse.json({message: "Invalid credentials"},{status: 400})
            }

            const tokenData = {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            }
            
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: '1d'})

            const response = NextResponse.json({
                message: "Login successful",
                success: true,
            })

            response.cookies.set('token', token, {
                httpOnly: true
            })

            return response

        } catch (error) {
            console.error(error)
            return NextResponse.json({message: "Server error"}, {status: 500})
        }
    }

