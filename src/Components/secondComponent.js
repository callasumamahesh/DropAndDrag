import React from 'react'
import { useNavigate } from 'react-router-dom'
function SecondComponent() {
    const navigate = useNavigate()
  return (
    <div>
      <h1>Second Component</h1>
      <button onClick={() => navigate('/third')}>Move to 3</button>
      <button onClick={() => navigate('/')}>Move to 1</button>
    </div>
  )
}

export default SecondComponent
