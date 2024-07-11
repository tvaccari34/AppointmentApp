import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import GlobalAPI from '@/app/_services/GlobalAPI';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { format } from 'date-fns';



function BookingSection({children, business}) {
    
    const [date, setDate] = React.useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTime, setSelectedTime] = useState([])
    const {data} = useSession();
    const [bookedSlot, setbookedSlot] = useState([])

    useEffect(()=>{
        getTime();
        setDate('');
        setSelectedTime('');
    }, []);

    useEffect(()=>{
        getBusinessBookingSlots();
    }, [date]);

    const getTime = () => {
        const timeList = [];

        for (let i = 10; i <= 12; i++) {
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }

        for (let i = 1; i <= 6; i++) {
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i + ':30 PM'
            })
        }
        setTimeSlot(timeList);
    }

    const saveBooking=()=>{
        
        const formattedDate = format(date, 'dd-MMM-yyyy');
        GlobalAPI.createNewBooking(business.id, formattedDate, selectedTime, data.user.email, data.user.name )
        .then(resp=>{
            if (resp) {
                toast('Service Booked Successfully!');
                resetTimeSlot();
            }
        }, (e)=>{
            toast('Error while creating booking.');
        });
    }

    const resetTimeSlot=()=>{
        setDate('');
        setSelectedTime('');
    }

    /**
     * Get Selected time slots booked for a given date
     */
    const getBusinessBookingSlots=()=>{
        const formattedDate = date == "" ? "" : format(date, 'dd-MMM-yyyy');
        GlobalAPI.getBusinessBookingSlots(business.id, formattedDate)
        .then(resp=>{
            setbookedSlot(resp.bookings);
        });
    }

    const isSlotBooked=(time)=>{
        return bookedSlot.find(item=>item.time==time);
    }

  return (
    <div>
        
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className='overflow-auto'>
                <SheetHeader>
                <SheetTitle>Book a Service</SheetTitle>
                <SheetDescription>
                    Select a date and time slot to book a service
                    {/* Date Picker */}
                    <div className='flex flex-col gap-5 items-baseline'>
                    <h2 className='mt-5 font-bold'>Selecte Date</h2>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                    </div> 
                    <h2 className='my-5 font-bold'>Selecte Time Slot</h2>
                    <div className='grid grid-cols-3 gap-2'>
                        {/* Time Slot Picker */}

                        {timeSlot.map((item, index)=>(
                            <Button key={index}
                            disabled={isSlotBooked(item.time)}
                            variant='outline'
                            className={`border rounded-full p-2 px-3
                            hover:bg-primary hover:text-white
                            ${selectedTime==item.time&&'bg-primary text-white'}`}
                            onClick={()=>setSelectedTime(item.time)}>
                                {item.time}
                            </Button>
                        ))}
                    </div>

                </SheetDescription>
                </SheetHeader>
                <SheetFooter className='mt-5'>
                    <SheetClose asChild>
                        <div className='flex gap-5'>
                            <Button variant='destructive' className='' onClick={()=>resetTimeSlot()}>Cancel</Button>
                            <Button disabled={!(selectedTime&&date)}
                            onClick={()=>saveBooking()}>Book</Button>
                        </div>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    </div>
  )
}

export default BookingSection