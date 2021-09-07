import ApiClient from './client'

const apiUrl = process.env.NEXT_PUBLIC_HOST_URL

const apiClient = new ApiClient(apiUrl)

export default apiClient
