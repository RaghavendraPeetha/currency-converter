import React from 'react'
import {v4 as uuid} from "uuid"
import "./CurrencyRow.css"
function CurrencyRow(props) {
    const {currencyOptions,selectedCurrency,onChangeCurrency,amount
   , onChangeAmount}=props
    return (
        <div className="inputs">
           <input
           type="number"
           value={amount}
           onChange={onChangeAmount}
           className="input"
           />
           <select value={selectedCurrency} onChange={onChangeCurrency}
           className="select"
           >
             

               {currencyOptions.map(eachOption=>(
                     <option value={eachOption} key={uuid()}>
                     {eachOption}
                 </option>
               ))}y
           </select>
        </div>
    )
}

export default CurrencyRow
