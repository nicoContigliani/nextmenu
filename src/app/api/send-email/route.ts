import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

import dotenv from "dotenv";
dotenv.config();


export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    const NEXT_PUBLIC_GMAIL_USER:string = process.env.NEXT_PUBLIC_EMAIL_USER || "";
    const NEXT_PUBLIC_GMAIL_PASS:string = process.env.NEXT_PUBLIC_EMAIL_PASS || "";
    const NEXT_PUBLIC_RECIPIENT_EMAIL:string = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || "";

    if (!NEXT_PUBLIC_GMAIL_USER || !NEXT_PUBLIC_GMAIL_PASS) {
      console.error("Gmail credentials are not set in environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NEXT_PUBLIC_GMAIL_USER,
        pass: NEXT_PUBLIC_GMAIL_PASS,
      },
    })

    const mailOptions = {
      from: NEXT_PUBLIC_GMAIL_USER,
      to: NEXT_PUBLIC_RECIPIENT_EMAIL || NEXT_PUBLIC_GMAIL_USER,
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Correo electrónico enviado correctamente" }, { status: 200 })
  } catch (error) {
    console.error("Error in POST /api/send-email:", error)
    return NextResponse.json({ error: "Error al enviar el correo electrónico" }, { status: 500 })
  }
}

