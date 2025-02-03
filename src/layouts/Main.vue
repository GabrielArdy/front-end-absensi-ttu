<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-primary">
        <q-toolbar-title>SIGAP</q-toolbar-title>
        <q-btn flat round icon="notifications" />
        <q-btn flat round icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>
    <q-footer elevated>
        <q-toolbar class="bg-white text-primary flex flex-center">
          <q-tabs class="text-grey-0">
            <q-route-tab to="/report" name="report" icon="eva-calendar-outline" label="Report"/>
            <q-route-tab to="/home" class="q-mx-lg" name="home" icon="eva-home-outline" label="Home" />
            <q-route-tab to="/profile" name="profile" icon="eva-person-outline" label="Profile" />
          </q-tabs>
        </q-toolbar>
      </q-footer>
    <q-page-container class="bg-secondary text-nunito">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AppLayout',
  methods: {
    logout () {
      // revome all local storage
      localStorage.clear()
      this.$router.push('/') // Arahkan ke halaman login
    }
  }
}
</script>
