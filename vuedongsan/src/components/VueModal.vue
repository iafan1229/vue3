<template>
  <div>
    <ul class="modal">
      <li><img :src="data[press].image" /></li>
      <li>{{ data[press].title }}</li>
      <li>{{ data[press].content }}</li>
      <li>{{ month * data[press].price }}원</li>
      <li>{{ month }}개월</li>
      <li>
        개월: <input type="text" @input="(e) => handleChange(e)" />
        <!-- v-model="month" ?? watch부분을 다 수정해야 함-->
        <button @click="$emit('close')">닫기</button>
      </li>
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
  methods: {
    handleChange(e: InputEvent) {
      const eventTarget = e.target as HTMLInputElement;
      this.month = Number(eventTarget.value);
    },
  },
  data() {
    return {
      month: 1,
    };
  },
  watch: {
    month(data) {
      const regex = /[\b]/;
      const regex2 = /[0-9]/i;
      if (!regex.test(data) && !regex2.test(data)) {
        alert("숫자만 입력하세요");
        this.month = 1;
      }
      if (regex.test(data) && data.length >= 3) {
        alert("두자리 숫자 이상 입력하지 마세요");
        this.month = 1;
      } else if (Number(data) >= 13) {
        alert("12개월 이상 입력하지 마세요.");
        this.month = 1;
      }
    },
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

  img,
  input,
  li {
    width: 100%;
  }
  input {
    width: 80%;
  }
}
</style>
