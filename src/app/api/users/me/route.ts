import {connectDB} from "@/dbConfig/dbConfig"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import {getDataFromToken} from "@/helper/getDataFromToken"




connectDB()

export async function GET(req: NextRequest) {
   const userId = await getDataFromToken(req)
   console.log(userId)
   const user = await User.findOne({_id: userId}).select('-password')
   if(!user){
       return NextResponse.json({message: "User does not exist"}, {status: 404})
   }
   return NextResponse.json({
       maggase: "User found",
       data: user,
   })
}