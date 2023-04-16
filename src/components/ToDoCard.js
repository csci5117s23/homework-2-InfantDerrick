import Tag from '@/components/Tag'
import { randomColor } from "@/modules/util";
import { useRouter } from "next/router";

export default function ToDoCard({title, description, selectedOption, todoid, handleOptionChange, tags, dueOn, donePage=false, handleTagClick}) {
  const router = useRouter();
  return (
    <div className="col-md-6">
      <div className="card todo-card">
        <img src={"/clip.png"} className="todo-card-clip" onClick={() => router.push('/todo/'+todoid)}/>
        <div className="card-body">
          <div  className="todo-card-calendar text-center d-flex justify-content-center">
            <img src="/calendar.png" alt="calendar icon" />
            <span className="todo-card-date">{(new Date(dueOn)).toLocaleDateString('en-US', { month: 'short' })}<br></br>{(new Date(dueOn)).getDate()}</span>
          </div>
          <h1 className="card-title">
            {" "}
            <button
              className={`radio-button ${
                !donePage ? selectedOption === todoid ? "active" : "" : selectedOption === todoid ? "" : "active"
              }`}
              onClick={() => handleOptionChange(todoid)}
            >
              <span className="radio-circle"></span>
            </button>
            {title}
          </h1>
          <p className="card-text">{description}</p>
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
                clickable
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}