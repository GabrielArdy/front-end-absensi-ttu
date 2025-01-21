<template>
  <q-page class="profile-page">
    <div class="profile-container">
      <div class="profile-header">
        <q-avatar size="120px" class="profile-avatar">
          <q-img
            :src="profile.image"
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
              <q-item-label class="text-weight-bold">{{ profile.name }}</q-item-label>
              <q-item-label caption>Nama Lengkap</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section avatar>
              <q-icon name="badge" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ profile.nip }}</q-item-label>
              <q-item-label caption>Nomor Induk Pegawai</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section avatar>
              <q-icon name="work" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ profile.position }}</q-item-label>
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
export default {
  data () {
    return {
      profile: {
        name: 'John Doe',
        nip: '19220909 2000 34 5',
        position: 'Penata Muda/III B',
        email: 'john.doe@email.com',
        image: 'https://via.placeholder.com/150'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  background-color: #f4f6f9;
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
