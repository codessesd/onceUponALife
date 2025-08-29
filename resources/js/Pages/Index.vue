<template>
  <div>
    <LandingHero @show-info="toggleInfoModal(headingStr1, messageStr1)" />

    <!-- Main interactive content -->
    <div id="main-content" class="">
      <!-- (Removed duplicated logo previously shown in hero) -->

      <Transition>
        <InfoModal v-if="showInfoModal" @close="toggleInfoModal" :heading="headingText" :message="messageText"></InfoModal>
      </Transition>

      <section id="calculator-section" class="relative flex justify-center items-center min-h-screen px-3 grain-bg">
        <!-- <div class="border h-screen w-full bg-red-200 rounded-lg"> -->
        <!-- information panel -->
        <!-- <div>
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
        </div> -->
        <div id="information-panel" class="relative w-full max-w-[560px] mb-10 mt-10">
          <div
            class="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur shadow-[0_6px_28px_-8px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5 transition-all duration-500 hover:shadow-[0_8px_34px_-6px_rgba(15,23,42,0.35)]">
            <!-- Decorative gradient / pattern layer -->
            <div
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay [background:radial-gradient(circle_at_18%_20%,rgba(56,189,248,.28),transparent_60%),radial-gradient(circle_at_82%_70%,rgba(167,139,250,.28),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(252,211,77,.22),transparent_60%)]"></div>

            <div class="relative p-6">
              <header class="flex items-start gap-3">
                <div
                  class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-400/90 via-white-400/80 to-green-700/80 text-white shadow-md shadow-sky-500/30">
                  <i class="pi pi-calendar text-base"></i>
                  <span
                    class="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-slate-700 shadow ring-1 ring-slate-900/5"
                    >?%</span
                  >
                </div>
                <div class="flex-1">
                  <h2 class="text-sm font-semibold tracking-wide text-slate-800 uppercase">Your Life Snapshot</h2>
                  <p class="mt-1 text-[11px] leading-relaxed text-slate-600">
                    Pick a date of birth & a life expectancy context. Then press <span class="font-medium">Go</span> to view every
                    week of your chosen span—colored for the time you've already lived.
                  </p>
                </div>
              </header>

              <!-- Progress visual -->
              <!-- background: 'conic-gradient(red 30%, green 30%, green 70%)', -->
              <div class="mt-6 flex flex-wrap items-center gap-5">
                <div class="relative h-24 w-24 hidden">
                  <div
                    class="absolute inset-0 rounded-full"
                    :style="{
                      background: 'conic-gradient(' + progressColor + ' ' + lifeProgress + '%, #e2e8f0 ' + lifeProgress + '%)',
                    }"></div>
                  <div
                    class="absolute inset-[6px] rounded-full bg-white 0 backdrop-blur flex flex-col items-center justify-center text-[11px] font-semibold text-slate-700">
                    <span>{{ lifeProgress }}%</span>
                    <span class="mt-[2px] text-[9px] font-normal tracking-wide text-slate-500">lived</span>
                  </div>
                </div>
                <div class="flex-1 text-xs leading-relaxed">
                  <p>
                    <span class="font-semibold">{{ yearsLived }}</span>
                    yrs (~{{ weeksLived.toLocaleString() }} wks) lived
                  </p>
                  <p>
                    <span class="font-semibold">
                      {{ lifeExpectancy }}
                    </span>
                    yrs (~{{ lifeExpectancy * 52 }} wks) Life expectancy chosen
                  </p>
                  <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      class="h-full rounded-full transition-[width,background] duration-500"
                      :class="{
                        'bg-emerald-400': lifeProgress < 34,
                        'bg-sky-400': lifeProgress >= 34 && lifeProgress < 67,
                        'bg-rose-400': lifeProgress >= 67,
                      }"
                      :style="{ width: lifeProgress + '%' }"></div>
                  </div>
                  <p class="mt-1 text-[10px] text-slate-500">
                    A bar summary of your chosen expectancy. Adjust inputs to explore different outlooks.
                    <!-- A ring + bar summary of your chosen expectancy. Adjust inputs to explore different outlooks. -->
                  </p>
                </div>
              </div>

              <div class="mt-8 flex-auto w-full">
                <InputGroup
                  label="Enter your Date of Birth"
                  :subtext="subtextAge"
                  :value="yearsLived"
                  class="bg-slate-50/70 p-3 rounded-lg ring-1 ring-inset ring-slate-200 focus-within:ring-sky-300/70 transition">
                  <Calendar
                    v-model="dateOfBirth"
                    showIcon
                    inputId="buttondisplay"
                    iconDisplay="input"
                    dateFormat="dd/mm/yy"
                    class="w-full">
                  </Calendar>
                </InputGroup>

                <InputGroup
                  label="Life expectancy in"
                  :subtext="subtextExpectancy"
                  :value="lifeExpectancy"
                  class="bg-slate-50/70 p-3 rounded-lg mt-6 ring-1 ring-inset ring-slate-200 focus-within:ring-fuchsia-300/60 transition">
                  <div class="flex flex-wrap gap-2 w-full text-xs">
                    <Dropdown
                      v-model="selectedCountry"
                      :options="countries"
                      placeholder="Select a country"
                      class="flex-grow min-w-48" />
                    <Dropdown v-model="selectedSex" :options="sexOptions" class="min-w-36" />
                  </div>
                </InputGroup>

                <div class="flex gap-2 w-full justify-end">
                  <Button
                    @click="dateOfBirth = new Date()"
                    class="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-lg bg-slate-800 px-16 py-3 text-sm font-medium text-white shadow hover:bg-slate-800/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                    <span
                      class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_30%_20%,rgba(56,189,248,.5),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(167,139,250,.5),transparent_55%)]"></span>
                    <i class="pi pi-play text-xs"></i>
                    Clear
                  </Button>

                  <Button
                    @click="toggleGrid"
                    class="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-lg bg-slate-800 px-16 py-3 text-sm font-medium text-white shadow hover:bg-slate-800/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                    <span
                      class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_30%_20%,rgba(56,189,248,.5),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(167,139,250,.5),transparent_55%)]"></span>
                    <i class="pi pi-play text-xs"></i>
                    Go
                  </Button>
                </div>
              </div>
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
        <!-- </div> -->
      </section>

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
              later you’ll remember only scattered flashes. (Those “pre‑remembered” years people reference in reflection pieces
              like
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
              <span class="font-medium">Welcoming children (if you choose):</span> The global mean age at childbearing hovers in
              the high 20s; many advanced economies cross 30 (<a
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
              <span class="font-medium">Season of stewardship (55–64):</span> Experience can shift toward mentoring, leadership,
              or pivoting again. Some downshift; others launch new arcs. Variation widens with health, sector, and desire.
            </li>
            <li>
              <span class="font-medium">Longevity chapters (mid 60s+):</span> Many pension ages cluster mid‑60s while average
              global life expectancy sits around the low 70s (<a
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
  </div>
  <footer class="mt-16 mb-8 text-center text-xs text-gray-500 px-4 space-y-1">
    <p>
      Concept inspired by
      <a
        href="https://waitbutwhy.com/2014/05/life-weeks.html"
        target="_blank"
        rel="noopener noreferrer"
        class="underline hover:text-gray-700"
        >Tim Urban's “Your Life in Weeks” (Wait But Why)</a
      >.
    </p>
    <p>
      Website designed & developed by
      <a
        href="https://obscode.co.za"
        target="_blank"
        rel="noopener"
        class="font-medium underline decoration-dotted hover:text-gray-700"
        >OBSCODE</a
      >.
    </p>
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
  import LandingHero from "@/MyComponents/LandingHero.vue";
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

  // scrollToMain now handled inside LandingHero component

  const headingStr1 = "How does this work?";
  const headingStr2 = "What this means";
  const messageStr1 =
    "Below is form to enter your date of birth and select a life expectancy for any country you like. Click Go to see a chart showing your life as colored blocks within a full lifespan grid.";
  const messageStr2 =
    "Each tiny box is one week of your life, a small moment in your story. A row of 52 boxes forms a year, a chapter of your journey. If your life expectancy is 100 years, the grid stretches out with 100 rows, each holding 52 weeks. The rows that glow orange are the weeks you've already lived, the moments and experiences that have shaped you.";

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

  // Derived metrics for the information panel visualization
  const remainingYears = computed(() => (lifeExpectancy.value ? lifeExpectancy.value - yearsLived.value : 0));
  const totalWeeksExpected = computed(() => (lifeExpectancy.value ? lifeExpectancy.value * 52 : 0));
  const lifeWeeksLeft = computed(() => (totalWeeksExpected.value ? totalWeeksExpected.value - weeksLived.value : 0));
  const lifeProgress = computed(() => {
    if (!lifeExpectancy.value || lifeExpectancy.value <= 0) return 0;
    const pct = Math.min(100, Math.max(0, (weeksLived.value / (lifeExpectancy.value * 52)) * 100));
    return Math.round(pct);
  });
  const progressColor = computed(() => {
    if (lifeProgress.value < 34) return "#34d399"; // emerald
    if (lifeProgress.value < 67) return "#38bdf8"; // sky
    return "#fb7185"; // rose
  });
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

  /* Hero styles moved into LandingHero component */
</style>
<style scoped>
  /* Subtle grained / textured background for calculator section */
  .grain-bg {
    background: #e2e8f0;
    background-image: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 60%, #dde3ea 100%);
  }
  .grain-bg::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    /* Layered light spots + fine grid + SVG noise */
    background-image: radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.65), transparent 60%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.45), transparent 65%),
      /* Wider spaced micro grid */
        repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.015), rgba(0, 0, 0, 0.015) 1px, transparent 1px, transparent 4px),
      repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.015), rgba(0, 0, 0, 0.015) 1px, transparent 1px, transparent 4px),
      /* Softer noise (lower baseFrequency + alpha) */
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'><filter id='n' x='0' y='0'><feTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='linear' slope='0.05'/></feComponentTransfer></filter><rect width='220' height='220' filter='url(%23n)'/></svg>");
    background-blend-mode: overlay, overlay, normal, normal, normal;
    opacity: 0.75; /* slightly lighter overall */
    mix-blend-mode: multiply;
  }
</style>
