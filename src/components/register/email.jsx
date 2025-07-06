import React from "react";
function Email(){
    return(
        <div className="ml-250">
            <label for="name" className="font-semibold ml-25">Name:</label><br />
            <input id="name" type="text" placeholder="Enter E-mail"  className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base  "></input>
        </div>
    )
}
export default Email