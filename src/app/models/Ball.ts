import { Point2D } from './Point2D';
import { Projectile } from './Projectile';
import { VelocityVector } from './VelocityVector';

/**
 * Represents a projectile in the form of ball with radius and color
 */
export class Ball extends Projectile {
  color: string;
  radius: number;

  constructor(
    startPosition: Point2D,
    velocityVector: VelocityVector,
    color = '#0000ff',
    radius = 10
  ) {
    super(startPosition, velocityVector);
    this.color = color;
    this.radius = radius;
  }
}
