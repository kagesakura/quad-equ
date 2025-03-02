<script lang="ts">
  interface ComponentProps {
    val: bigint;
  }
  const { val }: ComponentProps = $props();

  if (0n >= val) throw new Error("Invalid property");
</script>

<span>&radic;<span class="border-t-1 border-t-white">{val}</span></span>
