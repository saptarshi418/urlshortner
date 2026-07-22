import React, { useEffect, useState } from 'react'
import { Loader, Trash2 , PenLine } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/nav/NavBar';
import Footer from '../components/nav/Footer';
import { BASE_FRONTEND_URL } from '../services/configFrontend';
import EditPage from '../components/page_myurls_components/EditPage';
import DeletePage from '../components/page_myurls_components/DeletePage';
import { div } from 'framer-motion/client';


const MyUrls = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const [urls, setUrls] = useState([]);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(null)
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [totalPage, setTotalPage] = useState(null);

    const [isEditClicked, setisEditClicked] = useState(false)
    const [isDeleteClicked, setisDeleteClicked] = useState(false)

    const [editUrl, setEditUrl] = useState(null)    //passing the url to the edit page
    const [deleteUrl, setDeleteUrl] = useState(null)  //passing the url obj to the del page



    // define data loader function 
    const myUrlsData = async (page = 1)=>{
            try {
                const response = await api.get(`urls/?page=${page}`)
                
                
                setUrls(response.data.results);
                setTotalPage(response.data.total_pages);
                setCurrentPage(response.data.current_page);
                setPreviousPage(response.data.previous);
                setNextPage(response.data.next);

                
                setIsLogged(true);

            } catch (error) {
                navigate('/login')
            }finally{
                setIsLoading(false);
            }
            
        }

    useEffect(()=>{
        
        myUrlsData(1);
    }, []);


    // edit handler 
    const editHaldler = (urls)=>{
        setisEditClicked(true);
        setEditUrl(urls);

    }

    const deleteHandler = (urls)=>{
        setisDeleteClicked(true);
        setDeleteUrl(urls);
    }


    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader className="animate-spin" size={40} />
            </div>
        );
    }

    

  return (
    <>
    {isEditClicked && (
        <EditPage url={editUrl} close={() => setisEditClicked(false)} />
    )}

    {isDeleteClicked && (
        <DeletePage url={deleteUrl} close={() => setisDeleteClicked(false)} />
    )}

    <div className='min-h-screen w-full  flex flex-col px-2'>
        <NavBar isLogged={isLogged}/>
        <div className=' flex-1 flex flex-col'>
            <div className=' h-32 w-full flex justify-center items-center'>
                <h1 className='font-bold text-4xl'>My URLs</h1>
            </div> 
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-rose-700 text-white">
                        <th className="p-3 text-left">Original URL</th>
                        <th className="p-3 text-left">Short URL</th>
                        <th className="p-3 text-left">Expiry</th>
                        <th className="p-3 text-center">Edit</th>
                        <th className="p-3 text-center">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {urls.map((url) => (
                        <tr
                            key={url.id}
                            className="border-b hover:bg-gray-50"
                        >
                            <td className="p-3 max-w-sm truncate">
                                {url.original_url}
                            </td>

                            <td className="p-3 text-blue-600">
                                {BASE_FRONTEND_URL}/{url.short_code}
                            </td>

                            <td className="p-3">
                                {url.expiry_date}
                            </td>

                            <td className="p-3 text-center">
                                <PenLine
                                    color="#b8a800"
                                    className="mx-auto cursor-pointer"
                                    onClick={()=>{
                                        editHaldler(url);
                                    }}
                                />
                            </td>

                            <td className="p-3 text-center">
                                <Trash2
                                    color="#ff2424"
                                    className="mx-auto cursor-pointer"
                                    onClick={()=>{deleteHandler(url)}}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

                   <div className="flex justify-center items-center gap-5 mt-8">
                    <button
                        disabled={previousPage === null}
                        onClick={() => myUrlsData(previousPage)}
                        className="px-4 py-2 rounded bg-rose-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    <span className="font-semibold">
                        Page {currentPage} of {totalPage}
                    </span>

                    <button
                        disabled={nextPage === null}
                        onClick={() => myUrlsData(nextPage)}
                        className="px-4 py-2 rounded bg-rose-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>


        </div>
        <Footer/>
    </div>
    </>
  )
}

export default MyUrls