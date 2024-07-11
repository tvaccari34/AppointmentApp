'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingHistoryList from './_components/BookingHistoryList'
import GlobalAPI from '@/app/_services/GlobalAPI'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'


function MyBooking() {

  const {data} = useSession();
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(()=>{
    data&&getUserBookingHistory();
  }, [data]);

  /**
   * Get User Booking History
   */
  const getUserBookingHistory=()=>{
    GlobalAPI.getUserBookingHistory(data.user?.email)
    .then(resp=>{
      console.log(resp);
      setBookingHistory(resp.bookings);
    });
  }

  const filterBookType=(bookType)=>{
    const result=bookingHistory.filter(item=>bookType=='booked' ? 
      new Date(item.date) >= new Date()
    : new Date(item.date) < new Date());

    return result;
  }

  return (
    <div className='my-10 mx-5 md:mx-36'>
      <h2 className='font-bold text-[20px] my-2'>My Bookings</h2>
      <Tabs defaultValue="booked" className="w-full">
        <TabsList className='w-full justify-start'>
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          <BookingHistoryList bookingHistory={filterBookType('booked')}/>
        </TabsContent>
        <TabsContent value="completed">
          <BookingHistoryList bookingHistory={filterBookType('completed')}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MyBooking