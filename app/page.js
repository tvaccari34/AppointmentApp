'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalAPI from "./_services/GlobalAPI";
import { useEffect, useState } from "react";
import BusinessList from "./_components/BusinessList";

export default function Home() {

  const [categoryList, setcategoryList] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  useEffect(()=>{
    getCategoryList();
    getAllBusinessList();
  }, [])

  const getCategoryList=()=>{
    GlobalAPI.getCategory().then(resp=>{
      setcategoryList(resp.categories);
    })
  }

  const getAllBusinessList=()=>{
    GlobalAPI.getAllBusinessList().then(resp=>{
      setBusinessList(resp.businessLists);
    })
  }

  return (
   <div>
    <Hero/>

    <CategoryList categoryList={categoryList}/>

    <BusinessList businessList={businessList} title={'Popular Business'}/>
   </div>
  );
}
