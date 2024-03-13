import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <main className='h-screen w-full flex items-center justify-center'>
        <Loader2 size={50} className='animate-spin text-primary-dark' />
    </main>
  )
}

export default Loading