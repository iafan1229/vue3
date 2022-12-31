<template>
  <div>
    <div class="discount">
      <h1>오늘 결제하면 {{ discount }}% 할인</h1>
    </div>
    <div class="sort">
      <button @click="handlePrice">낮은 가격순으로 보기</button>
      <button @click="list = [...sortBack]">원래 가격으로 되돌리기</button>
      <button @click="handleSort">abc순 정렬</button>
    </div>
    <ul class="list">
      <li v-for="(a, i) in list" :key="i">
        <img :src="list[i].image" />
        <span class="title" @click="handleClick(i)">{{ list[i].title }}</span>
        <span>price: {{ list[i].price }}</span>
        <span>신고수: {{ alarm[i] }}</span>
        <button @click="increase(i)">증가</button>
      </li>
    </ul>
    <transition name="fade">
      <vueModal :data="list" :press="press" @close="show = false" v-if="show" />
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import list from "./assets/data";
import vueModal from "./components/VueModal.vue";

export default defineComponent({
  data() {
    return {
      discount: 30,
      list: [...list],
      sortBack: [...list],
      press: 0,
      show: false,
      alarm: Array(6).fill(0),
      timerFunc: 0,
    };
  },
  methods: {
    increase(i: number) {
      this.alarm[i] += 1;
    },
    handleClick(i: number) {
      (this.press = i), (this.show = true);
    },
    handlePrice() {
      this.list.sort(
        (a: { price: number }, b: { price: number }) => a.price - b.price
      );
    },
    handleSort() {
      this.list = [...this.sortBack].sort((a, b) =>
        a.title < b.title ? -1 : 1
      );
    },
  },
  components: {
    vueModal,
  },
  mounted() {
    this.timerFunc = setInterval(() => {
      this.discount -= 1;
    }, 1000);
  },
  updated() {
    if (this.discount == 0) clearInterval(this.timerFunc);
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
.discount {
  background: lightgray;
  text-align: center;
  height: 50px;
  line-height: 50px;
  h1 {
    font-size: 20px;
  }
}
.sort {
  padding: 10px 0;
  button {
    margin-right: 10px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
