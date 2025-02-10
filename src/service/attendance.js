import { RecordCheckInTime, RecordCheckOutTime } from 'src/api/attendance'
import { GetCurrentTime } from './helper'

export const checkInHandler = async (data) => {
  const time = GetCurrentTime()
  const teacherId = localStorage.getItem('teacherId')

  const payload = {
    teacherId,
    longitude: data.longitude,
    latitude: data.latitude,
    scannedAt: time,
    key: data.key
  }

  const token = localStorage.getItem('token')
  const response = await RecordCheckInTime(token, payload)
  console.log(response)
  return response
}

export const checkOutHandler = async (data) => {
  const time = GetCurrentTime()
  const teacherId = localStorage.getItem('teacherId')

  const payload = {
    teacherId,
    longitude: data.longitude,
    latitude: data.latitude,
    scannedAt: time,
    key: data.key
  }

  console.table(payload)

  const token = localStorage.getItem('token')
  const response = await RecordCheckOutTime(token, payload)
  console.log(response)
  return response
}
