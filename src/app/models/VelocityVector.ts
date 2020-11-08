/**
 * Represents a velocity vector object defined by velocirt and angle of movement
 */
export class VelocityVector {
  v: number;
  a: number;

  private vx: number;
  private vy: number;

  constructor(v: number, a: number) {
    this.v = v;
    this.a = a;
    this.vx = this.calculateVx(v, a);
    this.vy = this.calculateVy(v, a);
  }

  public getVx(): number {
    return this.vx;
  }

  public getVy(): number {
    return this.vy;
  }

  calculateVx(v: number, a: number): number {
    return Math.abs(v * Math.cos(a * Math.PI / 180));
  }

  calculateVy(v: number, a: number): number {
    return Math.abs(v * Math.sin(a * Math.PI / 180));
  }

}
