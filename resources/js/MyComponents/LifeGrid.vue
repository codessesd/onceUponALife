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
    ref="gridContainer"
    class="outer-container w-fit h-full flex flex-col px-2 backdrop-blur-sm shadow-2xl bg-white/80 rounded-lg">
    <!-- Header part of the grid -->
    <div class="">
      <div class="relative">
        <div class="flex justify-center mt-3 mb-2">
          <div class="bg-white/40 rounded-lg shadow-2xl">
            <img src="/images/OnceUponALife_text.png" alt="logo" class="w-[150px] max-[334px]:w-[120px]" />
          </div>
        </div>
        <div class="absolute flex top-0 right-0 gap-1">
          <!-- Export / Share Buttons -->
          <Button
            v-if="canShare"
            @click.stop="sharePng"
            class="h-7 w-7 flex justify-center items-center rounded-full p-0 text-center"
            severity="secondary"
            text
            raised
            v-tooltip.top="'Share'">
            <i class="pi pi-share-alt text-sm"></i>
          </Button>
          <Button
            v-if="canDownload"
            @click.stop="downloadPng"
            class="h-7 w-7 flex justify-center items-center rounded-full p-0 text-center"
            severity="secondary"
            text
            raised
            v-tooltip.top="'Download PNG'">
            <i class="pi pi-download text-sm"></i>
          </Button>
          <Button
            @click.stop="$emit('toggleInfoModal', 'What this means?')"
            class="h-7 w-7 flex justify-center items-center rounded-full p-0 text-center mr-2"
            severity="secondary"
            text
            raised>
            <i class="pi pi-question-circle text-sm"></i>
          </Button>
          <Button
            @click.stop="$emit('toggleGrid')"
            class="h-7 w-7 flex justify-center items-center rounded-full p-0 text-center"
            severity="secondary"
            text
            raised>
            <i class="pi pi-times text-sm"></i>
          </Button>
        </div>
      </div>
      <div class="flex justify-center px-4">
        <p class="text-sm text-justify max-w-[400px]">
          Each block represents one week of your life. Coloured blocks
          <span class="bg-amber-600 rounded-[3px] h-[10px] inline-block min-w-[10px] mt-[6px] shadow-sm"></span> show what you've
          lived, and blank ones show what may still lie ahead with a life expectancy of <b>{{ lifeExpectancy }}</b
          >.
        </p>
      </div>
    </div>

    <!-- The grid itself -->
    <!-- <div class="flex items-center bg-orange-700"> -->
    <div id="the-grid" class="relative mt-5 mb-4 overflow-hidden grow grid grid-cols-[repeat(52,minmax(0,1fr))]">
      <!-- Export loading overlay -->
      <div
        v-if="isExporting"
        class="export-overlay absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
        <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="4" fill="transparent" animationDuration="1.2s" />
        <p class="mt-2 text-xs text-gray-600">Rendering image...</p>
      </div>
      <div id="watermark-tree" class="absolute left-0 top-0 -z-10 h-full flex justify-center items-center">
        <div class="rounded-2xl opacity-20">
          <img src="/images/OnceUponALife_tree_2.png" alt="tree" />
        </div>
      </div>
      <!-- <div class="grid grid-cols-[repeat(52,minmax(0,1fr))]"> -->
      <div
        id="each-box"
        v-for="(week, index) in weekNumber"
        :key="index"
        class="boxes inline-block"
        :class="
          // Distinct colors per life stage (predicates invoked with index)
          // ' bg-green-600 ': babyYears(index), // Early childhood
          // ' bg-amber-500 ': schoolYears(index), // School years
          // ' bg-blue-500 ': universityYears(index), // University
          // ' bg-indigo-500 ': postgraduateYears(index), // Postgraduate
          // ' bg-emerald-600 ': workYears(index), // Working life
          // ' bg-purple-500 ': retirementYears(index), // Retirement
          // ' bg-rose-500 ': oldAgeYears(index), // Old age
          determineStyle(index)
        "></div>
      <!-- </div> -->
    </div>
    <!-- </div> -->
  </div>
