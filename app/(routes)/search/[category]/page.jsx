'use client'

import BusinessList from '@/app/_components/BusinessList';
import GlobalAPI from '@/app/_services/GlobalAPI';
import React, { useEffect, useState } from 'react'

function BusinessByCategory(params) {

    const [businessList, setBusinessList] = useState([]);

    useEffect(()=>{
        params&&getBusinessByCategory();
    }, [params]);

    const getBusinessByCategory=()=>{
        GlobalAPI.getBusinessByCategory(params.params.category).
        then(resp=>{
            setBusinessList(resp?.businessLists);
        });
    }

  return (
    <div>
        <BusinessList title={params.params.category} 
        businessList={businessList}/>
    </div>
  )
}

export default BusinessByCategory