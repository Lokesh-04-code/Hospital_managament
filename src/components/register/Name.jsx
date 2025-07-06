import React from "react";
function Name(){
    return(
        <div>
            <label for="name" className="font-semibold ml-5 mt-15">Name:</label><br />
            <input type="text"  placeholder="Enter Name" className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base ml-5  "></input>
        </div>
    )
}
export default Name