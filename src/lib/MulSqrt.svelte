<script lang="ts">
  import Sqrt from "./Sqrt.svelte";

  interface ComponentProps {
    coeff: bigint;
    inner: bigint;
  }
  const { coeff, inner }: ComponentProps = $props();
  const bigIntSgn = (v: bigint) => (v > 0 ? 1 : v < 0 ? -1 : 0);
  const bigIntAbs = (v: bigint) => (v < 0 ? -v : v);

  if (inner === 1n || inner === 0n || 0n >= coeff) throw new Error("Invalid property");
</script>

{#if inner === -1n}
  <span>{coeff}</span><span class="font-[KaTeX-Math]">i</span>
{:else if coeff === 1n}
  <Sqrt val={bigIntAbs(inner)} />{#if bigIntSgn(inner) === -1}<span class="font-[KaTeX-Math]">i</span>{/if}
{:else}
  <span>{coeff}</span><Sqrt val={bigIntAbs(inner)} />{#if bigIntSgn(inner) === -1}<span class="font-[KaTeX-Math]">i</span>{/if}
{/if}
