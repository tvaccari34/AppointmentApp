import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
    <div className='flex items-center gap-3 flex-col justify-center pt-14 pt-7'>
        <h2 className='font-bold text-[46px] text-center'>Find Home 
            <span className='text-primary'> Service & Repair</span>
            <br /> Near You</h2>
        <h2 className='text-xl text-gray-500'>Explore Best Home Service & Repair near you</h2>
        <div className='m-6 flex gap-5 items-center'>
            <Input placeholder='Search' className='rounded-full md:w-[350px]'/>
            <Button className='rounded-full md:w-[45px]'>
                <Search className='h-5 w-5'/>
            </Button>
        </div>
    </div>
    
  )
}

export default Hero