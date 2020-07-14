<template>
  <div id="app">
 <div class="h-100vh container">
    <div class="d-flex align-items-center justify-content-center pt-0 mt-1">
         <div class="row w-60 text-center mw-100">
      <router-view />
    </div>
    
  </div>
  
 </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>