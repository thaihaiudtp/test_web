'use client'
import Image from "next/image";
import { GetTest } from "@/service/test";
import { useEffect, useState } from "react";
import { useRouter} from "next/navigation";
import Cookies from "js-cookie";
export interface TestItem {
  id: number;
  name_test: string;
  class_test: number;
  diffcult_test: string; 
  status: number;
}

export default function Home() {
  const getToken = Cookies.get('token');
  const router = useRouter();
  const [test, setTest] = useState<TestItem[]>([]);
  const [err, setErr] = useState(null);
  useEffect(() => {
    if(!getToken){
      router.push('/login'); 
    }
    const fetchTest = async () => {
      try {
        const data = await GetTest();
        console.log(data.data)
        setTest(data.data);
      } catch (error: any) {
        setErr(error.message);
      }
    }
    fetchTest();  
  }, [])
  return (
    <>
    {err && (
      <div>
        <h1 className="text-red-900 text-bond text-2xl">{err}</h1>
      </div>
    )}
    <div className="font-[sans-serif]">
      <div className="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-10">Test</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
          {test.map((test)=>{
            return(
              <div  key = {test.id} className="bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative">
              <div className="mb-4 bg-gray-100 rounded p-2">
                <Image src="https://readymadeui.com/images/product9.webp" alt="Product 1"
                  className="aspect-[33/35] w-full object-contain" 
                  width={1200}  // Specify the width
                  height={240}/>
              </div>
  
              <div>
                <div className="flex gap-2">
                  <h5 className="text-base font-bold text-gray-800">{test.name_test}</h5>
                </div>
                <p className="text-gray-500 text-[13px] mt-2">Class: {test.class_test}</p>
                <p className="text-gray-500 text-[13px] mt-2">Difficult: {test.diffcult_test}</p>                
                <div className="flex items-center gap-2 mt-4">
                  <button type="button" className="text-sm px-2 h-9 font-semibold w-full bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded">Test</button>
                </div>
              </div>
            </div>
            )
          })}

        </div>
      </div>
    </div>
    </>
  );
}
