import {NextRequest} from "next/server"
import jwt from 'jsonwebtoken'

export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get('token')?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(decodedToken.user.id)
    return decodedToken.user.id;
  } catch (error:any) {
    throw new Error(error.message);
    
  }
}