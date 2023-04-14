import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Badge, Button, InputGroup, FormControl } from "react-bootstrap";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import "font-awesome/css/font-awesome.min.css";

const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function Whiteboard(props) {
  const [isHighPriority, setIsHighPriority] = useState(true);
  const [username, setUsername] = useState(props.name);
  const [tags, setTags] = useState([
    "csci5117",
    "grad-ta",
    "badminton",
    "motorcycle",
  ]);
  console.log(backend_base);
  const [newTag, setNewTag] = useState("");
  const [showNewTag, setShowNewTag] = useState(false);

  const handleUpdateTags = (tagsToAdd) => {
    setTags([...tags, tagsToAdd]);
    setShowNewTag(false);
    setNewTag(null);
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
  const randomColor = () => {
    const colors = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleHighPriorityClick = (e) => {
    e.preventDefault();
    setIsHighPriority(true);
  };

  const handleLowPriorityClick = (e) => {
    e.preventDefault();
    setIsHighPriority(false);
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <div class="container-fluid todo-card-container">
        <div class="sticky-note-container text-center">
          <div class="sticky-note-text">
            <h2>
              {username}'s Board{" "}
              <div className="user-button">
                <UserButton />
              </div>
            </h2>
          </div>
          <img src="/sticky-note.png" alt="Sticky Note" />
        </div>
        <div class="row">
          <div class="col-xl-6">
            <div class="container-fluid">
              <div class="row">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                  (val) => {
                    return (
                      <ToDoCard
                        todoid={val}
                        handleOptionChange={handleOptionChange}
                        selectedOption={selectedOption}
                        tags={tags}
                        randomColor={randomColor}
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div class="container">
              <div class="row">
                <div class="col-md-7">
                  <div class="card todo-add">
                    <div class="card-body">
                      <form>
                        <input
                          type="text"
                          placeholder="Enter task..."
                          class="clear-input fs-1"
                        />
                        <textarea
                          type="text"
                          class="transparent-text-box fs-5"
                          placeholder="Task description..."
                        ></textarea>
                        <div className="todo-add-categories">
                          <h5>Importance</h5>
                          <div
                            className="d-flex"
                            style={{ marginBottom: "2rem" }}
                          >
                            <button
                              className={`btn btn-pill priority-btn high-priority ${
                                isHighPriority ? "active" : ""
                              }`}
                              style={{
                                backgroundColor: "#FF9B9B",
                                color: "#670F0F",
                                border: "none",
                              }}
                              onClick={handleHighPriorityClick}
                            >
                              High Priority
                            </button>
                            <button
                              className={`btn btn-pill priority-btn low-priority ${
                                !isHighPriority ? "active" : ""
                              }`}
                              style={{
                                backgroundColor: "#B9BBBE",
                                color: "#302E2E",
                                border: "none",
                              }}
                              onClick={handleLowPriorityClick}
                            >
                              Low Priority
                            </button>
                          </div>
                          <h5>Tags</h5>
                          <div
                            className="d-flex flex-wrap align-items-center"
                            style={{ marginBottom: "2rem" }}
                          >
                            {tags.map((tag, index) => (
                              <Tag
                                key={index}
                                color={randomColor()}
                                tag={tag}
                                onTagEdit={(updatedTag) =>
                                  handleTagEdit(index, updatedTag)
                                }
                                onTagDelete={() => handleTagDelete(index)}
                                editable
                              />
                            ))}
                            <div className="m-1">
                              {showNewTag && (
                                <Tag
                                  color={randomColor()}
                                  tag={newTag}
                                  onTagEdit={(updatedTag) =>
                                    handleUpdateTags(updatedTag)
                                  }
                                  onTagDelete={() => handleDeletNewTag()}
                                  editable
                                  active
                                />
                              )}
                              <Button
                                variant="outline-dark"
                                className="rounded-circle"
                                onClick={() => handleNewTag()}
                              >
                                <span className="fa fa-plus" />
                              </Button>
                            </div>
                          </div>
                          <h5>Date</h5>
                          <div class="datepicker-container">
                            <input
                              type="date"
                              class="datepicker fs-5"
                              placeholder="Select a date"
                              readonly
                            />
                            {/* <img src="/calendar.png" class="calendar-icon"/> */}
                          </div>
                          <div className="submit-form-section">
                            <button
                              className="btn btn-primary fs-4"
                              style={{ background: "#092C50" }}
                            >
                              Create
                            </button>
                            <img src="/clip.png"></img>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-md-5 todo-buttons">
                  <div
                    className="d-flex flex-column justify-content-center align-items-center pt-5"
                    style={{ height: "90vh" }}
                  >
                    <button className="btn btn-link p-0 fs-2 mt-5 p-5"></button>
                    <button className="btn btn-link p-0 fs-2 mt-5">
                      <img src="/green-folder.png" alt="Done" />
                      <div className="button-text">Done</div>
                    </button>
                    <button className="btn btn-link p-0 fs-3">
                      <img src="/red-folder.png" alt="To-Do" />
                      <div className="button-text">To-Do</div>
                    </button>
                    <button className="btn btn-link p-0 fs-2">
                      <img src="/filter.png" alt="Filter" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Tag = ({ color, tag, onTagEdit, onTagDelete, editable, active }) => {
  const [editing, setEditing] = useState(active);
  const [tagText, setTagText] = useState(tag);

  const handleEdit = () => {
    if (tagText != null) {
      console.log(tagText);
      if (editing) {
        onTagEdit(tagText);
      }
      setEditing(!editing);
    }
  };
  return (
    <div
      className={`btn btn-${color} m-1 ${editable ? "flex-grow-1" : ""}`}
      style={{ borderRadius: "20px" }}
    >
      {editing ? (
        <>
          <input
            type="text"
            className="form-control form-control-sm"
            value={tagText}
            onChange={(event) => setTagText(event.target.value)}
            autoFocus
          />
          <span className="fa fa-check ml-1" onClick={handleEdit} />
        </>
      ) : (
        <>
          <span className="mr-1">{tag}</span>
          {editable && (
            <>
              <span
                className="fa fa-pencil mr-1"
                onClick={() => setEditing(true)}
              />
              <span className="fa fa-times" onClick={onTagDelete} />
            </>
          )}
        </>
      )}
    </div>
  );
};

function ToDoCard(props) {
  return (
    <div class="col-md-6">
      <div class="card todo-card">
        <img src={"/clip.png"} className="todo-card-clip" />
        <div class="card-body">
          <div  className="todo-card-calendar text-center d-flex justify-content-center">
            <img src="/calendar.png" alt="calendar icon" />
            <span className="todo-card-date">Aug<br></br>21</span>
          </div>
          <h1 class="card-title">
            {" "}
            <button
              className={`radio-button ${
                props.selectedOption === "Card " + props.todoid ? "active" : ""
              }`}
              onClick={() => props.handleOptionChange("Card " + props.todoid)}
            >
              <span className="radio-circle"></span>
            </button>
            Card {props.todoid}
          </h1>
          <p class="card-text">This is some text for Card {props.todoid}.</p>
          <div
            className="d-flex flex-wrap align-items-center"
            style={{ marginBottom: "2rem" }}
          >
            {props.tags.map((tag, index) => (
              <Tag
                key={index}
                color={props.randomColor()}
                tag={tag}
                onTagEdit={(updatedTag) => handleTagEdit(index, updatedTag)}
                onTagDelete={() => handleTagDelete(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Todo() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    async function process() {
      if (userId) { 
        const token = await getToken({ template: "codehooks" });
        console.log(token)
        const result = await fetch(backend_base+"/test",{
          'method':'GET',
          'headers': {'Authorization': 'Bearer ' + token} // use the token.
        })
        console.log(result)
      }
    }
    process();
  }, [isLoaded]); 
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
            <Whiteboard name={user.firstName} />
          </div>
        </div>
      </>
    );
  }
}
