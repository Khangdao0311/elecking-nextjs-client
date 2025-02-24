import axios from "axios";
import config from "../config";


export function getQuery(param: any) {
    return ( 
        axios.get(`${config.api.product}?${param}`).then((response: any) => response.data)
     );
}

