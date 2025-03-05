import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db/client";


interface RegisterUserRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: "USER" | "INSPECTOR" | "ADMIN";
}

// Register User
export const registerUser = async (req: any, res: any) => {
  try {
    const { name, email, phone, password, role }: RegisterUserRequest = req.body;
    console.log("req.body", req.body);
    
    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        phone,
        password: password,
        role: role || "USER",
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    };
    res.status(201).cookie("accessToken", token,options)
    .json({
      message: "User registered successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      token,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

export const signInUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await prismaClient.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    // const passwordMatch = await bcrypt.compare(password, existingUser.password);

    // if (!passwordMatch) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email, role: existingUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    };
    res.status(201).cookie("accessToken", token,options)
    .json({
      message: "User signed in successfully",
      user: { id: existingUser.id, name: existingUser.name, email: existingUser.email, role: existingUser.role },
      token,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
}
