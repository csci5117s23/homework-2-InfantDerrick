import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Link from 'next/link'
import { SignIn } from "@clerk/nextjs";
import { Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '@clerk/nextjs';
import {useRouter} from 'next/router'

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter()
  
  if (!isLoaded || !userId) {
    return (
      <>
        <Head>
          <title>carpe diem - Welcome</title>
          <meta name="description" content="carpe diem. to-do" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/carpe-diem-logo.png" />
        </Head>
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card className="p-5">
          <Card.Img variant="top" src="/carpe-diem-logo.png" className="mx-auto" style={{ width: '300px' }} />
          <SignIn redirectUrl="/todos"/>
        </Card>
      </div>
        </>
      )
  }else{
    router.push('/todos');
  }
  
}
