import React, { useContext } from 'react'
import { chatContext } from './Body'

function DefaultChatBody() {
  const {contactShape}=useContext(chatContext)
  return (
    <div className={` ${contactShape} bg-slate-100  col-span-8  rounded-r-md `}>
      no room open
    </div>
  )
}

export default DefaultChatBody
