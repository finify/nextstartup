import { auth , signOut , signIn } from '@/auth'
import { sign } from 'crypto'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {

  const session = await auth()

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/nextstartup.png" alt="logo" width={140} height={50} />
        </Link>

        <div className="flex items-center space-x-4 text-black">
          {session && session?.user ? (  
              <>
                <Link href="/startup/create">
                  <span>Create Startup</span>
                </Link>
              

                <form action={
                  async () =>{ 
                    "use server" 
                    await signOut({ redirectTo: '/' })
                  }}>
                  <button type="submit">
                    <span>Sign Out</span>
                  </button>
                </form>

                <Link href="/user/${session?.id}">
                  <span>{session?.user?.name}</span>
                </Link>
              </> 
            ) : (
                // <button onClick={
                // async () => {
                //   "use server"
                //   await signIn('github')

                // }}
                // >
                //   <span>Sign In</span>
                // </button>

                <form action={
                  async () => {
                    "use server"
                    await signIn('github')
                  }}>
                  <button type="submit">
                    <span>Sign In</span>
                  </button>
                </form>
            )
          }
        </div>
      </nav>
    </header>
  )
}

export default Navbar
