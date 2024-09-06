import React, { createContext, useState } from 'react'

const InformationContext = createContext()

function Contexthook({children}) {
    const [information,setInformation] = useState({
        name:"MyName",
        place:'MyPlace',
        mobileNo:'MyMobileNumber'
      })
  return (
    <div>
      <InformationContext.Provider value={information}>
        {children}
      </InformationContext.Provider>
    </div>
  )
}

export default Contexthook;
export { InformationContext };
