import api from './conf'
export const getDashboardUser = async (token, teacherId) => {
  try {
    const response = await api.post('/api/dashboard/', { teacherId }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    throw error.response?.data || error
  }
}
