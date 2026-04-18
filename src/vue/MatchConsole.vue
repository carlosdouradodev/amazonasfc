<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  matches: {
    type: Array,
    required: true,
  },
});

const isFinal = (match) => match.status?.toLowerCase() === "finalizado";
const selectedId = ref(props.matches.find((match) => !isFinal(match))?.id ?? props.matches[0]?.id);
const activeMatch = computed(() => props.matches.find((match) => match.id === selectedId.value) ?? props.matches[0]);
const serviceRows = computed(() => [
  ["Competição", activeMatch.value.competition],
  ["Rodada", activeMatch.value.round],
  ["Estádio", activeMatch.value.venue],
  ["Entrada", activeMatch.value.ticket],
  ["Conteúdo", activeMatch.value.channel],
]);
</script>

<template>
  <section class="glass relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 editorial-grid opacity-30"></div>
    <div class="relative grid border-b border-paper/12 lg:grid-cols-[260px_1fr]">
      <div class="border-b border-paper/12 p-5 lg:border-b-0 lg:border-r">
        <p class="text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Match center</p>
        <p class="mt-3 text-sm font-semibold leading-6 text-paper/54">Selecione uma partida para atualizar serviço, estádio e canais.</p>
      </div>
      <div class="grid sm:grid-cols-3">
        <button
          v-for="match in matches"
          :key="match.id"
          type="button"
          class="relative border-b px-5 py-5 text-left transition duration-300 hover:bg-paper/[0.05] sm:border-b-0 sm:border-r"
          :class="[
            match.id === selectedId ? 'border-yellow bg-yellow text-black shadow-[inset_0_-4px_0_rgba(5,4,3,.72)]' : 'border-paper/12 text-paper',
            isFinal(match) && match.id !== selectedId ? 'opacity-48' : ''
          ]"
          @click="selectedId = match.id"
        >
          <span class="block text-[11px] font-extrabold uppercase tracking-[0.14em] opacity-70">{{ match.date }}</span>
          <strong class="mt-3 block text-sm font-extrabold uppercase leading-tight">{{ match.home }} x {{ match.away }}</strong>
          <span class="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase opacity-70">
            <span>{{ match.competition }}</span>
            <span class="h-px w-5 bg-current opacity-40"></span>
            <span>{{ match.status }}</span>
          </span>
        </button>
      </div>
    </div>

    <transition name="match-fade" mode="out-in">
      <div :key="activeMatch.id" class="relative grid gap-8 p-6 md:p-8">
        <div>
          <p
            class="w-fit border px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em]"
            :class="isFinal(activeMatch) ? 'border-paper/14 text-paper/42' : 'border-yellow bg-yellow text-black'"
          >
            {{ activeMatch.status }}
          </p>
          <h3 class="display mt-4 text-[clamp(44px,6.4vw,82px)] leading-[0.9]">
            {{ activeMatch.home }} x {{ activeMatch.away }}
          </h3>
          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            <span class="border border-paper/14 bg-black/36 px-4 py-3 text-xs font-extrabold uppercase text-paper/72">
              {{ activeMatch.date }}
            </span>
            <span class="border border-paper/14 bg-black/36 px-4 py-3 text-xs font-extrabold uppercase text-paper/72">
              {{ activeMatch.time }}
            </span>
            <span class="border border-paper/14 bg-black/36 px-4 py-3 text-xs font-extrabold uppercase text-paper/72">
              {{ activeMatch.venue }}
            </span>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div v-for="[label, value] in serviceRows" :key="label" class="border-t border-paper/12 pt-4">
            <span class="block text-[11px] font-extrabold uppercase tracking-[0.14em] text-paper/42">{{ label }}</span>
            <strong class="mt-2 block text-sm font-extrabold uppercase leading-tight text-paper">{{ value }}</strong>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <a class="rounded-[8px] bg-yellow px-5 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.08em] text-black transition duration-300 hover:-translate-y-0.5 hover:bg-yellow-soft" href="https://socioamazonas.com.br/" target="_blank" rel="noreferrer">
            Check-in sócio
          </a>
          <a class="rounded-[8px] border border-paper/20 bg-paper/[0.02] px-5 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.08em] text-paper/74 transition duration-300 hover:-translate-y-0.5 hover:border-yellow hover:text-yellow" href="https://www.youtube.com/channel/UCmbbvZoJZeZWPEFXAoWmrjw" target="_blank" rel="noreferrer">
            TV Onça
          </a>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.match-fade-enter-active,
.match-fade-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.match-fade-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.99);
}

.match-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.99);
}
</style>
