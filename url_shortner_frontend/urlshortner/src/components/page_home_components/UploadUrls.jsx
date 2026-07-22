import React, { useState } from "react";
import { Copy } from "lucide-react";
import api from "../../services/api";
import { BASE_FRONTEND_URL } from "../../services/configFrontend";

const UploadUrls = ({ isLogged }) => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortCode, setShortCode] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [disableShortUrlField, setDisableShortUrlField] = useState(true);


    let reqHeader = {}
    if (isLogged){      // handling the request here if loggedin , then we will only take the accesstoken and will send in the header
        const access_token = localStorage.getItem('access')
        reqHeader = {
                    Authorization: `JWT ${access_token}`
                }
    }
    

    const getUrlHandler = async (e) => {
        e.preventDefault();

        // console.log("Original URL:", originalUrl);
        // console.log("Short Code:", shortCode);

        if (!originalUrl){
            // console.log("orginal url can't be empty");
            
            return 
        }
        
        // API Call for generate the short url 

        let payload = {};
        if (isLogged == true && shortCode){
            payload = {
                "original_url": originalUrl,
                "short_code" :shortCode
                }; 
        }else {
            payload = {
                "original_url": originalUrl
            }
        }

        
        try {
            const response = await api.post(
            `urls/` ,
            payload,
            {
                headers:reqHeader
            }
            )
            console.log(response);

            if (response.status == 201){
                setShortUrl(`${BASE_FRONTEND_URL}/${response.data.short_code}/`)
                setDisableShortUrlField(false);

            }

        
        } catch (error) {
            console.log(error);
        
        }
        



    };

    return (
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-2">

            <p className="font-bold text-3xl text-rose-700">
                Upload your urls to get a short url
            </p>

            <form
                className="flex flex-col gap-2"
                onSubmit={getUrlHandler}
            >
                <label className="text-sm font-bold">
                    Original Url
                </label>

                <input
                    type="url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="border w-2xl h-8 outline-0 px-2 rounded"
                    placeholder="Enter your URL here..."
                    required
                />

                {isLogged && (
                    <>
                        <label className="text-sm font-bold">
                            Enter special url code
                        </label>

                        <input
                            type="text"
                            value={shortCode}
                            onChange={(e) =>
                                setShortCode(e.target.value)
                            }
                            className="border w-2xl h-8 outline-0 px-2 rounded"
                            placeholder="e.g. Resume"
                        />
                    </>
                )}

                <button
                    type="submit"
                    className="bg-rose-700 text-white font-bold rounded py-2 hover:cursor-pointer"
                >
                    Generate
                </button>
            </form>

            {!disableShortUrlField && (
                <div className="relative mt-3">
                    <input
                        type="text"
                        value={shortUrl}
                        readOnly
                        className="border w-2xl h-8 outline-0 px-2 pr-10 rounded"
                    />

                    <Copy
                        color="#fe4d4d"
                        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                            navigator.clipboard.writeText(shortUrl)
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default UploadUrls;