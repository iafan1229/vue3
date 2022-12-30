<template>
  <div>
    <ul class="modal">
      <li><img :src="data[press].image" /></li>
      <li>{{ data[press].title }}</li>
      <li>{{ data[press].content }}</li>
      <li>{{ data[press].price }}원</li>
      <li><button @click="$emit('close')">닫기</button></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    data: Array,
    press: Number,
  },
});
</script>
<style lang="scss">
.modal {
  width: 300px;
  min-height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 30px;
  background: #fff;
  border: 1px solid;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
}
</style>
