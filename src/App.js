// import React, { useEffect, useState } from "react";
// import FirstComponent from "./Components/firstComponent";
// import { Route, Routes } from "react-router-dom";
// import SecondComponent from "./Components/secondComponent";
// import ThirdComponent from "./Components/thirdComponent";
// import Contexthook from "./Components/contexthook";

// const App = () => {
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     setVisible(true);
//   }, []);
//   return (
//     <div>
//       <Contexthook>
//         <Routes>
//           <Route path="/" element={<FirstComponent />}></Route>
//           <Route path="/second" element={<SecondComponent />}></Route>
//           <Route path="/third" element={<ThirdComponent />}></Route>
//         </Routes>
//       </Contexthook>

//     </div>
//   );
// };

// export default App;

// import React, { useReducer, useState } from 'react'
//   const reducer = (state, action) => {
//     if(action.type === 'ADD'){
//       return [...state,action.payload]
//     }
//     else{
//       return state
//     }
//   }
// const App = () => {
//   const [state, dispatch] = useReducer(reducer,[])
//   const [val,setVal]  = useState('')
//   const handleChanges = () => {
//     dispatch({
//       type : 'ADD',
//       payload  : val
//     })
//   }
//   return (
//     <div>
//       <h1>USE REDUCER HOOK</h1>
//       <section>
//         <input type='text' onChange={(e) => setVal(e.target.value)}/>
//         <button onClick={() => handleChanges()}>Add</button>
//       </section>
//       <section>
//         {
//           state?.map((item) => <p>{item}</p>)
//         }
//       </section>
//     </div>
//   )
// }

// export default App

// import React, { useState } from "react";
// import "./App.css";

// const ResizableDivs = () => {
//   const [leftWidth, setLeftWidth] = useState(50);

//   const handleMouseMove = (e) => {
//     const newWidth = (e.clientX / window.innerWidth) * 100;
//     if (newWidth > 10 && newWidth < 90) {
//       setLeftWidth(newWidth);
//     }
//   };

//   const handleMouseUp = () => {
//     // Remove event listeners after resizing is done
//     window.removeEventListener("mousemove", handleMouseMove);
//     window.removeEventListener("mouseup", handleMouseUp);
//   };

//   const handleMouseDown = () => {
//     // Start resizing by listening to mousemove and mouseup events
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <div className="container">
//       <div className="left" style={{ width: `${leftWidth}%` }}>
//         Left Div
//       </div>
//       <div className="divider" onMouseDown={handleMouseDown} />
//       <div className="right" style={{ width: `${100 - leftWidth}%` }}>
//         Right Div
//       </div>
//     </div>
//   );
// };

// export default ResizableDivs;

// import React, { useState } from "react";
// import "./App.css";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// function App() {
//   const [data, setData] = useState([
//     { id: 1, task: "Task1" },
//     { id: 2, task: "Task2" },
//     { id: 3, task: "Task3" },
//     { id: 4, task: "Task4" },
//     { id: 5, task: "Task5" },
//   ]);

//   const handleDrag = (result) => {
//     if (!result.destination) return;
//     console.log('move',result)
//     const items = Array.from(data);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setData(items);
//   };

//   return (
//     <>
//       <h1 style={{ textAlign: "center" }}>Draggable Content</h1>
//       <DragDropContext onDragEnd={handleDrag}>
//         <Droppable droppableId="ROOT">
//           {(provided) => (
//             <div
//               className="mainDiv"
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {data.map((item, index) => (
//                 <Draggable
//                   draggableId={String(item.id)}
//                   key={item.id}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="singleData"
//                     >
//                       <p>{item.task}</p>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
function App() {
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

export default App;
