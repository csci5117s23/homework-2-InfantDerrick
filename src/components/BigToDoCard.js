import Tag from "@/components/Tag";
import { Button } from "react-bootstrap";
import CustomToast from "@/components/CustomToast";

export default function BigToDoCard({
  title,
  description,
  tags,
  dueOn,
  randomColor,
  done,
  setTitle,
  setDescription,
  setTags,
  setDueOn,
  setDone,
  handleTagEdit,
  handleTagDelete,
  handleDeletNewTag,
  handleUpdateTags,
  handleNewTag,
  showNewTag,
  newTag,
  handleUpdate,
  handleRedirect
}) {
  return (
    <>
      <CustomToast title={'carpe diem.'} tag={'info'} body={'You can edit this todo!'}/>
      <div class="container-fluid" style={{ height: "80vh" }}>
        <div class="card big-todo-card">
          <img src={"/clip.png"} className="todo-card-clip" />
          <div class="card-body big-card-body p-5" style={{ width: "75%" }}>
            <h1 class="card-title big-card-title">
              {" "}
              <button
                className={`radio-button ${done ? "active" : ""}`}
                onClick={() => setDone(!done)}
              >
                <span className="radio-circle"></span>
              </button>
              <input
                type="text"
                placeholder="Enter task..."
                class="clear-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </h1>
            <div
              className="d-flex flex-wrap align-items-center"
              style={{ marginBottom: "2rem" }}
            >
              {tags.map((tag, index) => (
                <Tag
                  key={index}
                  color={randomColor()}
                  tag={tag}
                  onTagEdit={(updatedTag) => handleTagEdit(index, updatedTag)}
                  onTagDelete={() => handleTagDelete(index)}
                  editable
                />
              ))}
              <div className="m-1">
                {showNewTag && (
                  <Tag
                    color={randomColor()}
                    tag={newTag}
                    onTagEdit={(updatedTag) => handleUpdateTags(updatedTag)}
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
            <div class="datepicker-container">
              <input
                type="date"
                class="datepicker fs-5"
                placeholder="Select a date"
                name="dueOn"
                value={dueOn}
                onChange={(e) => setDueOn(e.target.value)}
                required
                style={{ width: "100%" }}
              />
              {/* <img src="/calendar.png" class="calendar-icon"/> */}
            </div>
            <div className="big-card-text">
                <textarea
                          type="text"
                          class="transparent-text-box card-text"
                          placeholder="Task description..."
                          value={description}
                          style={{ height: '400px' }}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
            </div>

            <div className="big-card-options">
              <button
                className="btn btn-primary fs-4"
                style={{ background: "#092C50" }}
                onClick={() => handleUpdate()}
              >
                Save Task
              </button>
              <button
                className="btn btn-primary fs-4"
                style={{ background: "#D9D9D9" }}
                onClick={() => handleRedirect()}
              >
                Return to Tasks
              </button>
            </div>
            <div
              className="d-flex flex-wrap align-items-center"
              style={{ marginBottom: "2rem" }}
            ></div>
            <div className="clip-big">
              <img src="/clip.png"></img>
            </div>
            <div className="pen-big">
              <img src="/pen.png"></img>
            </div>
            <div className="eraser-big">
              <img src="/eraser.png"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
