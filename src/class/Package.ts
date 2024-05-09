import { MassError, VolumeError } from '../Errors';
import { isNumber } from '../util/isNumber';
import { IPackage } from '../interface/IPackage';

/**
 * Represents a package to be dispatched to a stack.
 *
 * @export
 * @class
 * @implements {IPackage}
 */
export default class Package implements IPackage {
  /**
   * Width of the package, in centimeters.
   */
  width: number;
  /**
   *  Height of the package, in centimeters.
   */
  height: number;
  /**
   * Length of the package, in centimeters.
   */
  length: number;
  /**
   * Mass of the package, in kilograms.
   */
  mass: number;
  /**
   * Volume of the package, in cubic centimeters.
   */
  #volume: number | undefined;

  /**
   * Creates an instance of Package.
   *
   * @constructor
   * @param param0
   * @param param0.width
   * @param param0.height
   * @param param0.length
   * @param param0.mass
   */
  constructor({ width, height, length, mass }: IPackage) {
    Object.assign(this, { width, height, length, mass });
    this.#validate();
  }

  /**
   * Volume of the package, in cubic centimeters.
   *
   * @readonly
   */
  get volume() {
    return this.#volume ? this.#volume : (this.#volume = this.width * this.height * this.length);
  }

  /**
   * Indicates if the package is heavy.
   *
   * @readonly
   */
  get heavy(): boolean {
    return this.mass >= 20;
  }

  /**
   * Indicates if the package is bulky.
   *
   * @readonly
   */
  get bulky(): boolean {
    return this.volume >= 1000000 || [this.width, this.height, this.length].some((value) => value > 150);
  }

  /**
   * Indicates if the package is of acceptable size and weight.
   *
   * @readonly
   */
  get acceptable(): boolean {
    return !(this.heavy && this.bulky);
  }

  /**
   * Validates types passed in constructor are sane.
   */
  #validate() {
    [this.width, this.height, this.length, this.mass].forEach((value) => {
      if (!isNumber(value)) throw new TypeError(`Invalid type ${typeof value}`);
    });
    if (this.mass <= 0) throw new MassError(this.mass);
    if (this.volume <= 0) throw new VolumeError(this.width, this.height, this.length);
  }
}
