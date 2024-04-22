import axios from 'axios'

const service =  axios.create({
    baseURL: '/api',
    timeout: 50000,
    // headers : {"Access-Control-Allow-Origin":"*"}
})

export default service
