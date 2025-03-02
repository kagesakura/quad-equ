<script lang="ts">
  interface ComponentProps {
    val: bigint;
  }
  const { val }: ComponentProps = $props();

  const bigIntSgn = (v: bigint) => (v > 0 ? 1 : v < 0 ? -1 : 0);
</script>

{#if bigIntSgn(val) === -1}
  <span>−{-val}</span>
{:else if bigIntSgn(val) === 1}
  <span>{val}</span>
{/if}
