"use client";

import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import NextLogo from '../../public/CovidLogo.png'
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <main>
      <Container>
        <Navbar session={session} />
          <div className="flex-grow text-center p-10">
            <div className="flex justify-center my-10">
              <Image src={NextLogo} width={400} height={200} alt="NextJS Logo" />
            </div>
            <h3 className="text-3xl mt-[-3rem]">Welcome to an exposition of Covid-19</h3>
            <p className="text-2xl mt-3">Statistics in the United States.</p>
          </div>
        
      </Container>
    </main>
    
  );
}