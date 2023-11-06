const { asyncHandler, nodemailer } = require("../constant/library")

const sendEmail = asyncHandler(async(data,req,res)=>{
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.user,
            pass:process.env.pass
        }
    })

    let info = await transporter.sendMail({
        from: '"Hey"<abc@mail.com>',
        to:data.to,
        subject:data.subject,
        text:data.text,
        html:data.htm
    })

    console.log("Message sent :%s",info)
})

module.exports = sendEmail