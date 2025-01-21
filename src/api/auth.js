import api from './conf'
export const loginWithCredentials = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error.response?.data || error
  }
}

export const getClaims = async (token) => {
  try {
    const response = await api.post('/api/auth/claims', { token })
    return response
  } catch (error) {
    throw error.response?.data || error
  }
}
