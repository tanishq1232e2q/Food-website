import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useadmin } from '../context/admincontext';
export default function Counter(props) {
    // const {quant,increment,decrement}=useadmin()
    const {quant,increment,decrement}=props
    
    
  return (
    <div>
      <div>
        <span onClick={increment}><FaPlus/></span>
        <span style={{margin:"0rem 0.5rem"}}>
          {
            quant
          }
        </span>
        <span onClick={decrement}><FaMinus/></span>
      </div>
    </div>
  )
}
