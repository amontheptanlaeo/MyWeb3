import Head from 'next/head'
import React, { useState,useEffect } from 'react';
import { useMoralis , useWeb3Transfer , useMoralisWeb3Api  } from "react-moralis";
import { Box } from '../../components/Box';
import Link from 'next/link';
import Image from 'next/image'

function Boxopen() {
  const Web3Api = useMoralisWeb3Api();
  const [userDetail,setUserDetail] = useState(null);
  const [token,setToken] = useState(0);
  const [price,setPrice] = useState(20);
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout  , Moralis} = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
     // window.location.href = "/box";
      console.log(user)
      setUserDetail(user);
      // fetchTokenBalances();
      fetchTokenBalances();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

    const fetchTokenBalances = async () => {
        const options = {
          chain: "bsc",
          token_addresses: '0x2f36a4b753facc1788e87dfd79ddc8857fe49bcd'
          // address: user.get("ethAddress"),
        };
        const balances = await Web3Api.account.getTokenBalances(options);
        // balances.forEach(balance => {
        //   console.log(balance.name,balance.balance/(10**balance.decimals));
        // })
        setToken(numberWithCommas(balances[0].balance/(10**balances[0].decimals)))
        // console.log(balances[0].balance/(10**balances[0].decimals));
        // console.log(balances[0].balance/(10**balances[0].decimals));
      };

    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    const logOut = async () => {
        setToken(null);
        await logout();
        console.log("logged out");
        window.location.href = "/";
      }

  return (<>
      <div>{token}</div>
        {isAuthenticated && <div className='flex justify-center items-center w-full mb-8'>
        {/* <div className='w-full flex justify-center items-center gap-6 flex-wrap '> */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full text-center px-6">
        <Box price={1000000} img={'https://thumbs.dreamstime.com/b/crazy-cat-tongue-hanging-out-40087599.jpg'}/>
        <Box price={3000000} img={'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'}/>
        <Box price={8000000} img={'https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=pexels-krysten-merriman-20787.jpg&fm=jpg'}/>
        <Box price={10000000} img={'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cat_Sphynx._Kittens._img_11.jpg/2560px-Cat_Sphynx._Kittens._img_11.jpg'}/>
        </div> 
      </div>}
      {isAuthenticated && <p className='font-bold text-[12px]  md:text-[12px] '>Balances: {token} NutToken</p>}
      {isAuthenticated && <Link href={`https://bscscan.com/address/${user.get("ethAddress")}`}><a target={'_blank'}><p className='text-blue-600 font-bold text-[12px] md:text-[12px] cursor-pointer transition-all ease-in-out duration-300'>{user.get("ethAddress")}</p></a></Link>}
      {
          isAuthenticated &&  <span className='p-3 text-[12px] bg-red-500 text-white cursor-pointer text-[12px]rounded-full w-[150px] text-center transition-all ease-in-out duration-300 hover:bg-red-400 rounded-full' onClick={logOut} disabled={isAuthenticating}>Logout</span>
    }
  </>

  )
}

export default Boxopen