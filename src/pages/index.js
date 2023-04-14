import Head from 'next/head'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

function Whiteboard() {
  const [isHighPriority, setIsHighPriority] = useState(true);
  const [username, setUsername] = useState('Derrick');  
  const handleHighPriorityClick = () => {
    setIsHighPriority(true);
  };

  const handleLowPriorityClick = () => {
    setIsHighPriority(false);
  };
  return(
    <>
      <div class="container-fluid todo-card-container">
      <div class="sticky-note-container text-center">
      <div class="sticky-note-text">
        <h2>{username}'s Board</h2>
      </div>
        <img src="/sticky-note.png" alt="Sticky Note"/>
      </div>
        <div class="row">
          <div class="col-md-6">
            <div class="container">
              <div class="row">
                <ToDoCard />
                <ToDoCard />
                <ToDoCard />
                <ToDoCard />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div class="container">
              <div class="row">
                <div class="col-md-7">
                <div class="card todo-add">
                  <div class="card-body">
                    <form>
                      <input type="text" placeholder="Enter task..." class="clear-input fs-1"/>
                      <textarea type="text" class="transparent-text-box fs-5" placeholder="Task description..."></textarea>
                      <div className='todo-add-categories'>
                        <h5>
                          Importance
                        </h5>
                        <div className="d-flex" style={{marginBottom: '2rem'}}>
                          <button 
                            className={`btn btn-pill priority-btn high-priority ${isHighPriority ? 'active' : ''}`} 
                            style={{ backgroundColor: '#FF9B9B', color: '#670F0F', border: 'none' }} 
                            onClick={handleHighPriorityClick}
                          >
                            High Priority
                          </button>
                          <button 
                            className={`btn btn-pill priority-btn low-priority ${!isHighPriority ? 'active' : ''}`} 
                            style={{ backgroundColor: '#B9BBBE', color: '#302E2E', border: 'none' }} 
                            onClick={handleLowPriorityClick}
                          >
                            Low Priority
                          </button>
                        </div>
                        <h5>
                          Tags
                        </h5>
                        <h5>
                          Date
                        </h5>
                        <div class="datepicker-container">
                          <input type="date" class="datepicker fs-5" placeholder="Select a date" readonly/>
                          {/* <img src="/calendar.png" class="calendar-icon"/> */}
                        </div>
                        <div className='submit-form-section'>
                          <button className="btn btn-primary fs-4" style={{background: '#092C50'}}>
                            Create
                          </button>
                          <img src="/clip.png"></img>
                        </div>

                      </div>
                    </form>
                  </div>
                </div>
                </div>
                <div class="col-md-5">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function ToDoCard(){
  return (
    <div class="col-md-6">
      <div class="card todo-card">
      
      <img src={'/clip.png'} className='todo-card-clip' /> 
      <button></button>
        <div class="card-body">
          <h1 class="card-title text-center">Card 1</h1>
          <p class="card-text">This is some text for Card 1.</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>carpe diem</title>
        <meta name="description" content="carpe diem. to-do" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/carpe-diem-logo.png" />
      </Head>
      <div className='container-fluid'>
        <div className='whiteboard'>
          <Whiteboard/>
        </div>
      </div>
      </>
    )
}
