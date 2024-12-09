 
import { Account, User as NextAuthUser } from "next-auth";

interface AuthUser extends NextAuthUser {
  role?: string;
  additionalData?: any; // Add the additionalData property
}
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";

export const authOptions = {
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any) {
          try {
            const user = await prisma.user.findFirst({
              where: {
                email: credentials.email,
              },
              // select: {
              //   id: true,
              //   email: true,
              //   role: true,
              //   name:true,
              //   // additionalData: true, // Fetch additional fields as needed
              //   // Include other fields you want to retrieve
              // },
            });
  
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password!
              );
              if (isPasswordCorrect) {
                // Exclude password from the returned user object
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword; // Return all user details except password
              }
            }
            // If user not found or password incorrect
            return null;
          } catch (err: any) {
            throw new Error(err.message || "Authentication failed");
          }
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }: { token: any; user?: AuthUser }) {
        // Initial sign in
        if (user) {
          token.id = user.id; // Save user ID
          token.role = user.role; // Save user role
          token.name = user.name; // Save user name
          token.email = user.email; // Save user email
          // Add any additional user fields here
          token.additionalData = user.additionalData ; // Replace with actual fields if needed
        }
        return token;
      },
      async session({ session, token }: { session: any; token: any }) {
        if (token && session.user) {
          session.user.id = token.id as string; // Include user ID
          session.user.role = token.role as string; // Include user role
          session.user.name = token.name as string; // Include user name
          session.user.email = token.email as string; // Include user email
          // Include any additional fields here
          session.user.additionalData = token.additionalData; // Make sure this matches the expected type
        }
        return session;
      },
      async signIn({ user, account }: { user: AuthUser; account: Account | null }) {
        if (account?.provider === "credentials") {
          return true;
        }
        return true; // Handle other providers if needed
      },
    },
  };