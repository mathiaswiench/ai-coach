"use client"

import { useState, useEffect } from 'react';
import Login from "../components/Login";
import FileUpload from "./fileupload/page";
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_USER_AUTHENTICATION)
    setIsAuthenticated(process.env.NEXT_PUBLIC_USER_AUTHENTICATION === "True");
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    router.push("/fileupload")
  }

  return (
    <>
      <Login />
    </>
  );
}