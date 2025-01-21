import api from './conf'
export const GetMonthlyReport = async (token, teacherId, month, year) => {
  try {
    const response = await api.post('/api/attendance/monthly', { teacherId, month, year }, {
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
