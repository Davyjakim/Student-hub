import React from 'react'
import Sent from "./messages/Sent"
import Receive from './messages/Receive'

function ChatBody() {
  return (
    <div className='xs:h-[350px] min-w-[400px]  md:h-[500px] flex flex-col-reverse overflow-y-scroll ss:h-[450px]'>
     <div className='flex flex-col w-full'>
      < Sent message="hello"/>
      < Receive message="hello"/>
     </div>
    </div>
  )
}

export default ChatBody
