import React from 'react'
import { useMoralis , useWeb3Transfer , useMoralisWeb3Api  } from "react-moralis";
import Atropos from 'atropos/react';
import 'atropos/css';
function Box({price ,img}) {
  const { Moralis} = useMoralis();
  const { fetch, error, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.Token(price, 9),
    // amount: Moralis.Units.ETH(0.000002),
    receiver: "0x8C91C678259f2D5171D63A1988f1bFa086fe511e",
    // type: "native",
    type: "erc20",
    contractAddress: "0x2f36a4b753facc1788e87dfd79ddc8857fe49bcd",
  });
  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
  return (
    <Atropos
    activeOffset={40}
    shadowScale={1.05}
    onEnter={() => console.log('Enter')}
    onLeave={() => console.log('Leave')}
    onRotate={(x, y) => console.log('Rotate', x, y)}
    onClick={() => fetch()} disabled={isFetching}
  >
      <div className='w-full cursor-pointer  flex justify-center items-center h-[80vh] rounded-lg transition-all ease-in-out duration-300 relative' >
       {/* <span className='p-3 text-[15px] bg-blue-800 text-white cursor-pointer rounded-xl w-[250px] text-center transition-all ease-in-out duration-300 hover:bg-blue-600'>
       
      </span> */}
      <img src={img} className='h-[80vh] object-cover hover:scale-95 transition-all ease-in-out duration-500 rounded-xl' />
      <p data-atropos-offset="3" className='cursor-pointer text-white text-[25px] absolute w-[80%]'>Buy {numberWithCommas(price)} NUTTO</p>
      {/* <img src={img} className='object-cover w-[150px] h-[150px] rounded-xl shadow-xl shadow-black' />
      <span className='p-3 text-[15px] bg-blue-800 text-white cursor-pointer rounded-xl w-[250px] text-center transition-all ease-in-out duration-300 hover:bg-blue-600' onClick={() => fetch()} disabled={isFetching}>
        Buy {numberWithCommas(price)} NUTTO
      </span> */}
    </div>
  </Atropos>
   
  
  )
}

export default Box