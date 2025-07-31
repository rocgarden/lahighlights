import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  const body = await req.json();

  const { name, email, message, honeypot } = body;
  if (honeypot) {
  return new Response("Bot detected", { status: 400 });
  }

  // ✅ Server-side validations
  if (!name || !email || !message) {
    return new Response("Missing fields", { status: 400 });
  }

    // ✅ Email format validation
  if (!emailRegex.test(email)) {
    return new Response("Invalid email format", { status: 400 });
  }
  
  if (message.length < 10 || message.length > 1000) {
    return new Response("Invalid message length", { status: 400 });
  }


  const msg = {
    to: "rocgardenapps@gmail.com", // your personal/business email
    from: "no-reply@norahbird.com", // must match verified sender/domain in SendGrid
    subject: `New Contact Form Submission from ${name}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong><br/>${message}</p>`,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
