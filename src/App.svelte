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
    const r =
      /^[\u0009\u000A-\u000D\u0020\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*(?:\+|-)?\d+[\u0009\u000A-\u000D\u0020\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/;
    const isInvalid = !(r.exec(quadCoef) && r.exec(linCoef) && r.exec(constCoef));
    if (isInvalid) {
      result = "整数のみ入力可能";
      return;
    }
    try {
      result = solveQuadratic(BigInt(quadCoef), BigInt(linCoef), BigInt(constCoef));
    } catch (e) {
      result = `${e}`;
    }
  }
</script>

<main class="grid h-svh place-items-center bg-neutral-800 p-[3em_0] text-neutral-200">
  <h1 class="p-1 text-3xl font-bold">Quadratic Equation Solver</h1>
  <div class="p-1 font-[KaTeX-Main] text-2xl">
    <input
      bind:value={quadCoef}
      maxlength="6"
      oninput={calc}
      class="w-20 rounded-[6px] border-1 border-neutral-500 p-[0_3px] text-right outline-0"
    /><span><span class="font-[KaTeX-Math]">x</span>&#178; +</span>
    <input
      bind:value={linCoef}
      maxlength="6"
      oninput={calc}
      class="w-20 rounded-[6px] border-1 border-neutral-500 p-[0_3px] text-right outline-0"
    /><span> <span class="font-[KaTeX-Math]">x</span> +</span>
    <input
      bind:value={constCoef}
      maxlength="6"
      oninput={calc}
      class="w-20 rounded-[6px] border-1 border-neutral-500 p-[0_3px] text-right outline-0"
    /><span> = 0</span>
  </div>
  <div class="p-1 font-[KaTeX-Main] text-2xl">
    {#if result === null}
      <span>waiting for input...</span>
    {:else if typeof result === "object"}
      <QuadResult val={result} />
    {:else}
      <span class="text-red-600">{result}</span>
    {/if}
  </div>
</main>
