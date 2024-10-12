import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

let token = null

const setToken = newToken =>{
    token =  `Bearer ${newToken}`
}

const getAll = () =>{
    return axios.get(baseUrl)
}

const delPerson = (id) =>{
    const config = {
        headers:{
          authorization: token 
        }}
    return axios.delete(`${baseUrl}/${id}`, config)
}

const updatePerson = (id, personObject )=>{
    const config = {
        headers:{
          authorization: token 
        }}
    return axios.put(`${baseUrl}/${id}`, personObject, config)
}

const create = (personObject ) => {
    const config = {
        headers:{
          authorization:  token 
        }}
    return axios.post(baseUrl, personObject, config)
  }




export default {getAll, delPerson, updatePerson, create, setToken}