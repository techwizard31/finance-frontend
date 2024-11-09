import React from 'react'
import { ChartCandlestick } from 'lucide-react';
const Commodity = () => {
  return (
    <div className='flex gap-5 mb-2 items-center'>
        <ChartCandlestick/>
        <h1 className='text-white text-xl'>Commodity</h1>
    </div>
  )
}

export default Commodity