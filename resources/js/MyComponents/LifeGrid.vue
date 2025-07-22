<template>
  <!-- Dimensions of the-grid and the blocks need to be precisely calculated so that 52 blocks fit in one row.
    Look at the scoped css for this.
    Example: If each block is 5px wide and has margin-left 1px and margin-right 1px,
    then 52 blocks would be (1px + 5px + 1px) * 52 = 364px wide.
    Therefore the inner container must be 364px wide.

    When making the grid resposinve you must consider the width of the outer container which is made of
    (inner container width) + (outer container padding left and right).
   -->
  <div
    class="outer-container fixed bottom-2 left-auto z-20 backdrop-blur-sm shadow-2xl bg-white/80 rounded-lg"
  >
    <!-- Header part of the grid -->
    <div class="mb-3 inner-container">
      <div class="relative">
        <div class="flex justify-center mt-3 mb-2">
          <div class="bg-white/40 rounded-lg shadow-2xl">
            <img
              src="/images/OnceUponALife_text.png"
              alt="logo"
              class="w-[150px] max-[334px]:w-[120px]"
            />
          </div>
        </div>
        <div class="absolute flex top-0 right-0">
          <Button
            @click="togg"
            class="h-7 w-7 flex justify-center items-center rounded-full p-0 text-center mr-2"
            severity="secondary"
            text
            raised
          >
            <i class="pi pi-question-circle text-sm"></i>
          </Button>
          <Button
            @click="$emit('toggleGrid')"
            class="h-7 w-7 flex justify-center items-center rounded-full p-0 text-center"
            severity="secondary"
            text
            raised
          >
            <i class="pi pi-times text-sm"></i>
          </Button>
        </div>
      </div>
      <div class="flex justify-center text-center">
        <div
          class="bg-amber-600 h-[10px] min-w-[10px] mt-[6px] shadow-sm"
        ></div>
        <p class="text-sm">
          = Number of weeks you have lived if you live to be
          <b>{{ lifeExpectancy }}</b> years
        </p>
      </div>
    </div>

    <!-- The grid itself -->
    <div
      id="the-grid"
      class="relative inner-container bg-gray-100/0 flex flex-wrap rounded-lg m-auto"
    >
      <div
        id="watermark-tree"
        class="absolute left-0 top-0 -z-10 h-full flex justify-center items-center"
      >
        <div class="rounded-2xl opacity-20">
          <img src="/images/OnceUponALife_tree_2.png" alt="tree" />
        </div>
      </div>
      <div
        id="each-box"
        v-for="(week, index) in weekNumber"
        :key="index"
        class="boxes inline-block mb-[1px]"
        :class="{
          ' bg-amber-600 ': index + 1 <= weeksLived,
          ' border border-gray-600 ': index + 1 > weeksLived,
        }"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onUnmounted } from "vue";
import Button from "primevue/button";

const Props = defineProps({
  weeksLived: {
    type: Number,
    default: 0,
  },
  lifeExpectancy: {
    type: Number,
    default: 73,
  },
});
const emit = defineEmits(["toggleGrid", "toggleInfoModal"]);
function togg() {
  emit("toggleInfoModal");
}

const weeksInYear = ref(52);
let weekNumber = weeksInYear.value * Props.lifeExpectancy;
</script>

<style scoped>
.outer-container {
  --boxDimensions: 5px;
  --boxMargin-x: 1px;
  --containerMargins: 20px;
  /* top: 100px;  */
}
.inner-container {
  width: calc((var(--boxDimensions) + var(--boxMargin-x) * 2) * 52);
  margin-left: var(--containerMargins);
  margin-right: var(--containerMargins);
  margin-bottom: var(--containerMargins);
}

.boxes {
  margin-bottom: 1px;
  height: var(--boxDimensions);
  width: var(--boxDimensions);
  margin-left: var(--boxMargin-x);
  margin-right: var(--boxMargin-x);
}

/* @media (max-height: 732px) {
  .outer-container {
    top: 20px;
  }
} */

@media (max-width: 404px) {
  .outer-container {
    --boxDimensions: 4px;
    --containerMargins: 10px;
  }
}

@media (max-width: 334px) {
  .outer-container {
    --boxDimensions: 3px;
  }
}
</style>