</template>
<script setup>
  import { ref, onMounted, nextTick, computed } from "vue";
  import Button from "primevue/button";
  import { toPng } from "html-to-image";
  import { useToast } from "primevue/usetoast";
  import ProgressSpinner from "primevue/progressspinner";

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
  const determineStyle = (index) => {
    if (index >= Props.weeksLived) {
      return "border border-gray-400"; // future weeks
    }

    if (index >= toWeeks(lifeStages.babyYears.min) && index <= toWeeks(lifeStages.babyYears.max)) {
      return lifeStages.babyYears.style;
    }
    if (index >= toWeeks(lifeStages.schoolYears.min) && index <= toWeeks(lifeStages.schoolYears.max)) {
      return lifeStages.schoolYears.style;
    }
    if (index >= toWeeks(lifeStages.universityYears.min) && index <= toWeeks(lifeStages.universityYears.max)) {
      return lifeStages.universityYears.style;
    }
    if (index >= toWeeks(lifeStages.postgraduateYears.min) && index <= toWeeks(lifeStages.postgraduateYears.max)) {
      return lifeStages.postgraduateYears.style;
    }
    if (index >= toWeeks(lifeStages.workYears.min) && index <= toWeeks(lifeStages.workYears.max)) {
      return lifeStages.workYears.style;
    }

    return "bg-gray-300"; // fallback (e.g. beyond workYears)
  };
  const weeksInYear = 52;
  const accurateWeeksInYear = 52;
  let weekNumber = weeksInYear * Props.lifeExpectancy;

  const toWeeks = (value) => Math.floor(weeksInYear * value);
  // Generic range checker (week index is 0-based)
  // function weekInYears(weekIndex, startYearInclusive, endYearExclusive) {
  //   return weekIndex >= startYearInclusive * weeksPerYear && weekIndex < endYearExclusive * weeksPerYear;
  // }

  const lifeStages = {
    babyYears: {
      min: 0,
      max: 6,
      style: "bg-amber-600",
    },
    schoolYears: {
      min: 6,
      max: 19,
      style: "bg-amber-600",
    },
    universityYears: {
      min: 19,
      max: 23,
      style: "bg-amber-600",
    },
    postgraduateYears: {
      min: 23,
      max: 26,
      style: "bg-amber-600",
    },
    workYears: {
      min: 26,
      max: 60,
      style: "bg-amber-600",
    },
    oldAgeYears: {
      min: 60,
      max: 100,
      style: "bg-amber-700",
    },
  };

  // Retirement & old age relative to life expectancy so they adapt dynamically
  function getRetirementStartYear() {
    // Use 60 or (lifeExpectancy - 15) whichever is smaller to avoid negative spans
    return Math.min(60, Math.max(0, Props.lifeExpectancy - 15));
  }
  function getOldAgeStartYear() {
    return Math.max(0, Props.lifeExpectancy - 5);
  }
  const retirementYears = (weekIndex) => weekInYears(weekIndex, getRetirementStartYear(), getOldAgeStartYear());
  const oldAgeYears = (weekIndex) => weekIndex >= getOldAgeStartYear() * weeksPerYear;

  // Export logic
  const gridContainer = ref(null);
  const canShare = ref(false);
  const canDownload = ref(false);
  const isExporting = ref(false);
  onMounted(() => {
    canShare.value = typeof navigator !== "undefined" && !!navigator.share && !!navigator.canShare;
  });

  const toast = useToast();

  async function generatePngBlob() {
    if (!gridContainer.value) return null;
    isExporting.value = true;
    // Let spinner paint
    await nextTick();
    // Two rAFs + a setTimeout(0) fallback to maximize chance of paint before heavy work
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await new Promise((r) => setTimeout(r, 0));
    const commonOptions = {
      cacheBust: true,
      filter: (node) => {
        if (node.tagName === "BUTTON") return false;
        if (node.classList && node.classList.contains("pi-times")) return false;
        if (node.classList && node.classList.contains("export-overlay")) return false;
        return true;
      },
      backgroundColor: "#FFFFFF",
    };
    const attempts = [2, 1];
    for (const pr of attempts) {
      try {
        const dataUrl = await toPng(gridContainer.value, { ...commonOptions, pixelRatio: pr });
        if (pr === 1) {
          toast.add({
            severity: "warn",
            summary: "Lower quality",
            detail: "High-res failed; used standard resolution.",
            life: 3000,
          });
        }
        // Successful render; clear exporting state before returning
        isExporting.value = false;
        return dataUrl;
      } catch (e) {
        console.warn(`PNG export attempt with pixelRatio=${pr} failed`, e);
        if (pr === attempts[attempts.length - 1]) {
          toast.add({
            severity: "error",
            summary: "Export failed",
            detail: "Could not generate image. Try a different browser or reduce size.",
            life: 4000,
          });
        }
      } finally {
        await new Promise((r) => requestAnimationFrame(r));
      }
    }
    isExporting.value = false;
    return null;
  }

  async function downloadPng() {
    if (isExporting.value) return;
    const dataUrl = await generatePngBlob();
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.download = `once-upon-a-life_weeks-lived-${Props.weeksLived}.png`;
    a.href = dataUrl;
    a.click();
    toast.add({ severity: "success", summary: "Downloaded", detail: "Image saved.", life: 2000 });
  }

  async function sharePng() {
    if (isExporting.value) return;
    const dataUrl = await generatePngBlob();
    if (!dataUrl) return;
    if (canShare.value) {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "once-upon-a-life.png", { type: "image/png" });
      try {
        if (navigator.canShare && !navigator.canShare({ files: [file] })) throw new Error("Cannot share file");
        await navigator.share({ title: "Once Upon A Life", text: "My life weeks chart", files: [file] });
        toast.add({ severity: "success", summary: "Shared", detail: "Image sharing initiated.", life: 2000 });
      } catch (err) {
        console.warn("Share failed, falling back to download", err);
        toast.add({ severity: "warn", summary: "Share unavailable", detail: "Falling back to download.", life: 2500 });
        downloadPng();
      }
    } else {
      toast.add({ severity: "info", summary: "Sharing not supported", detail: "Downloading PNG instead.", life: 2500 });
      downloadPng();
    }
  }
</script>

<style scoped>
  .outer-container {
    --boxDimensions: 6px;
    --boxMargin-x: 1px;
    --containerMargins: 20px;
  }
  /* .inner-container {
    width: calc((var(--boxDimensions) + var(--boxMargin-x) * 2) * 52);
    margin-left: var(--containerMargins);
    margin-right: var(--containerMargins);
    margin-bottom: var(--containerMargins);
  } */

  .boxes {
    margin-bottom: 1px;
    border-radius: 2px;
    height: var(--boxDimensions);
    width: var(--boxDimensions);
    margin-left: var(--boxMargin-x);
    margin-right: var(--boxMargin-x);
  }

  @media (max-height: 885px) {
    .outer-container {
      --boxDimensions: 5px;
    }
  }

  @media (max-height: 641px) {
    .outer-container {
      --boxDimensions: 4px;
    }
  }
  /* Notes: Anything less that height 570px may cut some blocks at the bottom */
</style>
