<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  plans: {
    type: Array,
    required: true,
  },
});

const displayPlans = computed(() => [...props.plans].reverse());
const selectedId = ref(displayPlans.value[0]?.id ?? props.plans[0]?.id);
const wantsStore = ref(true);
const wantsExperiences = ref(false);
const selectedPlan = computed(() => props.plans.find((plan) => plan.id === selectedId.value) ?? props.plans[0]);
const total = computed(() => selectedPlan.value.price + (wantsStore.value ? 12 : 0) + (wantsExperiences.value ? 18 : 0));
</script>

<template>
  <section class="glass relative overflow-hidden p-5 md:p-6">
    <div class="pointer-events-none absolute inset-0 editorial-grid opacity-25"></div>
    <div class="relative grid gap-3 sm:grid-cols-3">
      <button
      v-for="plan in displayPlans"
      :key="plan.id"
      type="button"
        class="relative min-w-0 overflow-hidden border p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-yellow"
        :class="plan.id === selectedId ? 'border-yellow bg-yellow text-black' : 'border-paper/12 bg-paper/[0.025] text-paper'"
        @click="selectedId = plan.id"
      >
        <span class="block text-[11px] font-extrabold uppercase tracking-[0.14em] opacity-70">{{ plan.priority }}</span>
        <strong class="display mt-4 block break-words text-[clamp(28px,2.5vw,40px)] leading-none">{{ plan.name }}</strong>
        <span class="mt-5 block text-sm font-extrabold">R$ {{ plan.price.toFixed(2).replace('.', ',') }}</span>
        <span v-if="plan.id === selectedId" class="absolute bottom-0 left-0 h-1 w-full bg-black/70"></span>
      </button>
    </div>

    <div class="relative mt-7 grid gap-6 lg:grid-cols-[1fr_240px]">
      <div>
        <p class="text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Benefícios incluídos</p>
        <ul class="mt-5 grid gap-3">
          <li v-for="benefit in selectedPlan.benefits" :key="benefit" class="flex items-center gap-3 border-b border-paper/10 pb-3 text-sm font-bold text-paper/72">
            <span class="h-2 w-2 bg-yellow"></span>
            {{ benefit }}
          </li>
        </ul>
        <div class="mt-6 grid gap-3">
          <label class="flex cursor-pointer items-center justify-between border border-paper/12 bg-black/24 p-4 text-sm font-bold text-paper/72 transition hover:border-yellow/70">
            Desconto extra na loja
            <input v-model="wantsStore" class="h-5 w-5 accent-yellow" type="checkbox" />
          </label>
          <label class="flex cursor-pointer items-center justify-between border border-paper/12 bg-black/24 p-4 text-sm font-bold text-paper/72 transition hover:border-yellow/70">
            Experiências de matchday
            <input v-model="wantsExperiences" class="h-5 w-5 accent-yellow" type="checkbox" />
          </label>
        </div>
      </div>

      <aside class="border border-yellow/50 bg-[linear-gradient(180deg,#f5c400,#b98e12)] p-5 text-black shadow-[0_24px_80px_rgba(245,196,0,.14)]">
        <span class="text-[11px] font-extrabold uppercase tracking-[0.14em] text-black/62">Estimativa mensal</span>
        <strong class="display mt-4 block text-[clamp(54px,5vw,72px)] leading-none">R$ {{ total.toFixed(2).replace('.', ',') }}</strong>
        <p class="mt-5 text-xs font-extrabold uppercase text-black/64">{{ selectedPlan.priority }}</p>
        <div class="mt-6 h-px bg-black/22"></div>
        <p class="mt-5 text-xs font-extrabold uppercase leading-5 text-black/58">Simulação local. Cadastro no canal oficial.</p>
      </aside>
    </div>
  </section>
</template>
