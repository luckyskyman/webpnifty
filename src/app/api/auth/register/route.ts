import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // For development: Assign ADMIN role to a specific email
    // In production, this should be handled more securely (e.g., via an admin panel or a script)
    const userRole = email === 'admin@webpnifty.com' ? 'ADMIN' : 'USER';

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        email,
        name: email.split('@')[0],
        password: hashedPassword,
        role: userRole,
      },
    });

    return NextResponse.json({ message: 'User created successfully', userId: newUser.id }, { status: 201 });

  } catch (error) {
    console.error('REGISTRATION_ERROR', error);
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
