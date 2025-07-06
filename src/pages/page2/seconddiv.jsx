import React from "react";
import YourActions from "./youractions";
import TwoButtons from "./twobuttons";

function SecondDiv() {
  return (
    <div className="bg-yellow-100 w-full max-w-4xl mx-auto rounded-xl mb-6 p-4">
      <YourActions />
      <TwoButtons />
    </div>
  );
}

export default SecondDiv;
