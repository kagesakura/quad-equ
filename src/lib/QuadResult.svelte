<script lang="ts">
  import type { QuadAns } from "../quad";
  import AddConst from "./AddConst.svelte";
  import Fraction from "./Fraction.svelte";
  import MulSqrt from "./MulSqrt.svelte";

  interface ComponentProps {
    val: QuadAns;
  }
  const { val }: ComponentProps = $props();

  const bigIntAbs = (v: bigint) => (v < 0 ? -v : v);

  if (val.type === "Q") {
    1n / val.val[1];
  } else if (val.type === "(Q,Q)") {
    1n / val.val[0][1];
    1n / val.val[1][1];
  } else if (val.type === "R\\Q") {
    1n / val.val[2];
    if (0n >= val.val[1]) throw new Error("Invalid property");
    if (0n >= val.val[3]) throw new Error("Invalid property");
  } else {
    throw new Error("Invalid property");
  }
</script>

{#if val.type === "Q"}
  <span class="inline-grid place-content-center place-items-center">
    <span class="col-[1/2] block pr-2"><span class="font-[KaTeX-Math]">x</span> =</span>
    <span class="col-[2/3] block"><Fraction rationalValue={val.val} /></span>
  </span>
{:else if val.type === "(Q,Q)"}
  <span class="inline-grid place-content-center place-items-center">
    <span class="col-[1/2] block pr-2"><span class="font-[KaTeX-Math]">x</span> =</span>
    <span class="col-[2/3] block"><Fraction rationalValue={val.val[0]} /></span>
    <span class="col-[3/4] block pr-2">,</span>
    <span class="col-[4/5] block"><Fraction rationalValue={val.val[1]} /></span>
  </span>
{:else if bigIntAbs(val.val[3]) === 1n}
  <span><span class="font-[KaTeX-Math]">x</span> =</span>
  <AddConst val={val.val[0]} />&plusmn;<MulSqrt coeff={val.val[1]} inner={val.val[2]} />
{:else}
  <span class="inline-grid grid-rows-2 place-content-center place-items-center">
    <span class="col-[1_/_2] row-[1_/_3] pr-2"><span class="font-[KaTeX-Math]">x</span> =</span>
    <span class="col-[2_/_3] row-[1_/_2] inline-block w-full text-center">
      <AddConst val={val.val[0]} />&plusmn;<MulSqrt coeff={val.val[1]} inner={val.val[2]} />
    </span>
    <span class="col-[2_/_3] row-[2_/_3] inline-block w-full border-t-1 border-t-white text-center">{val.val[3]}</span>
  </span>
{/if}
