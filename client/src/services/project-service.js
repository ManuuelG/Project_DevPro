import create from 'services/http-service'
import apiClient from './api-client'

const endpoint = '/projects'

const projectService = create(endpoint)

projectService.addFav = id => apiClient.put(`${endpoint}/favorites/${id}`)
projectService.getFav = () => apiClient.get(`${endpoint}/favorites`)

export default projectService
