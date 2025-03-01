<script lang="ts">
  import Fraction from "./Fraction.svelte";

  interface ComponentProps {
    val:
      | {
          type: "Q";
          val: [bigint, bigint];
        }
      | {
          type: "(Q,Q)";
          val: [[bigint, bigint], [bigint, bigint]];
        }
      | {
          type: "R\\Q";
          val: [bigint, bigint, bigint, bigint];
        };
  }
  const { val }: ComponentProps = $props();
</script>

{#if val.type === "Q"}
  <span class="inline-grid place-content-center place-items-center">
    <span class="col-[1/2] block pr-2">x =</span>
    <span class="col-[2/3] block"><Fraction rationalValue={val.val} /></span>
  </span>
{:else if val.type === "(Q,Q)"}
  <span class="inline-grid place-content-center place-items-center">
    <span class="col-[1/2] block pr-2">x =</span>
    <span class="col-[2/3] block"><Fraction rationalValue={val.val[0]} /></span>
    <span class="col-[3/4] block pr-2">,</span>
    <span class="col-[4/5] block"><Fraction rationalValue={val.val[1]} /></span>
  </span>
{:else}
  <span>[object IrrValue]</span>
{/if}
