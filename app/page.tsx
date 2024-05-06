'use client'
import { useEffect } from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  
  return (
    <>
    <Header/>
    <Hero/>
    </>

  );
}
