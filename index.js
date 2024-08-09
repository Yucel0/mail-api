import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();
const PORT = 3001;

config();
app.use(express.json());
app.use(cors());

function render(fullname, message, email) {
    return `<div>
        <p>Gönderici Maili: ${email}</p>
        <p>Gönderici Adı Soyadı: ${fullname}</p>
        <p>Gönderici Mesajı: ${message}</p>
    </div>`;
}

app.post('/api/send-mail',(req,res) => {
    const { fullname, email, subject, message } = req.body;

    const transport = nodemailer.createTransport({
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        port: 587,
        host: "smtp.gmail.com",
        service: "gmail"
    });

    transport.sendMail({
        from: process.env.EMAIL,
        to: 'yclylmzx@gmail.com',
        subject,
        html: render(fullname,message,email)
    },(err,info) => {
        if(err){
            return res.json({
                status: false,
                message: err.message
            })
        }else {
            return res.json({
               status: true,
               message: 'Mesajınız Gönderildi!' 
            })
        }
    });
});

app.listen(PORT,() => {
    console.log('sunucu çalışıyor!');
})