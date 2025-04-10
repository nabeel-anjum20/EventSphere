import React from 'react'
import { Outlet } from 'react-router-dom'

function ExhibitorLayout() {
  return (
    <div className='flex flex-col overflow-hidden'>
      <main className='flex flex-col w-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default ExhibitorLayout