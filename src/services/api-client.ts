import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params:{
        key:'94b0e537e2b74ad1b51097e0e0a9b245'
    }
})