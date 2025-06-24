import { NextResponse,NextRequest } from 'next/server';
import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/sendEmail";


export async function POST(req: NextRequest ) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    // Basic validation
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
  
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    
    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Server error, please try again.' }, { status: 500 });
  }
}
