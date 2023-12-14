

import axios from "axios";

// define commonRequest function
export const commonRequest= async(method,url,body)=>{

    // api request configuration

    let reqConfig={
        method,
        url,
        data:body,
        headers:{
            "content-type":"application/json"
        }
    }

    // api call using axios

    return await axios(reqConfig).then((response)=>{
        return response
    }).catch((err)=>{
        return err
    })

}