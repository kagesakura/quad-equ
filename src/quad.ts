export type QuadAns =
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

const newtonIteration = (n: bigint, x0: bigint) => {
  const x1 = (n / x0 + x0) >> 1n;
  if (x0 === x1 || x0 === x1 - 1n) return x0;
  return newtonIteration(n, x1);
};
const clampedRoot = (n: bigint): bigint => {
  if (n < 0) return 0n;
  if (n < 2) return n;
  return newtonIteration(n, 1n);
};
const gcd = (a: bigint, b: bigint): bigint => {
  a / b;
  b / a;
  if (b < 0n) return -gcd(-a, -b);
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

const normalizeRational = (v: [bigint, bigint]): [bigint, bigint] => {
  v[0] / v[1];
  if (v[0] === 0n) return [0n, 1n];
  v = [...v];
  const cd = gcd(v[0], v[1]);
  return [v[0] / cd, v[1] / cd];
};

export function solveQuadratic(a: bigint, b: bigint, c: bigint): QuadAns {
  1n / a; // It is not allowed variable 'a' to be equal to 0
  const d = b ** 2n - 4n * a * c;
  if (d === 0n) return { type: "Q", val: normalizeRational([-b, 2n * a]) };
  let rootD = clampedRoot(d);
  if (d === rootD ** 2n) {
    return {
      type: "(Q,Q)",
      val: [normalizeRational([-rootD - b, 2n * a]), normalizeRational([rootD - b, 2n * a])]
    };
  }
  let k = -b,
    l = 1n,
    m = d,
    n = 2n * a;
  rootD = clampedRoot(d < 0 ? -d : d);

  while (!(m % 4n)) (m /= 4n), (l *= 2n);
  for (let i = 3n; i <= rootD; i += 2n) {
    const sq = i ** 2n;
    while (!(m % sq)) (m /= sq), (l *= i);
  }

  if (m === 1n) {
    return {
      type: "(Q,Q)",
      val: [normalizeRational([k + l, n]), normalizeRational([k - l, n])]
    };
  }
  1n / l;
  1n / m;
  1n / n;
  if (k) {
    const cd = gcd(gcd(l, k), n);
    (k /= cd), (l /= cd), (n /= cd);
  } else {
    const cd = gcd(l, n);
    (l /= cd), (n /= cd);
  }
  if (l < 0) l = -l;
  return { val: [k, l, m, n], type: "R\\Q" };
}
