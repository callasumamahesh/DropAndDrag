import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InformationContext } from './contexthook'

function ThirdComponent() {
    const navigate = useNavigate()
    const [count,setCount]= useState(0)
    const information = useContext(InformationContext)
    console.log(information)
  return (
    <div>
      <h1>Third Component</h1>
      <h1>Count : {count}</h1>
      <button onClick={() => setCount(count+1)}>
        change
      </button>
      <button onClick={() => navigate('/')}>Move to 1</button>
      <button onClick={() => navigate('/second')}>Move to 2</button>
      {/* <h1>{information.name}</h1> */}
    </div>
  )
}


export default ThirdComponent
