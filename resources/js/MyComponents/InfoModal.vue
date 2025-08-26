<template>
  <div
    @click="$emit('close')"
    class="fixed top-0 left-0 flex justify-center backdrop-blur items-center h-full w-full z-20">
    <div
      class="mt-10 shadow-2xl p-[1px] rounded-[8px] bg-gradient-to-br from-gray-500 to-gray-200 w-full max-w-96 mx-2">
      <div class="bg-gray-600 pl-4 pr-4 pb-4 pt-2 rounded-[7px]">
        <div class="flex justify-between pb-1">
          <h1 class="text-white font-bold">{{ heading }}</h1>
          <Button
            @click="$emit('toggleGrid')"
            class="h-7 w-7 flex justify-center items-center rounded-full p-0 text-center"
            severity="secondary"
            rounded>
            <i class="pi pi-times-circle text-sm"></i>
          </Button>
        </div>
        <p class="text-sm w-full text-justify text-gray-100">{{ message }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
  import Button from "primevue/button";
  const props = defineProps({ heading: String, message: String });
</script>
<style scoped></style>
