<template>
  <div>
    <div class="w-full flex justify-center mt-10">
      <div>
        <img src="/images/logo2.png" width="300px" alt="logo" />
      </div>
    </div>

    <Transition>
      <InfoModal v-if="showInfoModal" @close="toggleInfoModal" :heading="headingText" :message="messageText"></InfoModal>
    </Transition>

    <div class="m-auto grid justify-items-center px-4 max-w-[800px]">
      <!-- information panel -->
      <div>
        <p class="text-justify">
          What if you can get a bird's eye view of your life? What if you could see how far you've come and how far you have to
          go?
          <Button
            @click="toggleInfoModal(headingStr1, messageStr1)"
            class="inline-block h-7 w-7 justify-center items-center rounded-full p-0 text-center mr-2"
            severity="secondary"
            text
            raised>
            <i class="pi pi-question-circle text-sm"></i>
          </Button>
        </p>
      </div>
      <div id="information-panel" class="w-full max-w-[450px] mb-10 mt-10">
        <div class="hidden shadow-lg rounded-lg p-4 mb-10">
          <p class="text-gray-400 text-sm text-justify">
            When you click Go, a grid will show. Each tiny box represents one week of a person’s life. One row has 52 boxes
            representing one year. For example: If your life expectancy is 100 years then there would be 100 rows with 52 boxes
            each. If you are 50 years old then 50 rows will be coloured orange, representing the life you have lived.
          </p>
        </div>
        <div class="flex-auto w-full">
          <InputGroup label="Enter your Date of Birth" :subtext="subtextAge" :value="yearsLived">
            <Calendar v-model="dateOfBirth" showIcon inputId="buttondisplay" dateFormat="dd/mm/yy" class="w-full"> </Calendar>
          </InputGroup>

          <InputGroup label="Life expectancy in" :subtext="subtextExpectancy" :value="lifeExpectancy">
            <div class="flex flex-wrap gap-2 w-full text-xs">
              <Dropdown
                v-model="selectedCountry"
                :options="countries"
                placeholder="Select a country"
                class="flex-grow min-w-48" />
              <Dropdown v-model="selectedSex" :options="sexOptions" class="min-w-36" />
            </div>
          </InputGroup>
          <div class="flex w-full justify-end">
            <Button @click="toggleGrid" class="px-16 mt-10">Go</Button>
          </div>
        </div>
      </div>

      <Transition>
        <div
          v-if="showGrid"
          @click.stop="toggleGrid"
          class="fixed top-0 left-0 w-full h-full justify-center items-center bg-black/60 z-10">
          <div class="flex h-full justify-center items-center py-3 px-[2px]">
            <LifeGrid
              v-if="showGrid"
              @toggleGrid="toggleGrid"
              @toggleInfoModal="toggleInfoModal(headingStr2, messageStr2)"
              :weeksLived="weeksLived"
              :lifeExpectancy="lifeExpectancy" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup>
  import { computed, ref, watch } from "vue";
  import Calendar from "primevue/calendar";
  import Button from "primevue/button";
  import Dropdown from "primevue/dropdown";
  import InputGroup from "@/MyComponents/InputGroup.vue";
  import LifeGrid from "@/MyComponents/LifeGrid.vue";
  import InfoModal from "@/MyComponents/InfoModal.vue";
  import { differenceInYears, differenceInWeeks, startOfDay } from "date-fns";
  import {
    LIFE_EXPECTANCY_LABELS,
    LIFE_EXPECTANCY_SEX_OPTIONS,
    getLifeExpectancyByLabelAndSex,
  } from "@/data/lifeExpectancyData.js";
  // import ConfirmDialog from "primevue/confirmdialog";
  // import { useConfirm } from "primevue/useconfirm";
  // import { useToast } from "primevue/usetoast";

  const showInfoModal = ref(false);
  const headingText = ref("");
  const messageText = ref("");

  const headingStr1 = "How this works?";
  const headingStr2 = "What this means?";
  const messageStr1 =
    "Enter your date of birth and select a life expectancy for any country you like. Click GO to see a chart showing your life in colored blocks within a full lifespan grid.";
  const messageStr2 =
    "Each tiny box is a week of your life, a small moment in your story. A row of 52 boxes forms a year, one chapter of your journey. If your life expectancy is 100 years, the grid stretches out with 100 rows, each holding 52 weeks. Look at the rows that glow orange — that’s the life you’ve already lived, the moments, choices, and experiences that have shaped you. Note: A year is about 52 weeks plus 1 day, so you gain roughly one extra week every 7 years, which the chart will account for.";

  function toggleInfoModal(text1, text2) {
    showInfoModal.value = !showInfoModal.value;
    headingText.value = text1;
    messageText.value = text2;
  }

  let showGrid = ref(false);
  const toggleGrid = () => {
    showGrid.value = !showGrid.value;
  };

  const countries = LIFE_EXPECTANCY_LABELS;
  const GLOBAL_LABEL = countries[0]; // assumes first entry is global average
  const selectedCountry = ref(GLOBAL_LABEL);
  const sexOptions = LIFE_EXPECTANCY_SEX_OPTIONS;
  const selectedSex = ref(sexOptions[0]);

  const lifeExpectancy = computed(() => getLifeExpectancyByLabelAndSex(selectedCountry.value, selectedSex.value));

  const subtextExpectancy = computed(() =>
    selectedCountry.value === GLOBAL_LABEL
      ? "The Global life expectancy is"
      : "The life expectancy in " + selectedCountry.value + " is"
  );

  // Dynamically show age subtext (kept same initial message semantics)
  let subtextAge = computed(() => (yearsLived.value > 0 ? `Your age is:` : "Your age will show here"));
  let weeksLived = ref(0);
  let yearsLived = ref(0);
  let dateOfBirth = ref(new Date());
  watch(
    () => dateOfBirth.value,
    (newVal) => {
      const dob = startOfDay(new Date(newVal));
      const today = startOfDay(new Date());
      if (dob > today) {
        alert("Please enter a past date");
        return;
      }
      // Use date-fns for precise calendar-aware differences.
      yearsLived.value = differenceInYears(today, dob);
      weeksLived.value = differenceInWeeks(today, dob);
    },
    { immediate: true }
  );
</script>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: bottom 0.5s ease, opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    bottom: -150px;
    opacity: 0;
  }
</style>
