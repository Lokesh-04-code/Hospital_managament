import React from "react";
function Phone(){
    return(
        <div>
            <label htmlFor="pass" className="block font-semibold mb-2 text-sm sm:text-base mt-5 ml-5">
        Mobile Number
      </label>
      <input
        type="text"
        id="pass"
        placeholder="Enter your Mobile Number"
        className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base mt-2 ml-5"
      />
        </div>
    )
}
export default Phone