import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { Card } from "react-bootstrap";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

import Loader from "@/components/Loader";

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(!isLoaded)
  }, [isLoaded])
  
  if(userId) router.push("/todos");
    return (
      isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
      <>
        <Head>
          <title>carpe diem - Welcome</title>
          <meta name="description" content="carpe diem. to-do" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/carpe-diem-logo.png" />
        </Head>
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Card className="p-5">
            <Card.Img
              variant="top"
              src="/carpe-diem-logo.png"
              className="mx-auto"
              style={{ width: "300px" }}
            />
            <SignIn redirectUrl="/todos" />
          </Card>
        </div>
      </> 
    ));

}
