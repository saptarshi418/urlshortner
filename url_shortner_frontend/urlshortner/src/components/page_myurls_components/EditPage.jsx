import React, { useState } from 'react'
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const EditPage = ({ url, close }) => {

  const [originalUrl, setOriginalUrl] = useState('')
  const [increasedExpiryDays, setIncreasedExpiryDays] = useState('')
  const navigate = useNavigate()

  const orginalUrlHandler = (e)=>{
    setOriginalUrl(e.target.value);
        
  }
  const increasedExpiryDaysHandler = (e)=>{
    setIncreasedExpiryDays(e.target.value)
  }



  const submitHandler = async (e)=>{

    e.preventDefault();
    const trimmedUrl = originalUrl.trim();
    const days = Number(increasedExpiryDays);
    const hasDays = !isNaN(days) && days > 0;

    if (days < 0){
      alert('Days Must be positive');
      return
    }

    if (trimmedUrl == '' && !hasDays ){
      alert("Both Field can't be empty");
      return 
    }

    

    const payload = {}
    if (trimmedUrl!==''){
      payload.original_url = trimmedUrl;
    }
    if (days > 0 ){
      payload.expiry_increase_days = days;
    }

    try { 
      const response = await api.patch(`urls/${url.id}/` , payload)
      alert('Updated Successfully');
      window.location.reload();

    } catch (error) {
      alert(
        error.response?.data?.detail ??
       "Unable to update the URL."
      );
            
    }

  }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-2">
                <p className='font-bold text-2xl text-red-700'>Edit Url</p>
                  <form className='flex flex-col gap-2'>
                    <label htmlFor="" className='text-sm font-semibold'>Edit Orginal Url</label>
                    <input type="url" value={originalUrl} placeholder='Enter New Url Here' className='border outline-0 rounded px-1' onChange={orginalUrlHandler}/>

                    <label htmlFor="" className='text-sm font-semibold'>Extend expiry date</label>
                    <input type="number" value={increasedExpiryDays} min='1'max='30' placeholder='Enter number of days' className='border outline-0 rounded px-1'  onChange={increasedExpiryDaysHandler}/>

                    <div className='flex w-full gap-1 justify-between'>
                      <button className='w-6/13 h-8 bg-green-700 rounded-2xl text-white text-sm font-bold hover:cursor-pointer' type="button" onClick={(e)=>{submitHandler(e);}}>Save</button>
                      <button className='w-6/13 h-8 bg-red-700 rounded-2xl  text-white text-sm font-bold hover:cursor-pointer' type="button" onClick={close}>Cancel</button>
                    </div>


                  </form>
            </div>
        </div>
    );
};

export default EditPage