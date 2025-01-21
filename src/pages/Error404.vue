<template>
  <div class="error-page flex flex-center">
    <div class="error-container text-center">
      <div class="error-illustration">
        <q-img
          src="~/assets/404-illustration.svg"
          alt="404 Not Found"
          spinner-color="primary"
          class="illustration-image"
        />
      </div>

      <div class="error-content">
        <h1 class="error-code">404</h1>
        <p class="error-message">
          Halaman Tidak Ditemukan
        </p>
        <p class="error-description">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>

        <div class="error-actions q-mt-lg">
          <q-btn
            color="primary"
            text-color="white"
            label="Kembali ke Beranda"
            icon-right="home"
            to="/"
            no-caps
            rounded
            size="lg"
            class="action-button"
          />

          <q-btn
            outline
            color="primary"
            label="Bantuan"
            icon-right="help_outline"
            @click="openHelpCenter"
            no-caps
            rounded
            size="lg"
            class="action-button q-ml-md"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorNotFound',
  methods: {
    openHelpCenter () {
      // Implementasi navigasi ke pusat bantuan atau kontak
      this.$router.push('/help')
    }
  }
}
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.error-container {
  max-width: 600px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 40px 30px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }
}

.error-illustration {
  max-width: 300px;
  margin: 0 auto 30px;
}

.illustration-image {
  width: 100%;
  height: auto;
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  color: #3f51b5;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.error-message {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 600;
}

.error-description {
  color: #7f8c8d;
  margin-bottom: 30px;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-button {
  min-width: 180px;
}

// Responsive adjustments
@media (max-width: 600px) {
  .error-container {
    padding: 20px 15px;
  }

  .error-code {
    font-size: 4rem;
  }

  .error-message {
    font-size: 1.2rem;
  }

  .error-actions {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
    margin-left: 0 !important;
    margin-top: 10px;
  }
}
</style>
