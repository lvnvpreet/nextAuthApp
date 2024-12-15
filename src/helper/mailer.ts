import nodemailer from "nodemailer"
import bcryptjs from 'bcryptjs'
import User from "@/models/user.model"

export const sendEmail = async( {email, emailType, userId}) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }


        // Looking to send emails in production? Check out our Email API/SMTP product!
       const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "635e4f6c3a4b74",
              pass: "41858de3a1f645"
            }
  });

          const mailOptions = {
            from: 'love@preet.com',
            to: email, 
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser: <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>
            <br>
            <p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser: <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken} </p>
            `,
          }

          const mailResponse = await transporter.sendMail(mailOptions)

          return mailResponse
    } catch (error) {
        throw new Error(error.message)
    }
}