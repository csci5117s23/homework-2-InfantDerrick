import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import Tag from '@/components/Tag'
import ToDoCard from '@/components/ToDoCard'
import StickyNote from "@/components/StickyNote";
import TagFilterModal from "@/components/TagFilterModal";

import {randomColor} from "@/modules/util";



export default function Whiteboard({name, handleNewTodo, todos, complete, donePage, defaultTag=[], router, reloadState}) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  console.log(todos);
  const [username, setUsername] = useState(name);
  const [defaultTags, setDefaultTags] = useState(defaultTag)
  const [dueOn, setDueOn] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [isHighPriority, setIsHighPriority] = useState(true);
  // if(defaultTags[0] == 'High Priority' || defaultTags[0] == 'Low Priority'){
  //   setTags([]);
  //   setIsHighPriority(defaultTags[0] == 'High Priority');
  // }
  useEffect(() => {
    setDefaultTags(defaultTag);
    setTags((defaultTag[0] == 'High Priority' || defaultTag[0] == 'Low Priority') ? [] : defaultTag)
    console.log('updated' + tags);
  }, [reloadState, username])
  const [newTag, setNewTag] = useState("");
  const [showNewTag, setShowNewTag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleTagClick = async (tag) => {
    await router.push('/' + (donePage?'done':'todos') + '/' + tag);
    // router.reload();
  }
  const handleUpdateTags = (tagsToAdd) => {
    if(!tags.includes(tagsToAdd)){
      setTags([...tags, tagsToAdd]);
      setShowNewTag(false);
      setNewTag(null);
      return true;
    }
    console.log(tags);
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
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reloadState();
  };
  return (
    <>
      <div className="container-fluid todo-card-container">
        <StickyNote name={username}/>
        <div className="row">
          <div className={'col-xl-' + (!donePage ? '6' : '8')}>
            <div className="container-fluid">
              <div className="row">
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
                        handleTagClick={handleTagClick}
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className={'col-xl-' + (!donePage ? '6' : '4')}>
            <div className="container">
              <div className="row">
                {!donePage && (
                  <div className="col-md-7">
                  <div className="card todo-add">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Enter task..."
                          className="clear-input fs-1"
                          onChange={(e) => setTask(e.target.value)}
                        />
                        <textarea
                          type="text"
                          className="transparent-text-box fs-5"
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
                              disabled={defaultTags[0] == 'High Priority' || defaultTags[0] == 'Low Priority'}
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
                              disabled={defaultTags[0] == 'High Priority' || defaultTags[0] == 'Low Priority'}
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
                                editable={tag!=defaultTags[0]}
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
                          <div className="datepicker-container">
                            <input
                              type="date"
                              className="datepicker fs-5"
                              placeholder="Select a date"
                              name="dueOn"
                              onChange={(e) => setDueOn(e.target.value)}
                              required
                            />
                            {/* <img src="/calendar.png" className="calendar-icon"/> */}
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
                <div className={'col-md-' + (!donePage ? '5' : '9') + ' todo-buttons'}>
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
                    <button className="btn btn-link p-0 fs-2" onClick={handleShowModal}>
                      <img src="/filter.png" alt="Filter" />
                    </button>
                    <TagFilterModal showModal={showModal} onClose={handleCloseModal} handleTagClick={handleTagClick} />
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