import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Search } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
    <div className='flex items-center gap-3 flex-col justify-center pt-14 pt-7 h-[520px]'>
          <div className='w-full h-full bg-cover flex flex-col justify-center'  style={{
           backgroundImage: "url(background.png)"}}>
            <h2 className='font-bold text-[82px] text-center text-gray-700'>Find Your 
                <span className='text-pink-600'> Beauty</span> & <span className='text-pink-600'>Wellness</span>
                <br /> <span className='text-pink-600'>Starting</span> from your <span className='text-pink-600'>Hands</span>
            </h2>
            <h2 className='flex justify-center text-[28px] text-gray-500 mt-12'>Explore Best Nails Services Exclusive for You</h2>
            <div className='m-6 flex gap-5 items-center'>
                {/* <Input placeholder='Search' className='rounded-full md:w-[350px]'/>
                <Button className='rounded-full md:w-[45px]'>
                    <Search className='h-5 w-5'/>
                </Button> */}
            </div>
          </div>
    </div>

    // <div
    //   className="hero min-h-screen"
    //   style={{
    //     backgroundImage: "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
    //   }}>
    //   <div className="hero-overlay bg-opacity-60"></div>
    //   <div className="hero-content text-neutral-content text-center">
    //     <div className="max-w-md">
    //       <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
    //       <p className="mb-5">
    //         Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
    //         quasi. In deleniti eaque aut repudiandae et a id nisi.
    //       </p>
    //       <button className="btn btn-primary">Get Started</button>
    //     </div>
    //   </div>
    // </div>



  )
}

export default Hero