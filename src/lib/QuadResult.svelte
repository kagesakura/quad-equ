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
{:else if val.val[3] === 0n}
  <span>[object InvalidValue]</span>
{:else if bigIntAbs(val.val[3]) === 1n}
  <AddConst val={val.val[0]} /><span>&plusmn;</span><MulSqrt coeff={val.val[1]} inner={val.val[2]} />
{:else}
  <span class="inline-grid grid-rows-1 place-content-center place-items-center">
    <span class="row-[1_/_2] inline-block w-full text-center">
      <AddConst val={val.val[0]} />&plusmn;<MulSqrt coeff={val.val[1]} inner={val.val[2]} />
    </span>
    <span class="row-[2_/_3] inline-block w-full border-t-1 border-t-white text-center">{val.val[3]}</span>
  </span>
{/if}
