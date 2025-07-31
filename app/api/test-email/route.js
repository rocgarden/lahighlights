import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function GET() {
  try {
    const msg = {
      to: "rocgardenapps@gmail.com", // your test inbox
      from: "no-reply@norahbird.com", // must match your SendGrid verified domain
      subject: "✅ SendGrid Test from NorahBird.com",
      text: "This is a test email sent via SendGrid and your custom domain.",
      html: "<strong>This is a test email sent via <em>SendGrid</em> from your app.</strong>",
    };

    await sgMail.send(msg);

    return Response.json({ success: true, message: "Test email sent" });
  } catch (error) {
    console.error("❌ SendGrid error:", error);
    return Response.json({ error: "Failed to send test email" }, { status: 500 });
  }
}
