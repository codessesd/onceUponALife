<template>
  <!-- class="relative min-h-screen overflow-hidden px-6 py-16 sm:py-24 bg-gradient-to-b from-white via-indigo-50 to-white text-slate-800 flex items-center"> -->
  <section class="relative min-h-screen overflow-hidden px-6 py-16 sm:py-24 bg-white text-slate-800 flex items-center">
    <!-- Decorative background (static light palette) -->
    <div class="absolute inset-0 pointer-events-none select-none">
      <!-- <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,1),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(79,70,229,0.15),transparent_60%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.12),transparent_65%)]"></div> -->
      <!-- <div class="absolute -top-32 -left-32 w-[22rem] h-[22rem] bg-pink-300 rounded-full blur-3xl mix-blend-multiply"></div> -->
      <!-- <div class="absolute top-1/3 -right-40 w-[26rem] h-[26rem] bg-indigo-300 rounded-full blur-3xl mix-blend-multiply"></div> -->
      <!-- <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-white rounded-full blur-[110px] mix-blend-multiply"></div> -->
    </div>

    <div class="relative w-full max-w-7xl mx-auto grid gap-14 lg:gap-20 lg:grid-cols-2 items-center">
      <!-- Left column -->
      <div>
        <img src="/images/logo2.png" width="200" alt="Once Upon A Life logo" class="mb-8 drop-shadow" />
        <h1 class="font-semibold tracking-tight leading-tight text-4xl sm:text-5xl md:text-6xl max-w-[14ch] text-slate-900">
          See Your Life In Weeks
        </h1>
        <p class="mt-6 max-w-[55ch] text-sm sm:text-base text-slate-600 leading-relaxed">
          A single perspective canvas: every week you have lived, every week you may yet live. Zoom out, notice the finite rows,
          then choose what to place in the next blank squares.
        </p>
        <ul class="mt-6 flex flex-col gap-2 text-[13px] text-slate-500">
          <li class="flex items-start gap-2"><span class="text-fuchsia-500">•</span><span>Enter your birth date.</span></li>
          <li class="flex items-start gap-2">
            <span class="text-fuchsia-500">•</span><span>Select life expectancy context.</span>
          </li>
          <li class="flex items-start gap-2"><span class="text-fuchsia-500">•</span><span>Reveal the grid & reflect.</span></li>
        </ul>
        <div class="mt-10 flex flex-wrap gap-4">
          <button
            @click="scrollToMain"
            class="group inline-flex items-center gap-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50 px-8 py-3 text-sm font-medium transition shadow-sm">
            Get Started
            <span class="group-hover:translate-y-0.5 transition-transform">↓</span>
          </button>
          <button
            @click="emit('show-info')"
            class="inline-flex items-center gap-2 rounded-full bg-white text-slate-700 hover:bg-slate-50 px-6 py-3 text-sm font-medium transition border border-slate-200 shadow-sm">
            How it works
          </button>
        </div>
      </div>

      <!-- Right column preview -->
      <div class="relative">
        <div
          class="relative mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6 shadow-xl before:absolute before:-inset-px before:rounded-2xl before:bg-[linear-gradient(120deg,rgba(51,76,49,0.2),rgba(99,102,241,0),rgba(16,185,129,0))] before:opacity-40 before:pointer-events-none">
          <p class="text-xs uppercase tracking-wide font-medium text-slate-500 mb-4">Preview</p>
          <div class="preview-grid" aria-hidden="true">
            <div v-for="r in 14" :key="'r' + r" class="flex flex-wrap gap-[2px] mb-[2px]">
              <span
                v-for="c in 30"
                :key="'r' + r + 'c' + c"
                class="week-box"
                :class="r < 7 || (r === 7 && c < 10) ? 'bg-orange-400' : 'bg-slate-300/60'" />
            </div>
          </div>
          <p class="mt-4 text-[11px] leading-relaxed text-slate-600">
            Each square is a week. This is just a tiny sample — the full grid adapts to the expectancy you choose.
          </p>
        </div>
        <div
          class="absolute -inset-4 -z-10 bg-gradient-to-tr from-fuchsia-300/40 via-transparent to-indigo-300/40 blur-2xl rounded-3xl"></div>
      </div>
    </div>

    <div
      class="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-xs text-slate-500 cursor-pointer hidden sm:block"
      @click="scrollToMain">
      Scroll
      <span class="block text-lg leading-none">↓</span>
    </div>
  </section>
</template>

<script setup>
  const emit = defineEmits(["show-info"]);
  function scrollToMain() {
    const el = document.getElementById("main-content");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
</script>

<style scoped>
  .preview-grid {
    font-size: 0;
  }
  .week-box {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  .preview-grid:hover .week-box {
    opacity: 0.85;
  }
  .week-box:hover {
    transform: scale(1.35);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
  }
</style>
