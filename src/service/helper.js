export const GetCurrentPosition = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
    }

    const opt = {
      enableHighAccuracy: false,
      timeout: 3000,
      maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition((position) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }, (error) => {
      let message = 'Location error'
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = 'Please enable location access'
          break
        case error.POSITION_UNAVAILABLE:
          message = 'Location unavailable'
          break
        case error.TIMEOUT:
          message = 'Location request timeout'
          break
      }
      reject(new Error(message))
    }, opt)
  })
}

export const GetCurrentTime = () => {
  const now = new Date()

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
  // Get date in YYYY-MM-DD format
  const date = now.toLocaleDateString('en-CA', options)
  // Get time in HH:MM:SS format
  const time = now.getHours().toString().padStart(2, '0') + ':' +
              now.getMinutes().toString().padStart(2, '0') + ':' +
              now.getSeconds().toString().padStart(2, '0')
  // Combine date and time
  return `${date} ${time}`
}
