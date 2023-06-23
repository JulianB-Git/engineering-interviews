import Link from "next/link";
import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import AppContext from "@/context/appContext";
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { repos, handleToggle } = useContext(AppContext);
  const { data: session } = useSession();

  if (session) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-center gap-2 p-24 ${inter.className}`}
      >
        Signed in as {session?.user?.email} <br />
        <button
          className='bg-gray-500 border rounded py-1 px-2'
          onClick={() => signOut()}
        >
          Sign out
        </button>
        {repos &&
          repos.map(({ id, name, isChecked }) => (
            <div className='w-96 flex items-center justify-between' key={id}>
              <div>{name}</div>
              <button
                className={
                  isChecked
                    ? "bg-red-500 border rounded py-1 px-2"
                    : "bg-green-500 border rounded py-1 px-2"
                }
                onClick={() => handleToggle(id)}
              >
                {isChecked ? "Unselect" : "Select"}
              </button>
            </div>
          ))}
        <Link
          className='bg-blue-300 border rounded py-1 px-2'
          href={{ pathname: "/results" }}
        >
          View selection
        </Link>
      </main>
    );
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-2 p-24 ${inter.className}`}
    >
      <button
        className='bg-blue-300 border rounded py-1 px-2'
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </main>
  );
}
