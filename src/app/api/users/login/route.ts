import {connectDB} from "@/dbConfig/dbConfig"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'
import {sendEmail} from "@/helper/mailer"
import jwt from 'jsonwebtoken'



connectDB()
    export async function GET(req: NextRequest) {
        try {
            const {email, password} = req.body
            if(!email || !password){
                return NextResponse.badRequest({message: "Please fill all the fields"})
            }
            const user = await User.findOne({email})
            if(!user){
                return NextResponse.badRequest({message: "User does not exist"})
            }
            const isvalidPassword = await bcryptjs.compare(password, user.password)
            if(!isvalidPassword){
                return NextResponse.badRequest({message: "Invalid credentials"})
            }

            const tokenData = {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            }
            
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: '1d'})

            const response = NextResponse.json{
                maggase: "Login successful",
                success : true,
            }

            response.cookie.set('token', token, {
                httpOnly: true
            })

            return response

        } catch (error) {
            console.error(error)
            return NextResponse.badRequest({message: "Server error"})
        }
    }

