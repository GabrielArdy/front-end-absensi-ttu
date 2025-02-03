<template>
  <q-page class="profile-page">
    <div class="profile-container">
      <div class="profile-header">
        <q-avatar size="120px" class="profile-avatar">
          <q-img
            :src="profile.photoUrl || 'https://via.placeholder.com/120'"
            spinner-color="primary"
            spinner-size="30px"
          />
        </q-avatar>
      </div>

      <div class="profile-content">
        <div class="profile-details">
          <q-item>
            <q-item-section avatar>
              <q-icon name="person" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ profile.displayName }}</q-item-label>
              <q-item-label caption>Nama Lengkap</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section avatar>
              <q-icon name="badge" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ profile.teacherId }}</q-item-label>
              <q-item-label caption>Nomor Induk Pegawai</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section avatar>
              <q-icon name="work" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ profile.grade }}</q-item-label>
              <q-item-label caption>Jabatan</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section avatar>
              <q-icon name="email" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ profile.email }}</q-item-label>
              <q-item-label caption>Email Resmi</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { GetUserData } from 'src/api/attendance'
import { onMounted, ref } from 'vue'

export default {
  name: 'Profile',
  setup () {
    const profile = ref({
      displayName: '',
      email: '',
      photoUrl: '',
      teacherId: '',
      grade: ''
    })
    const token = localStorage.getItem('token')
    const teacherId = localStorage.getItem('teacherId')

    const fetchProfile = async () => {
      try {
        const response = await GetUserData(token, teacherId)
        console.log(response)
        if (response.data.code === 200) {
          // Map the response data to the profile object
          profile.value = {
            displayName: response.data.data.displayName,
            email: response.data.data.email,
            photoUrl: response.data.data.PhotoUrl,
            teacherId: response.data.data.teacherId,
            grade: response.data.data.grade
          }
        } else {
          throw new Error(response.data.message || 'Failed to fetch data')
        }
      } catch (err) {
        console.error(err)
      }
    }

    onMounted(() => {
      fetchProfile()
    })

    return {
      profile
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  background-color: $secondary;
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-avatar {
  border: 3px solid var(--q-primary);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-content {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.profile-details {
  .q-item {
    padding: 12px 16px;
  }

  .q-item-label {
    font-size: 15px;
  }

  .q-item-label[caption] {
    font-size: 12px;
    color: #757575;
  }
}
</style>
