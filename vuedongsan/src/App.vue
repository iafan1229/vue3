<template>
  <div>
    <ul class="list">
      <li v-for="(a, i) in list" :key="i">
        <img :src="list[i].image" />
        <span class="title" @click="handleClick(i)">{{ list[i].title }}</span>
        <span>price: {{ list[i].price }}</span>
        <span>신고수: {{ alarm[i] }}</span>
        <button @click="increase(i)">증가</button>
      </li>
    </ul>
    <vueModal
      :data="list"
      :press="press"
      @close="show = false"
      class="modalShow"
      :class="{ active: show }"
    />
  </div>
</template>
:class="{ active: show }" v-if="show"
<script lang="ts">
import { defineComponent } from "vue";
import list from "./assets/data";
import vueModal from "./components/VueModal.vue";

export default defineComponent({
  data() {
    return {
      press: 0,
      show: false,
      alarm: Array(6).fill(0),
      list,
    };
  },
  methods: {
    increase(i: number) {
      this.alarm[i] += 1;
    },
    handleClick(i: number) {
      (this.press = i), (this.show = true);
    },
  },
  components: {
    vueModal,
  },
});
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  > li {
    width: calc(100% / 3 - 30px);
    text-align: center;
    img {
      width: 100%;
    }
    span {
      &.title {
        color: rgb(111, 110, 110);
        cursor: pointer;
      }
      display: block;
      text-align: center;
    }
  }
}
.modalShow {
  opacity: 0;
  transition: all 1s;
}
.active {
  opacity: 1;
}
</style>
