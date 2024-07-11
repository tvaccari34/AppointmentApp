'use client'

import GlobalAPI from '@/app/_services/GlobalAPI';
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import BusinessInfo from './_components/BusinessInfo';
import BusinessDescription from './_components/BusinessDescription';
import SuggestedBusinessList from './_components/SuggestedBusinessList';

function BusinessDetails({params}) {

    const { data, status } = useSession();
    
    const [business, setBusiness] = useState([]);

    useEffect(() => {
        params&&getBusinessById();
    }, [params]);

    useEffect(() => {
        checkUserAuth();
    }, []);

    const checkUserAuth=()=>{
        if (status=='loading') {
            return <p>Loading...</p>
        }
    
        if (status=='unauthenticated') {
            signIn('descope');
        }
    }

    const getBusinessById=()=>{
        GlobalAPI.getBusinessById(params.businessId).then( resp => {
            setBusiness(resp.businessList);
        });
    }

  return status=='authenticated'&& (
    <div className='py-8 md:py-20 px-10 md:px-36'>
        <BusinessInfo business={business}/>

        <div className='grid grid-cols-3 mt-16'>
            <div className='col-span-3 md:col-span-2 order-last md:order-first'>
                <BusinessDescription business={business}/>

            </div>
            <div className='grid'>
                <SuggestedBusinessList business={business}/>
            </div>
        </div>
    </div>
  )
}

export default BusinessDetails