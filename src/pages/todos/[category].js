import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Whiteboard from '@/components/Whiteboard'

import { postTodo, getAllTodosBasedOnATag, toggleTodoDoneness, test} from '@/modules/data'

export default function TodoCatergory() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { category } = router.query;
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
        return getAllTodosBasedOnATag(userId, category, token)
      }
      return [];
    }
    process().then((result) => {
      if(result === '403') router.push('/403');
      else setTodos(result);
    });
  }, [isLoaded]); 
  async function getAllTodosWithUserNameEstablished(){
    const token = await getToken({ template: "codehooks" });
    return getAllTodosBasedOnATag(userId, category, token)
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
            <Whiteboard name={user.firstName} handleNewTodo={handleNewTodo} todos={todos} complete={complete} defaultTag={[category]}/>
          </div>
        </div>
      </>
    );
  }
}
