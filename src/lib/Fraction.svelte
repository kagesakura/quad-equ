<script lang="ts">
  interface ComponentProps {
    rationalValue: [bigint, bigint];
  }
  const { rationalValue }: ComponentProps = $props();
  const bigIntSgn = (v: bigint) => (v > 0 ? 1 : v < 0 ? -1 : 0);
  const bigIntAbs = (v: bigint) => (v < 0 ? -v : v);
</script>

{#if rationalValue[1] === 0n}
  <span>[object InvalidValue]</span>
{:else if rationalValue[0] === 0n}
  <span>0</span>
{:else if rationalValue[1] === 1n}
  {#if rationalValue[0] < 0n}<span>−</span>{/if}<span>{bigIntAbs(rationalValue[0])}</span>
{:else if rationalValue[1] === -1n}
  {#if rationalValue[0] > 0n}<span>−</span>{/if}<span>{bigIntAbs(rationalValue[0])}</span>
{:else if bigIntSgn(rationalValue[0]) !== bigIntSgn(rationalValue[1])}
  <span class="inline-grid place-content-center place-items-center">
    <span class="col-[1_/_2] row-[1_/_3]">−</span>
    <span class="inline-block text-center w-full col-[2_/_3] row-[1_/_2]">{bigIntAbs(rationalValue[0])}</span>
    <span class="inline-block text-center w-full col-[2_/_3] row-[2_/_3] border-t-1 border-t-white">{bigIntAbs(rationalValue[1])}</span>
  </span>
{:else}
  <span class="inline-grid place-content-center place-items-center grid-rows-1">
    <span class="inline-block text-center w-full row-[1_/_2]">{bigIntAbs(rationalValue[0])}</span>
    <span class="inline-block text-center w-full row-[2_/_3] border-t-1 border-t-white">{bigIntAbs(rationalValue[1])}</span>
  </span>
{/if}
