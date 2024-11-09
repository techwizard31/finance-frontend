import React from 'react';
import { TableDemo } from './Table';

const Card = ({type}) => {
  return (
    <div className="relative drop-shadow-xl sm:w-1/2 w-full h-[36rem] overflow-hidden rounded-xl bg-[#3d3c3d] opacity-60">
      <div className="absolute pt-4 text-white z-[1] opacity-90 rounded-xl overflow-y-scroll overflow-x-hidden
      inset-0.5 bg-[#323132] pl-5 no-scrollbar">
      <ul>
        <li className='text-4xl text-white sm:mx-60 mx-20 mb-5'>
          {
            type === 'Buy'? 'Buy Items' : 'My Portfolio'
          }
        </li>
      </ul>
      <TableDemo type={type}/>
      </div>
      <div className="absolute w-56 h-fit bg-white blur-[50px] -left-1/2 -top-1/2" />
    </div>
  );
}

export default Card;
