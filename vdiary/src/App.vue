<template>
<div>hello {{ a }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "@vue/runtime-core";
const a = ref(3);
onMounted(()=>{
  console.log('hi') 
  a.value=4;
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
