import React, { useEffect, useState } from "react";


const useFetch = (url) => {
    console.log("URL", url);
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(">>> PDT", url);
                if (data) {
                    setData(data?.products);
                }
            })
            .catch((e) => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);

    return [data, isLoading, isError];
}


export default useFetch;