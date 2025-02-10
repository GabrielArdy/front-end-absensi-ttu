import api from './conf'
export const GetMonthlyReport = async (token, request) => {
  try {
    const response = await api.post('/api/report/monthly', request, {
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

export const RecordCheckInTime = async (token, request) => {
  try {
    const response = await api.post('/api/attendance/checkin', request, {
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

export const RecordCheckOutTime = async (token, request) => {
  try {
    const response = await api.post('/api/attendance/checkout', request, {
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

export const GetUserData = async (token, teacherId) => {
  try {
    const response = await api.get(`/api/users/${teacherId}`, {
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

export const DownloadExcelReport = async (month, year, flag) => {
  try {
    const response = api.get(`/api/report/export?month=${month}&year=${year}&flag=${flag}`, { responseType: 'blob' })
    return response
  } catch (error) {
    throw error.response?.data || error
  }
}
