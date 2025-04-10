import React from 'react'
import { Outlet } from 'react-router-dom'

function AttendeeLayout() {
  return (
    <main className='flex flex-col w-full'>
        <Outlet/>
    </main>
  )
}

export default AttendeeLayout