import {NextRequest,NextResponse} from "next/server";
import User from "@/models/userModel";
import {connectDB} from "@/dbConfig/dbConfig";
import {sendEmail} from "@/helpers/sendEmail";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user || user.isVerified) {
    return NextResponse.json({ message: "Invalid or already verified" }, { status: 400 });
  }

  await sendEmail({ email, emailType: "VERIFY", userId: user._id });
  return NextResponse.json({ message: "Verification email sent" }, { status: 200 });
}
