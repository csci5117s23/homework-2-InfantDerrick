import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Whiteboard from '@/components/Whiteboard'

import {getTodo, postTodo, getAllTodos, getAllDoneTodos, toggleTodoDoneness} from '@/modules/data'

const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function Todo() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [ todos, setTodos ]= useState([]);
  async function handleNewTodo(data){
    data.uid = userId;
    const token = await getToken({ template: "codehooks" });
    console.log(data);
    postTodo(data, token).then((res) => { return res.json()}).then((data) => {return getAllTodosWithUserNameEstablished()}).then((data) => setTodos(data));
  }
  async function complete(todoid){
    const token = await getToken({ template: "codehooks" });
    toggleTodoDoneness(false, todoid, token).then((res) => {return res.json()}).then((data) => { console.log(data); return getAllTodosWithUserNameEstablished()}).then((data) => setTodos(data))
  }
  useEffect(() => {
    async function process() {
      if (userId) { 
        const token = await getToken({ template: "codehooks" });
        return getAllTodos(userId, token)
      }
      return [];
    }
    process().then((result) => {
      setTodos(result);
    });
  }, [isLoaded]); 
  async function getAllTodosWithUserNameEstablished(){
    const token = await getToken({ template: "codehooks" });
    return getAllTodos(userId, token)
  }
  if (!isLoaded) return <></>;
  else if (isLoaded && !userId) router.push("/");
  else{
   
    return (
      <>
        <Head>
          <title>carpe diem</title>
          <meta name="description" content="carpe diem. to-do" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/carpe-diem-logo.png" />
        </Head>
        <div className="container-fluid">
          <div className="whiteboard">
            <Whiteboard name={user.firstName} handleNewTodo={handleNewTodo} todos={todos} complete={complete}/>
          </div>
        </div>
      </>
    );
  }
}
