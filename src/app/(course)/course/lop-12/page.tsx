import Image from "next/image";
export default function ClassTwelve(){
    const Course = [
        {
          id: 1,
          name: "Toán 10",
          category: "Toán",
          description: "Bài tập toán cơ bản 10",
        },
        {
          id: 2,
          name: "Tiếng Anh cơ bản 10",
          category: "Tiếng Anh",
          description: "Bài tập tiếng anh cơ bản 10",
        },
        {
          id: 3,
          name: "Tiếng Anh nâng cao 10",
          category: "Tiếng Anh",
          description: "Bài tập tiếng anh nâng cao 10",
        },
        {
          id: 4,
          name: "Toán nâng cao 10",
          category: "Toán",
          description: "Bài tập toán nâng cao 10",
        }
    ];
    const Test = [
        {
          id: 1,
          name: "Test Toán 10",
          category: "Toán",
          description: "Test toán cơ bản 10",
          status: "Open",
        },
        {
          id: 2,
          name: "Test cơ bản 10",
          category: "Tiếng Anh",
          description: "Test tiếng anh cơ bản 10",
          status: "Open",
        },
        {
          id: 3,
          name: "Test tiếng Anh nâng cao 10",
          category: "Tiếng Anh",
          description: "Bài tập tiếng anh nâng cao 10",
          status: "Open",
        },
        {
          id: 4,
          name: "Test toán nâng cao 10",
          category: "Toán",
          description: "Bài tập toán nâng cao 10",
          status: "Open",
        }
    ];
    return(
        <div className="font-[sans-serif]">
        <div className="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-10">Class Cousre 12</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            {Course.map((course)=>{
              return(
                <div  key = {course.id} className="bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative">
                <div className="mb-4 bg-gray-100 rounded p-2">
                  <Image src="https://readymadeui.com/images/product9.webp" alt="Product 1"
                    className="aspect-[33/35] w-full object-contain"
                    width={1200}  // Specify the width
                    height={240} />
                </div>
    
                <div>
                  <div className="flex gap-2">
                    <h5 className="text-base font-bold text-gray-800">{course.name}</h5>
                  </div>
                  <p className="text-gray-500 text-[13px] mt-2">{course.description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <button type="button" className="text-sm px-2 h-9 font-semibold w-full bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded">Register</button>
                  </div>
                </div>
              </div>
              )
            })}
  
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 mt-6 sm:mb-10">Test</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            {Test.map((test)=>{
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
                    <h5 className="text-base font-bold text-gray-800">{test.name}</h5>
                    
                  </div>
                  <p className="text-gray-500 text-[13px] mt-2">{test.description}</p>
                  <p className="text-base text-gray-500">{test.status}</p>
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
    )
}