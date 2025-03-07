"use client"

import { spring } from "motion"
import { useState } from "react"
import Tutorial from "@custom/Tutorial";
import Carousel from "@custom/Carousel";

export default function CSSGeneration() {
  const [state, setState] = useState(false)

  return (
    // <div className="example-container">
    //   <div className="box" data-state={state} />
    //   <p className='text-spring' data-state={state} >test test test</p>
    //
    //   <button onClick={() => setState(!state)}>Toggle position</button>
    <>
      <p>111</p>


      <Carousel />
    </>
    //
    //   <style>
    //     {`
    //     .text-spring {
    //       color: #4ff0b7;
    //       animation: ${spring(0.5, 0.8)} infinite alternate ease-in-out;
    //     }
    //     .text-spring[data-state="true"] {
    //       transform: translateX(100%) rotate(180deg);
    //     }
    //
    //
    //                 .example-container {
    //                     display: flex;
    //                     flex-direction: column;
    //                     align-items: center;
    //                     justify-content: center;
    //                     gap: 20px;
    //                 }
    //
    //                 .example-container .box {
    //                     width: 100px;
    //                     height: 100px;
    //                     background-color: #4ff0b7;
    //                     border-radius: 10px;
    //                     transition: transform ${spring(0.5, 0.8)};
    //                     transform: translateX(-100%);
    //                 }
    //
    //                 .example-container .box[data-state="true"] {
    //                     transform: translateX(100%) rotate(180deg);
    //                 }
    //
    //                 .example-container button {
    //                     background-color: #4ff0b7;
    //                     color: #0f1115;
    //                     border-radius: 5px;
    //                     padding: 10px;
    //                     margin: 10px;
    //                 }
    //             `}
    //   </style>
    // </div>
  )
}
