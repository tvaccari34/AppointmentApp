import { Button } from '@/@/components/ui/button';
import { Clock, Mail, MapPin, Share, Share2, User } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function BusinessInfo(business) {

    const [businessDetail, setBusinessDetail] = useState([]);

    useEffect(() => {
        business&&setBusinessDetail(business.business);
    }, [business]);

    if (businessDetail.length == 0) {
        <div>Loading...</div>
    }
    
        return (
                <div className='md:flex gap-4 items-center'>
                    {businessDetail && businessDetail.images && businessDetail.images.length > 0 ?
                    <Image src={businessDetail?.images[0]?.url || 'default_image_url'}
                    alt={business.name}
                    width={150}
                    height={200}
                    className='rounded-full h-[150px]
                    object-cover'
                    />
                    : <div className='fallback-image'>No Image Available</div>}
                    <div className='flex flex-col md:flex-row justify-between items-center w-full'>
                        <div className='flex flex-col mt-4 md:mt-0 items-baseline gap-3'>
                            <h2 className='text-primary p-1 px-3 text-lg bg-pink-100 rounded-full'>{businessDetail?.category?.name}</h2>
                            <h2 className='text-[40px] font-bold'>{businessDetail.name}</h2>
                            <h2 className='flex gap-2 text-lg text-gray-500'><MapPin/>{businessDetail.address}</h2>
                            <h2 className='flex gap-2 text-lg text-gray-500'>
                                <Mail/>
                                {businessDetail.email}
                            </h2>
                        </div>
                        <div className='flex flex-col gap-5 items-end'>
                            <Button><Share2/></Button>
                            <h2 className='flex gap-2 text-xl text-primary'><User/>{businessDetail.contactPerson}</h2>
                            <h2 className='flex gap-2 text-xl text-gray-500'><Clock/> Available 8:00 AM to 6:00 PM</h2>
                        </div>
                    </div>
                </div>
            )
    
}

export default BusinessInfo