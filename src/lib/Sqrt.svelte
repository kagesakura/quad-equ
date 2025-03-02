<script lang="ts">
  interface ComponentProps {
    val: bigint;
  }
  const { val }: ComponentProps = $props();
</script>

{#if val < 0}
  <span>[object InvalidValue]</span>
{:else}
  <span>&radic;<span class="border-t-1 border-t-white">{val}</span></span>
{/if}
