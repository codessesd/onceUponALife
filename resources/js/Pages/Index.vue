<template>
  <div>
    <div class="w-full flex justify-center mt-10">
      <div>
        <img src="/images/logo2.png" width="300px" alt="logo" />
      </div>
    </div>

    <div class="m-auto grid justify-items-center px-4 max-w-[800px]">
      <!-- information panel -->
      <div>
        <p class="text-justify">
          What if you can get a bird's eye view of your life? What if you could
          see how far you've come and how far you have to go?
          <Button
            @click="toggleInfoModal"
            class="inline-block h-7 w-7 justify-center items-center rounded-full p-0 text-center mr-2"
            severity="secondary"
            text
            raised
          >
            <i class="pi pi-question-circle text-sm"></i>
          </Button>
        </p>
      </div>
      <div id="information-panel" class="w-full max-w-[450px] mb-10 mt-10">
        <div class="hidden shadow-lg rounded-lg p-4 mb-10">
          <p class="text-gray-400 text-sm text-justify">
            When you click Go, a grid will show. Each tiny box represents one
            week of a person’s life. One row has 52 boxes representing one year.
            For example: If your life expectancy is 100 years then there would
            be 100 rows with 52 boxes each. If you are 50 years old then 50 rows
            will be coloured orange, representing the life you have lived.
          </p>
        </div>
        <div class="flex-auto w-full">
          <InputGroup
            label="Enter your Date of Birth"
            :subtext="subtextAge"
            :value="yearsLived"
          >
            <Calendar
              v-model="dateOfBirth"
              showIcon
              inputId="buttondisplay"
              dateFormat="dd/mm/yy"
              class="w-full"
            >
            </Calendar>
          </InputGroup>

          <InputGroup
            label="Life expectancy in"
            :subtext="subtextExpectancy"
            :value="lifeExpectancy"
          >
            <Dropdown
              v-model="selectedCountry"
              :options="countries"
              placeholder="Select a country"
              class="w-full"
            >
            </Dropdown>
          </InputGroup>
          <div class="flex w-full justify-end">
            <Button @click="toggleGrid" class="px-16 mt-10">Go</Button>
          </div>
        </div>
      </div>

      <!-- <p class="font-bold text-lg">Life Grid</p> -->
      <div
        v-if="showGrid"
        @click="toggleGrid"
        class="fixed top-0 left-0 w-full h-full justify-center items-center bg-black/60 z-10"
      ></div>
      <Transition>
        <LifeGrid
          v-if="showGrid"
          @toggleGrid="toggleGrid"
          @toggleInfoModal="toggleInfoModal"
          :weeksLived="weeksLived"
          :lifeExpectancy="lifeExpectancy"
        ></LifeGrid>
      </Transition>
      <Transition>
        <InfoModal v-if="showInfoModal" @close="toggleInfoModal"></InfoModal>
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
// import ConfirmDialog from "primevue/confirmdialog";
// import { useConfirm } from "primevue/useconfirm";
// import { useToast } from "primevue/usetoast";

let showInfoModal = ref(false);

function toggleInfoModal() {
  showInfoModal.value = !showInfoModal.value;
}

let showGrid = ref(false);
const toggleGrid = () => {
  showGrid.value = !showGrid.value;
};

const countriesObj = [
  { country: "Rest of the world", allSexes: 73, males: 70, females: 76 },
  { country: "South Africa", allSexes: 65, males: 59, females: 65 },
  { country: "Nigeria", allSexes: 53, males: 53, females: 54 },
  { country: "United States", allSexes: 76, males: 77, females: 82 },
  { country: "Hong Kong", allSexes: 88, males: 83, females: 88 },
  { country: "100 years", allSexes: 100, males: 100, females: 100 },
];

let countries = [];
for (let i = 0; i < countriesObj.length; i++) {
  countries.push(countriesObj[i].country);
}

// let subtextExpectancy = ref("The Life expectancy in Life expectancy is");
// let lifeExpectancy = ref(countriesObj[1].allSexes);
let selectedCountry = ref(countries[1]);

let lifeExpectancy = computed(
  () =>
    countriesObj.find((country) => country.country === selectedCountry.value)
      .allSexes
);

let subtextExpectancy = computed(() =>
  selectedCountry.value === countries[0]
    ? "The Global Life expectancy is"
    : "The Life expectancy in " + selectedCountry.value + " is"
);
// watch(
//   () => selectedCountry.value,
//   (newVal) => {
//     // if (newVal === countries[0])
//     //     subtextExpectancy.value = "The Global Life expectancy is";
//     // else
//     //     subtextExpectancy.value =
//     //         "The Life expectancy in " + newVal + " is";

//     lifeExpectancy.value = countriesObj.find(
//       (country) => country.country === newVal
//     ).allSexes;
//   }
// );

let subtextAge = ref("Your age will show here");
let weeksLived = ref(0);
let yearsLived = ref(0);
let dateOfBirth = ref(new Date());
watch(
  () => dateOfBirth.value,
  (newVal) => {
    const userDOB = new Date(newVal);
    const today = new Date();
    const dateDiffMilliseconds = today - userDOB;
    weeksLived.value = Math.floor(
      dateDiffMilliseconds / (1000 * 60 * 60 * 24 * 7)
    );
    yearsLived.value = Math.floor(weeksLived.value / 52);
  }
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
