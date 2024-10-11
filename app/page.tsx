'use client'
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { FileTextIcon, HeartFilledIcon, BackpackIcon, BarChartIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Image from 'next/image'

const features = [
  {
    Icon: FileTextIcon,
    name: "Smart Money",
    description: "Manage all your financial assets in one place. Fiat, Crypto and investments.",
    href: "/",
    cta: "",
    className: "col-span-3 lg:col-span-1",
    background: (<img className="absolute -right-20 -top-20 opacity-60" />),
  },
  {
    Icon: HeartFilledIcon,
    name: "Community Driven",
    description: "Execute on the latest alpha, share with friends, and earn with the best.",
    href: "/",
    cta: "",
    className: "col-span-3 lg:col-span-2",
    background: (<img className="absolute -right-20 -top-20 opacity-60" />),
  },
  {
    Icon: BarChartIcon,
    name: "Unlock Possibilities",
    description: "Create strategies and explore innovative financial offerings, stay connected to the latest FinTech trends.",
    href: "/",
    cta: "",
    className: "col-span-3 lg:col-span-2",
    background: (<img className="absolute -right-20 -top-20 opacity-60" />),
  },
  {
    Icon: BackpackIcon,
    name: "Bring Your Peoples",
    description: "Share access with those you trust. Your data, your choice.",
    href: "/",
    cta: "",
    className: "col-span-3 lg:col-span-1",
    background: (<img className="absolute -right-20 -top-20 opacity-60" />),
  }
];


export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/subscribe', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (res.ok) {
      setMessage(data.message)
      setEmail('')
    } else {
      setMessage(data.error)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <Image
        src="/finchHeader.png"
        alt="Finch Finance"
        width={800}
        height={200}
        className="w-full max-w-3xl mx-auto my-8"
      />
      <BentoGrid className='w-3/4 mx-auto'>
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />         
        ))}
      </BentoGrid>
      <div className='w-3/4 mx-auto'>
        <div className="mt-12 mb-20">
          <h2 className="text-2xl text-center font-semibold mb-4">Join the Birdhouse!</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="lg:w-1/3 w-3/4 px-4 py-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {message && <p>{message}</p>}
            <button
              type="submit"
              className="w-1/4 px-6 py-2 bg-finchYellow text-black rounded-md hover:bg-finchYellow/95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-finchYellow dark:hover:finchYellow/50S"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <footer className="w-full bg-finchSilver text-finchBlack py-4 mt-12">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">&copy; 2024 Finch LLC. All rights reserved.</p>
          <a href="https://twitter.com/finchmoneyapp" target="_blank" rel="noopener noreferrer" className="text-finchBlue hover:text-white">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
