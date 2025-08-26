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
          What if you could get a bird's‑eye view of your life? What if you could see how far you've come and how far you still
          have to go? How would you feel? What would you change?
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
    <!-- Perspective video (placed before milestones / averages section) -->
    <section class="mx-auto mt-12 max-w-[850px] px-4">
      <div class="rounded-lg border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
        <h2 class="text-sm font-semibold tracking-wide text-gray-700 uppercase mb-3">Perspective video</h2>
        <p class="text-[11px] text-gray-600 mb-3 leading-relaxed">A short visual reflection on how limited our time is.</p>
        <div class="w-full">
          <div class="relative w-full overflow-hidden rounded-lg shadow aspect-video bg-black">
            <iframe
              class="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/JXeJANDKwDc"
              title="When This Number Hits 5200 - You Will be Dead"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"></iframe>
          </div>
          <p class="mt-2 text-xs font-medium text-gray-700">When This Number Hits 5200 - You Will be Dead</p>
          <p class="mt-1 text-[11px] text-gray-500">Video by Kurzgesagt – In a Nutshell (embedded from YouTube).</p>
        </div>
      </div>
    </section>

    <!-- Milestones / averages section -->
    <section class="mx-auto mt-12 max-w-[850px] px-4">
      <div class="rounded-lg border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
        <h2 class="text-sm font-semibold tracking-wide text-gray-700 uppercase">A sketch of common life chapters</h2>
        <p class="mt-2 text-xs text-gray-600 leading-relaxed">
          See below for an outline of how many people’s lives sometimes flow. It’s not a script. Geography, health, culture,
          economics, identity, and your own choices redraw these lines.
        </p>
        <ul class="mt-4 space-y-2 text-xs text-gray-700">
          <li>
            <span class="font-medium">First breaths (0–4):</span> A blur of firsts. Your brain is wiring at astonishing speed;
            later you’ll remember only scattered flashes. (Those “pre‑remembered” years people reference in reflection pieces like
            <a class="underline" href="https://waitbutwhy.com/2014/05/life-weeks.html" target="_blank" rel="noopener noreferrer"
              >this</a
            >.)
          </li>
          <li>
            <span class="font-medium">Learning to stand in the world (~5–18):</span> School (formal or improvised), friendship
            experiments, forming an inner narrator. Many systems model roughly a dozen primary+secondary school years (see the
            <a class="underline" href="https://en.wikipedia.org/wiki/Education_Index" target="_blank" rel="noopener noreferrer"
              >Education Index</a
            >), but curiosity is never curriculum‑bound.
          </li>
          <li>
            <span class="font-medium">Opening the doors (~18–24):</span> Emerging adulthood: tertiary study, first serious jobs,
            leaving, returning, reshaping identity. Lots feels provisional—and that’s normal.
          </li>
          <li>
            <span class="font-medium">Building & compounding (~25–54):</span> Often the long middle stretch of work, craft,
            partnership building, or reinvention. Labor analysts group a core band here (<a
              class="underline"
              href="https://www.bls.gov/cps/definitions.htm"
              target="_blank"
              rel="noopener noreferrer"
              >BLS definitions</a
            >) but real growth zigzags.
          </li>
          <li>
            <span class="font-medium">First long commitments:</span> Average ages at first marriage now sit in the 20s in some
            countries and low–mid 30s in others (<a
              class="underline"
              href="https://en.wikipedia.org/wiki/List_of_countries_by_age_at_first_marriage"
              target="_blank"
              rel="noopener noreferrer"
              >country list</a
            >). Your timeline is valid even if it looks nothing like an “average.”
          </li>
          <li>
            <span class="font-medium">Welcoming children (if you choose):</span> The global mean age at childbearing hovers in the
            high 20s; many advanced economies cross 30 (<a
              class="underline"
              href="https://en.wikipedia.org/wiki/List_of_countries_by_mean_age_at_childbearing"
              target="_blank"
              rel="noopener noreferrer"
              >data</a
            >). Family can also mean friends, pets, community, or projects.
          </li>
          <li>
            <span class="font-medium">Mid‑course weaving (~late 20s–mid 30s+):</span> For some, partnership + parenting + career
            choices braid together here. Trade‑offs surface. Not choosing everything is how anything deepens.
          </li>
          <li>
            <span class="font-medium">Season of stewardship (55–64):</span> Experience can shift toward mentoring, leadership, or
            pivoting again. Some downshift; others launch new arcs. Variation widens with health, sector, and desire.
          </li>
          <li>
            <span class="font-medium">Longevity chapters (mid 60s+):</span> Many pension ages cluster mid‑60s while average global
            life expectancy sits around the low 70s (<a
              class="underline"
              href="https://en.wikipedia.org/wiki/Life_expectancy"
              target="_blank"
              rel="noopener noreferrer"
              >source</a
            >). Those extra rows of weeks can host second (or third) callings, caregiving, healing, playful curiosity.
          </li>
          <li>
            <span class="font-medium">A quiet check‑in:</span> Which orange (already lived) weeks inside each chapter feel
            under‑celebrated? Which blank ones ahead want protection from autopilot? A single deliberate habit can tint a whole
            future row.
          </li>
        </ul>
        <p class="mt-4 text-[11px] text-gray-500 leading-relaxed">
          Lightly grounded in:
          <a class="underline" href="https://waitbutwhy.com/2014/05/life-weeks.html" target="_blank" rel="noopener noreferrer"
            >Your Life in Weeks</a
          >;
          <a class="underline" href="https://en.wikipedia.org/wiki/Life_expectancy" target="_blank" rel="noopener noreferrer"
            >Life expectancy data</a
          >;
          <a
            class="underline"
            href="https://en.wikipedia.org/wiki/List_of_countries_by_age_at_first_marriage"
            target="_blank"
            rel="noopener noreferrer"
            >Age at first marriage</a
          >;
          <a
            class="underline"
            href="https://en.wikipedia.org/wiki/List_of_countries_by_mean_age_at_childbearing"
            target="_blank"
            rel="noopener noreferrer"
            >Mean age at childbearing</a
          >;
          <a class="underline" href="https://en.wikipedia.org/wiki/Education_Index" target="_blank" rel="noopener noreferrer"
            >Education Index</a
          >;
          <a class="underline" href="https://www.bls.gov/cps/definitions.htm" target="_blank" rel="noopener noreferrer"
            >BLS concepts</a
          >. Figures evolve—use up‑to‑date local statistics for decisions. Your story remains uniquely yours.
        </p>
      </div>
    </section>
  </div>
  <footer class="mt-16 mb-8 text-center text-xs text-gray-500 px-4">
    Concept inspired by
    <a
      href="https://waitbutwhy.com/2014/05/life-weeks.html"
      target="_blank"
      rel="noopener noreferrer"
      class="underline hover:text-gray-700"
      >Tim Urban's “Your Life in Weeks” (Wait But Why)</a
    >.
  </footer>
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
  import { useToast } from "primevue/usetoast";
  // import ConfirmDialog from "primevue/confirmdialog";
  // import { useConfirm } from "primevue/useconfirm";
  // import { useToast } from "primevue/usetoast";

  const showInfoModal = ref(false);
  const headingText = ref("");
  const messageText = ref("");

  const headingStr1 = "How does this work?";
  const headingStr2 = "What this means";
  const messageStr1 =
    "Enter your date of birth and select a life expectancy for any country you like. Click Go to see a chart showing your life as colored blocks within a full lifespan grid.";
  const messageStr2 =
    "Each tiny box is one week of your life, a small moment in your story. A row of 52 boxes forms a year, a chapter of your journey. If your life expectancy is 100 years, the grid stretches out with 100 rows, each holding 52 weeks. The rows that glow orange are the weeks you've already lived, the moments and experiences that have shaped you. Note: A year is about 52 weeks plus 1 day, so you gain roughly one extra week every 7 years, which the chart accounts for.";

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
  const toast = useToast();

  const lifeExpectancy = computed(() => getLifeExpectancyByLabelAndSex(selectedCountry.value, selectedSex.value));

  const subtextExpectancy = computed(() =>
    selectedCountry.value === GLOBAL_LABEL ? "Global life expectancy:" : "Life expectancy in " + selectedCountry.value + ":"
  );

  // Dynamically show age subtext (kept same initial message semantics)
  let subtextAge = computed(() => (yearsLived.value > 0 ? `Your age:` : "Your age will appear here"));
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
        // toast.add({ severity: "warn", summary: "Invalid date", detail: "Please enter a past date.", life: 3000 });
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
