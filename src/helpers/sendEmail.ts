import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import crypto from 'crypto';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

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

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
      },
    });

    const route = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    const link = `${process.env.DOMAIN}/${route}?token=${rawToken}&id=${userId}`;

    const mailOptions = {
      from: `"Sayan from MySite" <strider0003@gmail.com>`,
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <div style="font-family:sans-serif;">
          <h2>Welcome to MySite!</h2>
          <p>Please click the link below to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
          }:</p>
          <a href="${link}" style="display:inline-block;margin:10px 0;padding:10px 20px;background:#2563eb;color:white;text-decoration:none;border-radius:5px;">
            ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
          </a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p>${link}</p>
        </div>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    console.error("Email sending error:", error.message);
    throw new Error(error.message);
  }
};
