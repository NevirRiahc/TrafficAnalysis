import axios from 'axios'

const service =  axios.create({
    baseURL: '/api',
    timeout: 300000
})

export default service
