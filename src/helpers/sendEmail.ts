import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import crypto from 'crypto';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Generate a raw and hashed token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex")

    // Save hashed token to DB
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Mailtrap setup
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    const route = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    const link = `${process.env.DOMAIN}/${route}?token=${rawToken}&id=${userId}`;


    const mailOptions = {
      from: 'no-reply@mysite.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click <a href="${link}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
        <p>Or copy and paste this URL into your browser: <br>${link}</p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
