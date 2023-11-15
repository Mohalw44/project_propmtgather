"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { signIn, singOut, useSession, getProviders} from "next-auth/react"


const Nav = () => {
  const { data: session } = useSession()
  const [providers , setProviders] = useState(null)
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setUpProviders()
  },[])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" 
      href="/">
      <Image 
      src="/assets/images/logo.svg"
      alt="logo"
      width={30}
      height={30} />
      <p className="logo_text">Prompts Gather</p>
      </Link>
      <div className="sm:flex hidden">
      {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link className="black_btn"
          href="/create-prompt">
          Create Post
          </Link>
          <button type="button"
          onClick={singOut} className="outline_btn">
          Sing out

          </button>
          <Link href="/profile">
          <Image src={session?.user.image}
          height={37}
          width={37}
          alt="profile"
          className="rounded-full" />

          </Link>
        </div>
      ) : (
        <>
        {providers &&
         Object.values(providers).map(provider => (
          <button 
          type="button"
          key={provider.name}
          onClick={()=> signIn(provider.id)}
          className="black_btn">
            Sign In
          </button>
         ))}
        </>
      )}

      </div>

      <div className="sm:hidden flex relative">
      {session?.user ? 
        (<div className="flex">
          <Image src={session?.user.image}
          height={37}
          width={37}
          alt="profile"
          className="rounded-full"
          onClick={()=> setToggle(prev => !prev)} />
          {toggle && 
            <div className="dropdown">
              <Link 
              href="/profile"
              className="dropdown_link"
              onClick={() => setToggle(false)}>
                My Profile
              </Link>
              <Link 
              href="/create-prompt"
              className="dropdown_link"
              onClick={() => setToggle(false)}>
                Create Prompt
              </Link>
              <button type="button"
                onClick={() =>
                {setToggle(false)
                  singOut() }} 
                className="black_btn mt-5 w-full">
                Sing out

              </button>

            </div>}
        </div>):
        (<>
          {providers &&
         Object.values(providers).map(provider => (
          <button 
          type="button"
          key={provider.name}
          onClick={()=> signIn(provider.id)}
          className="black_btn">
            Sign In
          </button>
         ))}
        </>)
        }

      </div>
    </nav>
  )
}

export default Nav