import Package from './class/Package';

export function sort(width: number, height: number, length: number, mass: number) {
  const pkg = new Package({ width, height, length, mass });

  if (!pkg.acceptable) return 'REJECTED';
  if (pkg.heavy || pkg.bulky) return 'SPECIAL';
  return 'STANDARD';
}
