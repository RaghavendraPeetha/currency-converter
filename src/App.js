
import React,{useEffect, useState} from 'react';
import CurrencyRow from './CurrencyRow';
import {GoogleLogin,GoogleLogout} from "react-google-login"
import Header from './Header';
import './App.css';

///1c1770a6bf1ea8dbed83c5e04661a1a0
const BASE_URL=`http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_GET_CONVERSIONS_KEY}`




function App() {

  const [currencyOptions,setCurrencyOptions]=useState([])
  const [isLogged,setIsLogged]=useState(false)
  const [fromCurrency,setFromCurrency]=useState()
  const [toCurrency,setToCurrency]=useState()
  const [amount,setAmount]=useState(1)
  const [amountInFromCurrency,setAmountInFromCurrency]=useState(true)
  const [exchangeRate,setExchangeRate]=useState()
  const [userDetails,setUserDetails]=useState({})
 



  let toAmount,fromAmount
  if(amountInFromCurrency){
    fromAmount=amount
    toAmount=amount * exchangeRate
  }else{
    toAmount=amount
    fromAmount=amount / exchangeRate
  }
 

  const onLoginSuccess=(res)=>{
     
      setIsLogged(true)
      setUserDetails(res.profileObj)
  }


  const onLoginFailure=res=>{
    console.log("Login Failed:",res)
   
  }
 

const onLogout=()=>{
 
  console.clear()
  setIsLogged(false)
}

useEffect(()=>{
  fetch(BASE_URL)
  .then(res=>res.json())
  .then(data=>{
  
    const firstCurrency=Object.keys(data.rates)[0]
    setCurrencyOptions([data.base,...Object.keys(data.rates)])
    setFromCurrency(data.base)
    setToCurrency(firstCurrency)
    setExchangeRate(data.rates[firstCurrency])
   
  })
},[])





useEffect(()=>{
 
  
  if (fromCurrency!=null && toCurrency!=null){
  
  console.log(fromCurrency)
    
  console.log(`${BASE_URL}&from=${fromCurrency}&to=${toCurrency}`)
   
    fetch(`${BASE_URL}&base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res=>res.json())
    .then(data=>setExchangeRate(data.rates[toCurrency])
    
    )
     
  
    }
    
  },[fromCurrency,toCurrency])


 
  





function fromAmountChange(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(true)
}


function toAmountChange(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(false)
}



  return (
<div className="app__cnr">

 

    {isLogged?(
     <div className="header__cnr">
        <div className="nav">
          <div>
          <Header  userDetails={userDetails}/>

            </div>
              
              <div>
              <GoogleLogout
                   clientId={process.env.REACT_APP_CLIENT_ID}
                   buttonText="Logout"
 
                   onLogoutSuccess={onLogout}
                />

                </div>
              
        </div>
          <div className="login__window">
   
             <div >
               <p className="email"><span>Email:</span> {userDetails.email}</p>
               <p className="greetings"><span>Hello!</span> {userDetails.familyName}. </p>
               <p className="welcome">Welcome to Currency Converter App.</p>
             </div>
             <div> 
                <h1 className="heading">Convert</h1>
                <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e=>setFromCurrency(e.target.value)}
                amount={fromAmount}
                onChangeAmount={fromAmountChange}
               />
               <div className="equals">=</div>
                <CurrencyRow  
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={e=>setToCurrency(e.target.value)}
                amount={toAmount}
                onChangeAmount={toAmountChange}
               />
             </div>
         </div>
      </div>
       ):(
   
      <div className="login__page">

            <h1>Currency Converter</h1>
            <p>Login to Convert</p>
            <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Login with Google"
 
             onSuccess={onLoginSuccess}
             onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
              />
      </div>
    )}
 
 
    
 
</div>
  );
}

export default App;
