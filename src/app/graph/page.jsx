"use client";

import React, { useState, useEffect } from 'react';
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function GraphPage() {

  const { data: session } = useSession();

  return (
    <main>
      <Container>
        <Navbar session={session} />
          <div className="flex-grow text-center p-10">
            <p className="text-2xl mt-3">Graph</p>
            
          </div>
        <Footer />
      </Container>
    </main>
    
  );
}
export default GraphPage;