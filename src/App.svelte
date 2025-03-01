<script lang="ts">
  import QuadResult from "./lib/QuadResult.svelte";

  type QuadAns =
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

  let quadCoef = $state("1");
  let linCoef = $state("0");
  let constCoef = $state("0");

  let result: QuadAns | string | null = $state(null);

  async function calc() {
    console.log([quadCoef, linCoef, constCoef]);
    const notFilled = !(quadCoef && linCoef && constCoef);
    if (notFilled) return;
    try {
      result = await solveQuadratic(BigInt(quadCoef), BigInt(linCoef), BigInt(constCoef));
    } catch (e) {
      result = `${e}`;
    }
  }

  const newtonIteration = (n: bigint, x0: bigint) => {
    const x1 = (n / x0 + x0) >> 1n;
    if (x0 === x1 || x0 === x1 - 1n) return x0;
    return newtonIteration(n, x1);
  };
  const clampedRoot = (n: bigint): bigint => {
    if (n < 0) return -clampedRoot(-n);
    if (n < 2) return n;
    return newtonIteration(n, 1n);
  };
  const divEuclid = (a: bigint, b: bigint): bigint => {
    if (b < 0n) return -divEuclid(-a, -b);
    if (a < 0n) a = -a;
    if (a < b) {
      const tmp = a;
      a = b;
      b = tmp;
    }
    let r = a % b;
    while (r) {
      a = b;
      b = r;
      r = a % b;
    }
    return b;
  };

  async function solveQuadratic(a: bigint, b: bigint, c: bigint): Promise<QuadAns> {
    1n / a; // It is not allowed variable 'a' to be equal to 0
    let d = b ** 2n - 4n * a * c;
    if (d === 0n) {
      let k = -b,
        l = 2n * a;
      if (k && l) {
        const cd = divEuclid(k, l);
        (k /= cd), (l /= cd);
      }
      return { type: "Q", val: [k, l] };
    }
    const rootD = clampedRoot(d);
    if (d === rootD ** 2n) {
      let k = -rootD - b,
        l = rootD - b,
        m = 2n * a,
        n = m;
      if (k && m) {
        const cd1 = divEuclid(k, m);
        (k /= cd1), (m /= cd1);
      }
      if (l && n) {
        const cd2 = divEuclid(l, n);
        (l /= cd2), (n /= cd2);
      }
      return {
        type: "(Q,Q)",
        val: [
          [k, m],
          [l, n]
        ]
      };
    } else {
      let k = -b,
        l = 1n,
        m = d,
        n = 2n * a;

      while (!(m % 4n)) (m /= 4n), (l *= 2n);
      for (let i = 3n; i <= rootD; i += 2n) {
        const sq = i ** 2n;
        while (!(m % sq)) (m /= sq), (l *= i);
        if (!(i % 131071n)) await new Promise(requestAnimationFrame);
      }

      if (k && l && n) {
        const cd = divEuclid(divEuclid(l, k), n);
        (k /= cd), (l /= cd), (n /= cd);
      } else if (l && n) {
        const cd = divEuclid(l, n);
        (l /= cd), (n /= cd);
      }
      if (m === 1n) {
        ({ k, l } = { k: k + l, l: k - l });
        m = n;
        if (k && m) {
          const cd1 = divEuclid(k, m);
          (k /= cd1), (m /= cd1);
        }
        if (l && n) {
          const cd2 = divEuclid(l, n);
          (l /= cd2), (n /= cd2);
        }
        return {
          type: "(Q,Q)",
          val: [
            [k, m],
            [l, n]
          ]
        };
      }
      if (l < 0) l = -l;
      return { val: [k, l, m, n], type: "R\\Q" };
    }
  }
</script>

<main class="p-[3em_0] grid place-items-center text-neutral-200 bg-neutral-800 h-svh">
  <h1 class="p-1 text-3xl font-bold">Quadratic Equation Solver</h1>
  <div class="p-1 text-3xl">
    <input bind:value={quadCoef} oninput={calc} class="p-[0_3px] text-right w-20 rounded-[6px] border-1 border-neutral-500 outline-0" />x&#178; +
    <input bind:value={linCoef} oninput={calc} class="p-[0_3px] text-right w-20 rounded-[6px] border-1 border-neutral-500 outline-0" />x +
    <input bind:value={constCoef} oninput={calc} class="p-[0_3px] text-right w-20 rounded-[6px] border-1 border-neutral-500 outline-0" />
    = 0
  </div>
  <div class="p-1 text-3xl">
    {#if result === null}
      <span>waiting for input...</span>
    {:else if typeof result === "object"}
      <QuadResult val={result} />
    {:else}
      <span class="text-red-600">{result}</span>
    {/if}
  </div>
</main>
