import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Whiteboard from "@/components/Whiteboard";
import Loader from "@/components/Loader";

export default function TodoBase({
  donePage = false,
  category = null,
  postTodo = () => {},
  getAll,
  toggleTodoDoneness,
}) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();
  category = router.query.category;
  const [todos, setTodos] = useState([]);
  async function handleNewTodo(data) {
    setIsLoading(true);
    data.uid = userId;
    const token = await getToken({ template: "codehooks" });
    console.log(data);
    postTodo(data, token)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return getAllTodosWithUserNameEstablished();
      })
      .then((data) => {
        setTodos(data)
        setIsLoading(false);
      });
  }
  async function complete(todoid) {
    setIsLoading(true);
    const token = await getToken({ template: "codehooks" });
    toggleTodoDoneness(false, todoid, token)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return getAllTodosWithUserNameEstablished();
      })
      .then((data) => {
        setTodos(data)
        setIsLoading(false);
      });
  }
  const loadState = React.useCallback(async () => {
    async function process() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        return getAll(userId, category, token);
      }
      return [];
    }
    await process().then((result) => {
      if (result === "403") router.push("/403");
      else setTodos(result);
      setIsLoading(false);
    });
  }, [isLoaded, category, router.query, isLoading]);
  useEffect(() => {
    loadState();
  }, [loadState]);
  async function getAllTodosWithUserNameEstablished() {
    const token = await getToken({ template: "codehooks" });
    return getAll(userId, category, token);
  }
  if (!isLoaded) return <></>;
  else if (isLoaded && !userId) router.push("/");
  else {
    return (
      <>
        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
          <>
            <Head>
              <title>carpe diem</title>
              <meta name="description" content="carpe diem. to-do" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" href="/carpe-diem-logo.png" />
            </Head>
            <div className="container-fluid">
              <div className="whiteboard">
                <Whiteboard
                  name={user.firstName}
                  handleNewTodo={handleNewTodo}
                  todos={todos}
                  complete={complete}
                  reloadState={loadState}
                  donePage={donePage}
                  defaultTag={category ? [category] : []}
                  router={router}
                  setIsLoading={setIsLoading}
                />
              </div>
            </div>
          </>
      </>
    );
  }
}
