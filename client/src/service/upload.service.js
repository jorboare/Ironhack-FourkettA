import axios from 'axios'

export default class FilesService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'https://fourketta-api.herokuapp.com/api',
            withCredentials: true
        })
    }

    uploadImage = imageForm => this.apiHandler.post('/files/upload', imageForm)
}