import { useId } from "react";

// reusable component
function InputBox({label, amount, onAmountChange, onCurrencyChange, currOptions=[], selectCurrency='usd', currencyDisable=false, amountDisable=false}){
      const amountInputId= useId();
      return (
      <div className='bg-white w-80 p-2 m-2  text-black  flex flexwrap rounded-lg justify-between'> 
      <div className=' bg-white p-2  flex flex-col'>
       <label htmlFor={amountInputId}> {label}</label>
       <input  id={amountInputId} type="number" placeholder="amount" value={amount} disabled={amountDisable} className='w-40 outline-none' onChange={(e)=>{
             onAmountChange && onAmountChange(Number(e.target.value));
       }}/>
      </div>
      <div className='relative bg-white p-2 '>
       <label htmlFor="From"><p>Currency Type</p> </label>
      <select name="" id="" className='w-16  outline-none rounded-lg p-1 float-right' value={selectCurrency} disabled={currencyDisable} onChange={(e)=>{
            onCurrencyChange && onCurrencyChange(e.target.value);
       }} onMouseEnter={(e)=>{e.target.style.cursor= 'pointer'}}>

        {/* creation of dropdown menu using javascript loop */}
       {currOptions.map((currency)=>{
            return (
                <option key={currency} value={currency}>{currency}</option>
            )
       })}
      </select>
      </div>
    </div>
      )
}
export default InputBox;