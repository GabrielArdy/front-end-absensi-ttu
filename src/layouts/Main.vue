<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-primary">
        <q-toolbar-title>Absensi App</q-toolbar-title>
        <q-btn flat round icon="notifications" />
        <q-btn flat round icon="logout" />
      </q-toolbar>
    </q-header>
    <!-- <div class="bg-secondary text-nunito q-ma-md q-pt-xl">
      <div class="row q-col-gutter-md">
        <router-view />
      </div>
    </div> -->
    <q-page-container class="bg-secondary text-nunito">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AppLayout'
}
</script>
