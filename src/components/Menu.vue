<template>
<div>
    <ul class="nav account-nav-footer">
        <li class="nav-item w-50">
            <a class="nav-link position-relative clr1" @click="$router.push('/')" href="javascript:;">
              <i class="fas fa-home fnt-20 "></i><br/>
              <span class="fnt-12">Home</span>
            </a>
        </li>

         <li class="nav-item w-50">
            <a class="nav-link position-relative clr1" @click="$router.push('/add-record')" href="javascript:;">
              <i class="fas fa-pen fnt-20 "></i><br/>
              <span class="fnt-12">Add Record</span>
            </a>
        </li>                              
    </ul>
</div>
</template>
<script>
  export default {
    name: 'menu',
  }
</script>
                     