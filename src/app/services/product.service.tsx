import axios from "axios";

export function getQuery(param: any) {
    return ( 
        axios.get(`http://localhost:8080/product?${param}`).then((response: any) => response.data)
     );
}

