import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { Card, Form, Button } from "react-bootstrap";
import BigToDoCard from "@/components/BigToDoCard";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { getTodo, updateTodo } from "@/modules/data";
import { randomColor } from "@/modules/util";
import StickyNote from "@/components/StickyNote";
import Loader from "@/components/Loader";

export default function TodoId() {
  const { isLoaded, userId, getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const [initData, setInitData] = useState(null);
  const [todoid, setTodoId] = useState(id);
  const [title, setTitle] = useState("Meow");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor."
  );
  const [tags, setTags] = useState([]);
  const [dueOn, setDueOn] = useState(new Date().toISOString().slice(0, 10));
  const [done, setDone] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [createdOn, setCreatedOn] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [showNewTag, setShowNewTag] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function process() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        return getTodo(id, token);
      }
      return [];
    }
    process().then((result) => {
      if (userId && result.length == 0) router.push("/404");
      else if (userId) {
        result = result[0];
        setInitData(result);
        setTodoId(result._id);
        setTitle(result.title);
        setDescription(result.description);
        setTags(result.tags);
        setDueOn(new Date(result.dueOn).toISOString().slice(0, 10));
        setDone(result.done);
        setCreatedOn(result.createdOn);
        console.log(result);
      }
      setIsLoading(false);
    });
  }, [isLoaded]);
  const handleUpdateTags = (tagsToAdd) => {
    if (!tags.includes(tagsToAdd)) {
      setTags([...tags, tagsToAdd]);
      setShowNewTag(false);
      setNewTag(null);
      return true;
    }
    return false;
  };

  const handleNewTag = () => {
    setShowNewTag(true);
    setNewTag(null);
  };
  const handleDeletNewTag = () => {
    setShowNewTag(false);
    setNewTag(null);
  };

  const handleTagEdit = (index, updatedTag) => {
    const newTags = [...tags];
    newTags[index] = updatedTag;
    setTags(newTags);
  };

  const handleTagDelete = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  async function handleUpdate() {
    setIsLoading(true);
    let newObj = {
      _id: todoid,
      uid: userId,
      title: title,
      description: description,
      done: done,
      tags: tags,
      createdOn: createdOn,
      dueOn: dueOn,
    };
    const token = await getToken({ template: "codehooks" });
    updateTodo(newObj, todoid, token)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        router.push("/todos");
      });
    setIsLoading(false);
  }
  const handleRedirect = () => {
    router.push("/todos");
  };
  if (!isLoaded) return <></>;
  if (!userId) router.push("/");
  return isLoading ? (
    <div className="loader-container">
      <Loader />
    </div>
  ) : (
    <>
      <Head>
        <title>carpe diem - Task</title>
        <meta name="description" content="carpe diem. to-do" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/carpe-diem-logo.png" />
      </Head>
      <div
        class="container-fluid todo-card-container"
        style={{ height: "90vh" }}
      >
        <StickyNote name={user.firstName} />
        <BigToDoCard
          todoid={todoid}
          title={title}
          description={description}
          tags={tags}
          dueOn={dueOn}
          randomColor={randomColor}
          done={done}
          setTitle={setTitle}
          setDescription={setDescription}
          setTags={setTags}
          setDueOn={setDueOn}
          setDone={setDone}
          handleTagEdit={handleTagEdit}
          handleTagDelete={handleTagDelete}
          handleDeletNewTag={handleDeletNewTag}
          handleUpdateTags={handleUpdateTags}
          handleNewTag={handleNewTag}
          showNewTag={showNewTag}
          newTag={newTag}
          handleUpdate={handleUpdate}
          handleRedirect={handleRedirect}
        />
      </div>
    </>
  );
}
