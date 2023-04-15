import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

import Tag from '@/components/Tag'
import ToDoCard from '@/components/ToDoCard'
import StickyNote from "@/components/StickyNote";

import {randomColor} from "@/modules/util";



export default function Whiteboard({name, handleNewTodo, todos, complete, donePage}) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [isHighPriority, setIsHighPriority] = useState(true);
  const [username, setUsername] = useState(name);
  const [dueOn, setDueOn] = useState(new Date());
  const [tags, setTags] = useState([]);
  console.log(typeof(todos))
  const [newTag, setNewTag] = useState("");
  const [showNewTag, setShowNewTag] = useState(false);
  const router = useRouter();
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

  const handleHighPriorityClick = (e) => {
    e.preventDefault();
    setIsHighPriority(true);
  };

  const handleLowPriorityClick = (e) => {
    e.preventDefault();
    setIsHighPriority(false);
  };
  const [selectedOption, setSelectedOption] = useState("");

  async function handleOptionChange(option){
    setSelectedOption(option);
    await complete(option);
    setSelectedOption('')
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const newTodo = {
      title: task,
      description: description,
      dueOn: dueOn,
      tags: [isHighPriority ? "High Priority" : "Low Priority", ...tags]
    };
    handleNewTodo(newTodo).then((h) => {
      setTask("");
      setDescription("");
      setIsHighPriority(true);
      setTags([]);
    });
  };
  return (
    <>
      <div class="container-fluid todo-card-container">
        <StickyNote name={username}/>
        <div class="row">
          <div class={'col-xl-' + (!donePage ? '6' : '8')}>
            <div class="container-fluid">
              <div class="row">
                {todos.map(
                  (todo) => {
                    return (
                      <ToDoCard
                        todoid={todo._id}
                        title={todo.title}
                        description={todo.description}
                        handleOptionChange={handleOptionChange}
                        selectedOption={selectedOption}
                        tags={todo.tags}
                        dueOn={todo.dueOn}
                        donePage={donePage}
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className={'col-xl-' + (!donePage ? '6' : '4')}>
            <div class="container">
              <div class="row">
                {!donePage && (
                  <div class="col-md-7">
                  <div class="card todo-add">
                    <div class="card-body">
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Enter task..."
                          class="clear-input fs-1"
                          onChange={(e) => setTask(e.target.value)}
                        />
                        <textarea
                          type="text"
                          class="transparent-text-box fs-5"
                          placeholder="Task description..."
                          onChange={(e) => setDescription(e.target.value)}
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
                              name="dueOn"
                              onChange={(e) => setDueOn(e.target.value)}
                              required
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
                )}
                <div class={'col-md-' + (!donePage ? '5' : '9') + ' todo-buttons'}>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center pt-5"
                    style={{ height: "90vh" }}
                  >
                    <button className="btn btn-link p-0 fs-2 mt-5 p-5"></button>
                    <button className="btn btn-link p-0 fs-2 mt-5" onClick={() => router.push('/done')}>
                      <img src="/green-folder.png" alt="Done" />
                      <div className="button-text">Done</div>
                    </button>
                    <button className="btn btn-link p-0 fs-3" onClick={() => router.push('/todos')}>
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