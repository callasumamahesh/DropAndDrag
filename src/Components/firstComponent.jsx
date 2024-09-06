import React, { useState } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'

function FirstComponent() {
  const navigate = useNavigate()
  
  return (
    <div>
      <h1>First Component</h1>
      <button onClick={() => navigate('/second')}>Move to 2</button>
      <button onClick={() => navigate('/third')}>Move to 3</button>
    </div>
  )
}

export default FirstComponent
