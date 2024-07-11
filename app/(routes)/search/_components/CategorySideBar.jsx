'use client'

import GlobalAPI from '@/app/_services/GlobalAPI';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function CategorySideBar() {

    const [categoryList, setcategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const params = usePathname();
    const category = params.split('/')[2];

    useEffect(() => {
        getCategoryList();
    }, []);

    useEffect(() => {
        params&&setSelectedCategory(params.split('/')[2]);
    }, [params]);

    const getCategoryList = () => {
        GlobalAPI.getCategory().then(resp => {
            setcategoryList(resp.categories);
        })
    }

    return (
        <div>
            <h2 className='font-bold mb-3 text-lg text-primary'>Categories</h2>
            <div>
                {categoryList.map((category, index)=>(
                    <Link href={'/search/' + category.name} key={index} className={`flex gap-2 
                    p-3 
                    border 
                    rounded-lg
                    mb-3
                    md:mr-10
                    items-center
                    cursor-pointer
                    hover:bg-green-50
                    hover:text-primary
                    hover:border-primary
                    hover:shadow-md
                    ${selectedCategory==category.name&&' border-primary text-primary shadow-md bg-green-50'}`}>
                        <Image src={category.icon.url}
                        alt='icon'
                        width={30}
                        height={30}/>
                        <h2>{category.name}</h2>
                        
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategorySideBar