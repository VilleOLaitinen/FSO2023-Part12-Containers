import axios from 'axios'
const baseUrl = process.env.REACT_APP_BACKEND_URL 
//'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const delet = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const exportObject = { getAll, add, delet, update }

export default exportObject