import React, { useEffect, useState } from "react";
import "../App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
function DropandDrag() {
  const [pendingTasksWidth, setPendingTasksWidth] = useState(50);
  const [newTask,setNewTask] = useState('')
  const completedItemslocal = JSON.parse(localStorage.getItem('completedTasksLocal'))
  const pendingTasksLocal = JSON.parse(localStorage.getItem('pendingTasksLocal'))
  const [pendingTasks, setPendingTasks] = useState(pendingTasksLocal);
  const [completedTasks, setCompletedTasks] = useState(completedItemslocal);

  useEffect(() => {
    const completedItemslocal = localStorage.getItem('completedTasksLocal');
    if (!completedItemslocal) {
      localStorage.setItem('completedTasksLocal', JSON.stringify([]));
    }
    const pendingTasksLocal = localStorage.getItem('pendingTasksLocal');
    if (!pendingTasksLocal) {
      localStorage.setItem('pendingTasksLocal', JSON.stringify([]));
    }
  }, []);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Create a resize listener
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const MouseDown = () => {
    window.addEventListener("mousemove", mouseMovement);
    window.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = () => {
    window.removeEventListener("mousemove", mouseMovement);
    window.removeEventListener("mouseup", mouseUp);
  };

  const mouseMovement = (e) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setPendingTasksWidth(newWidth);
    }
  };

  const handleNewTask = () => {
    let allTasks = [...pendingTasks,{id: Date.now(),task:newTask}]
    if (newTask) {
      setPendingTasks((prev) => [
        ...prev,
        {id: Date.now(),task:newTask}
      ]);
      setNewTask('')
      localStorage.setItem('pendingTasksLocal',JSON.stringify(allTasks))
    }
  }
  
  const handleDrop = (result) => {
    const { source, destination } = result;
    if (!result.destination) return;
    const pendingItems = Array.from(pendingTasks);
    const completedItems = Array.from(completedTasks);
    let add;
    if (source.droppableId === "PendingTasks") {
      add = pendingItems[source.index];
      pendingItems.splice(source.index, 1);
    } else {
      add = completedItems[source.index];
      completedItems.splice(source.index, 1);
    }
    if (destination.droppableId === "PendingTasks") {
      pendingItems.splice(destination.index, 0, add);
    } else {
      completedItems.splice(destination.index, 0, add);
    }
    setCompletedTasks(completedItems);
    setPendingTasks(pendingItems);
    localStorage.setItem('completedTasksLocal',JSON.stringify(completedItems))
    localStorage.setItem('pendingTasksLocal',JSON.stringify(pendingItems))
  };

  const handleEdit = (id,place) => {
    console.log('c')
    if(place === 'fromPendingTasks'){
      const deletedTask = pendingTasks.filter((item) => item.id === id)
      const newarray = pendingTasks.filter((item) => item.id !== id)
      localStorage.setItem('pendingTasksLocal',JSON.stringify(newarray))
      setNewTask(deletedTask[0].task)
      setPendingTasks(newarray)
    }
    else{
      const deletedTask = completedTasks.filter((item) => item.id === id)
      const newarray = completedTasks.filter((item) => item.id !== id)
      localStorage.setItem('completedTasksLocal',JSON.stringify(newarray))
      setNewTask(deletedTask[0].task)
      setCompletedTasks(newarray)
    }
  }

  const handleDelete = (id,place) => {
    console.log('c')
    if(place === 'fromPendingTasks'){
      const newarray = pendingTasks.filter((item) => item.id !== id)
      localStorage.setItem('pendingTasksLocal',JSON.stringify(newarray))
      setPendingTasks(newarray)
    }
    else{
      const newarray = completedTasks.filter((item) => item.id !== id)
      localStorage.setItem('completedTasksLocal',JSON.stringify(newarray))
      setCompletedTasks(newarray)
    }
  }

  return (
    <main className="main">
      <h1 style={{ textAlign: "center" }}>Drop and Drag Notes</h1>
      <div className="inputDiv">
      <input type="text " placeholder="Enter Task" onChange={(e) => setNewTask(e.target.value)} value={newTask}/>
      <button onClick={() => handleNewTask()}>Add Task</button>
      </div>
      <section className="mainSection">
      <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="PendingTasks">
            {(provided) => (
              <>
                <main
                  className="allTasks"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ 
                    width: screenWidth < 600 ? '100%' : `${pendingTasksWidth}%`
                  }}
                >
                  <section
                    className="pendingTasks"
                  >
                    <h2 className="heading">Pending Tasks</h2>
                    {pendingTasks?.map((item, index) => {
                      return (
                        <Draggable
                          draggableId={String(item.id)}
                          key={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div>
                              <p
                                className="singleTask"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {item.task}
                                <span className="edit-deletesection">
                                  <i className="fa-solid fa-pen-to-square" onClick={() => handleEdit(item.id,'fromPendingTasks')}>
                                  </i><i className="fa-solid fa-trash" onClick={() => handleDelete(item.id,'fromPendingTasks')}></i>
                                </span>
                              </p>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </section>
                  {provided.placeholder}
                </main>
              </>
            )}
          </Droppable>
          <div className="divider" onMouseDown={() => MouseDown()}></div>
          <Droppable droppableId="CompletedTasks">
            {(provided) => (
              <>
                <main
                  className="allTasks"
                  {...provided.droppableProps}
                  ref={provided.innerRef}style={{ 
                    width: screenWidth < 600 ? '100%' : `${pendingTasksWidth}%`
                  }}
                >
                  <section
                    className="completedTasks"
                    
                  >
                    <h2 className="heading">Completed Tasks</h2>
                    {completedTasks?.map((item, index) => {
                      return (
                        <Draggable
                          draggableId={String(item.id)}
                          key={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div>
                              <p
                                className="singleTask"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {item.task}
                                <span className="edit-deletesection">
                                  {/* <i class="fa-solid fa-pen-to-square" onClick={() => handleEdit(item.id,'fromCompletedTasks')}> </i> */}
                                 <i className="fa-solid fa-trash" onClick={() => handleDelete(item.id,'fromCompletedTasks')}></i>
                                </span>
                              </p>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </section>
                {provided.placeholder}
                </main>
              </>
            )}
          </Droppable>
      </DragDropContext>
      </section>
    </main>
  );
}

export default DropandDrag;