import { Point2D } from './Point2D';
import { VelocityVector } from './VelocityVector';

/**
 * Represents a moving projectile defined by starting position,
 * velocity vector and time
 */
export class Projectile {

  startPosition: Point2D;
  currentPosition: Point2D;
  startingVelocityVector: VelocityVector;
  t: number;
  isMoving: boolean;

  constructor(
    startPosition: Point2D,
    velocityVector: VelocityVector
  ) {
    this.startPosition = Object.assign({}, startPosition);
    this.currentPosition = Object.assign({}, startPosition);
    this.startingVelocityVector = velocityVector;
    this.isMoving = true;
    this.t = 0;
  }
}
