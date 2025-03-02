<script lang="ts">
  interface ComponentProps {
    rationalValue: [bigint, bigint];
  }
  const { rationalValue }: ComponentProps = $props();
  const bigIntSgn = (v: bigint) => (v > 0 ? 1 : v < 0 ? -1 : 0);
  const bigIntAbs = (v: bigint) => (v < 0 ? -v : v);

  1n / rationalValue[1];
</script>

{#if rationalValue[0] === 0n}
  <span>0</span>
{:else if rationalValue[1] === 1n}
  {#if rationalValue[0] < 0n}<span>−</span>{/if}<span>{bigIntAbs(rationalValue[0])}</span>
{:else if rationalValue[1] === -1n}
  {#if rationalValue[0] > 0n}<span>−</span>{/if}<span>{bigIntAbs(rationalValue[0])}</span>
{:else if bigIntSgn(rationalValue[0]) !== bigIntSgn(rationalValue[1])}
  <span class="inline-grid place-content-center place-items-center">
    <span class="col-[1_/_2] row-[1_/_3]">−</span>
    <span class="col-[2_/_3] row-[1_/_2] inline-block w-full text-center">{bigIntAbs(rationalValue[0])}</span>
    <span class="col-[2_/_3] row-[2_/_3] inline-block w-full border-t-1 border-t-white text-center">{bigIntAbs(rationalValue[1])}</span>
  </span>
{:else}
  <span class="inline-grid grid-rows-1 place-content-center place-items-center">
    <span class="row-[1_/_2] inline-block w-full text-center">{bigIntAbs(rationalValue[0])}</span>
    <span class="row-[2_/_3] inline-block w-full border-t-1 border-t-white text-center">{bigIntAbs(rationalValue[1])}</span>
  </span>
{/if}
