<script lang="ts">
  import QuadResult from "./lib/QuadResult.svelte";
  import { solveQuadratic, type QuadAns } from "./quad";

  let quadCoef = $state("1");
  let linCoef = $state("0");
  let constCoef = $state("0");

  let result: QuadAns | string | null = $state(null);

  async function calc() {
    const notFilled = !(quadCoef && linCoef && constCoef);
    if (notFilled) return;
    try {
      result = await solveQuadratic(BigInt(quadCoef), BigInt(linCoef), BigInt(constCoef));
    } catch (e) {
      result = `${e}`;
    }
  }
</script>

<main class="grid h-svh place-items-center bg-neutral-800 p-[3em_0] text-neutral-200">
  <h1 class="p-1 text-3xl font-bold">Quadratic Equation Solver</h1>
  <div class="p-1 text-2xl">
    <input
      bind:value={quadCoef}
      oninput={calc}
      class="w-20 rounded-[6px] border-1 border-neutral-500 p-[0_3px] text-right outline-0"
    />x&#178; +
    <input bind:value={linCoef} oninput={calc} class="w-20 rounded-[6px] border-1 border-neutral-500 p-[0_3px] text-right outline-0" />x +
    <input bind:value={constCoef} oninput={calc} class="w-20 rounded-[6px] border-1 border-neutral-500 p-[0_3px] text-right outline-0" />
    = 0
  </div>
  <div class="p-1 text-2xl">
    {#if result === null}
      <span>waiting for input...</span>
    {:else if typeof result === "object"}
      <QuadResult val={result} />
    {:else}
      <span class="text-red-600">{result}</span>
    {/if}
  </div>
</main>
