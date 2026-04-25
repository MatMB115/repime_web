import NextAuth from "next-auth";
import { authOptions } from "@/app/libs/authOptions";

export default NextAuth(authOptions);
