export class VolumeError extends Error {
  constructor(width: number, height: number, length: number) {
    const msg = `Invalid volume ${[width, height, length].join('x')} (width x height x length)`;
    super(msg);
  }
}

export class MassError extends Error {
  constructor(mass: number) {
    super(`Invalid mass ${mass}`);
  }
}
