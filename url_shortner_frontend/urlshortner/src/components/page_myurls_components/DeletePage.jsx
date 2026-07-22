import React from 'react'
import api from '../../services/api';

const DeletePage = ({ url,close}) => {

    const deleteHandler = async (e)=>{
        e.preventDefault();
        try {
            const response = api.delete(`urls/${url.id}/`)
            alert('Url deleted successfully');
            
        } catch (error) {
            alert(error);

        }finally{
            window.location.reload();
        }
    }




  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg flex flex-col items-center gap-2">
                <p className='font-bold text-2xl text-red-700'>Delete Url</p>
                <p>Are you sure ?</p>
                <div className='w-full flex justify-between'>
                    <button className='w-6/13 h-8 bg-red-700 rounded-2xl  text-white text-sm font-bold hover:cursor-pointer' onClick={(e)=>{deleteHandler(e);}}>Delete </button>
                    <button className='w-6/13 h-8 bg-amber-500 rounded-2xl  text-white text-sm font-bold hover:cursor-pointer' onClick={close} >Cancel</button>
                </div>
                  
            </div>
        </div>
  )
}

export default DeletePage