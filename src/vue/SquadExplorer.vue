<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  squad: {
    type: Array,
    required: true,
  },
});

const query = ref("");
const position = ref("Todos");
const positions = computed(() => ["Todos", ...new Set(props.squad.map((player) => player.position))]);
const filteredSquad = computed(() =>
  props.squad.filter((player) => {
    const positionMatch = position.value === "Todos" || player.position === position.value;
    const searchMatch = player.name.toLowerCase().includes(query.value.toLowerCase());
    return positionMatch && searchMatch;
  }),
);
</script>

<template>
  <section>
    <div class="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
      <input
        v-model="query"
        class="h-14 border border-paper/14 bg-paper/[0.04] px-5 text-sm font-bold text-paper outline-none transition placeholder:text-paper/38 focus:border-yellow"
        placeholder="Buscar atleta"
      />
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in positions"
          :key="item"
          type="button"
          class="rounded-[4px] px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] transition"
          :class="item === position ? 'bg-yellow text-black' : 'border border-paper/16 text-paper/68 hover:border-yellow hover:text-yellow'"
          @click="position = item"
        >
          {{ item }}
        </button>
      </div>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="player in filteredSquad"
        :key="player.id"
        class="group overflow-hidden border border-paper/12 bg-ink/72 transition duration-300 hover:-translate-y-1 hover:border-yellow/70"
      >
        <div class="relative overflow-hidden">
          <img class="aspect-[0.86] w-full object-cover object-top transition duration-500 group-hover:scale-105" :src="player.image" alt="" />
          <span class="display absolute left-4 top-4 text-6xl text-yellow/90">{{ player.number }}</span>
        </div>
        <div class="p-5">
          <p class="text-[11px] font-extrabold uppercase tracking-[0.14em] text-yellow">{{ player.position }}</p>
          <h2 class="display mt-3 text-4xl leading-none">{{ player.name }}</h2>
          <p class="mt-3 text-sm font-bold text-paper/54">Pé {{ player.foot }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
