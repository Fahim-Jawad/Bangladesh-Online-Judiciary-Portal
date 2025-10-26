import React, { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";

const Search = () => {
  const [searchdata, setSearchData] = useState("")

const handleSubmit = (e) =>{
  e.preventdefault()
  console.log(searchdata)
}


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
        className="w-[500px] h-[50px] rounded border-none"
        type="text"
        placeholder="Enter Case ID"        
        onChange={(e) => setSearchData(e.target.value)}
        value={searchdata}
      />
      </form>
    </div>
  );
};

export default Search;
