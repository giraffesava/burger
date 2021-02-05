import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-d3810-default-rtdb.firebaseio.com/' //from farebase-realtime database
})

export default instance