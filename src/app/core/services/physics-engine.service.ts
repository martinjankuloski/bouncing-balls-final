import { Injectable } from '@angular/core';
import { Ball } from 'src/app/models/Ball';
import { BallDisplaySettings } from 'src/app/models/BallDisplaySettings';
import { PhysicsRules } from 'src/app/models/PhysicsRules';
import { Point2D } from 'src/app/models/Point2D';
import { VelocityVector } from 'src/app/models/VelocityVector';

@Injectable({
  providedIn: 'root',
})
export class PhysicsEngineService {
  physicsRules = new PhysicsRules();
  ballDisplaySettings = new BallDisplaySettings();
  constructor() {}

  /**
   * Returns a Ball object with starting location of (x,y) moving in projectile motion
   * with a random velocity vector where the angle of movement is between 0-90 and velocity between 0-maxVelocity
   * @param x location of X axis of the starting position of the ball, should be positive value
   * @param y location of Y axis of the starting position of the ball, should be positive value
   */
  fireProjectile(x: number, y: number): Ball {
    if (x < 0) {
      throw new Error();
    }

    if (y < 0) {
      throw new Error();
    }

    // randomize projectile angle from 0 to max angle
    const a = Math.floor(
      Math.random() * Math.floor(this.physicsRules.maxAngle)
    );

    // randomize projectile velocity ranging from 0 to max defined velocity
    // 0 is free fall
    const v = Math.floor(
      Math.random() * Math.floor(this.physicsRules.maxVelocity)
    );

    return new Ball(new Point2D(x, y), new VelocityVector(v, a));
  }

  // moves a ball by given time interval
  /**
   * Moves a given Ball in the 2D plain by a given time interval t (default 0.1)
   * @param ball Ball object that is being moved
   * @param t time interval by which the ball is moved
   */
  moveBallByTimeInterval(ball: Ball, t = 0.1): void {
    if (!ball.isMoving) {
      return;
    }
    ball.t += t;

    ball.currentPosition.x = this.calculateXofT(
      ball.startingVelocityVector.getVx(),
      ball.t,
      ball.startPosition.x
    );
    let y = this.calculateYofT(
      ball.startingVelocityVector.getVy(),
      ball.t,
      ball.startPosition.y
    );

    if (y < 0) {
      // reset y to 0 on a jump
      y = 0;
      this.bounceBall(ball);
    }

    ball.currentPosition.y = y;
  }

  /**
   * Bounces a Ball object by assigning new velocity vector based on impact speed and
   * coefficient of restitution
   * @param ball Ball object that is being bounced
   */
  private bounceBall(ball: Ball): void {
    // assign the new velocity vector
      const bounceVector = this.getBounceVector(ball);

      // if it reaches stopping speed, set ball moving flag to false
      // (we skip calculations on drawing side with this flag)
      if (bounceVector.v < this.physicsRules.stoppingVelocity) {
        ball.isMoving = false;
      }

      // set the new velocity vector
      ball.startingVelocityVector = bounceVector;

      // reset time to 0
      ball.t = 0;

      // set new starting position
      ball.startPosition = new Point2D(ball.currentPosition.x, 0);
  }

  /**
   * Calculates the bounce velocity vector based on the movement of the Ball given as parameter
   * and coefficient of restitution given in the engine
   * @param ball Ball for which we calculate the bounce velocity vector
   */
  private getBounceVector(ball: Ball): VelocityVector {
    // calculate velocity on impact
    const vmax = this.calculateVMax(ball);
    // calculate new V based on physics engine coefficient of restituion
    const newV = this.physicsRules.cRestitution * vmax;

    // return new velocity vector with new velocity and same angle
    return new VelocityVector(newV, ball.startingVelocityVector.a);
  }

  /**
   * Calculates position on the X axis as a function of time (t) given starting velocity vx0
   * @param vx0 starting velocity in the x axis
   * @param t timestamp at which we want to get the snapshot of X
   * @param x0 starting location (optional if x0 = 0)
   */
  private calculateXofT(vx0: number, t: number, x0 = 0): number {
    return x0 + vx0 * t;
  }

  /**
   * Calculates position on the Y axis as a function of time (t) given starting velocity vy0
   * which acceleretes downwards by 1 gravity force (default g = 9.82)
   * @param vy0 starting velocity in the y axis
   * @param t timestamp at which we want the get the snapshot of Y
   * @param y0 starting location (optional if y0 = 0)
   */
  private calculateYofT(vy0: number, t: number, y0 = 0): number {
    return y0 + vy0 * t - (this.physicsRules.g * Math.pow(t, 2)) / 2;
  }

  // calculates the max x-axis velocity given a velocity vector (on impact)
  /**
   * Given a starting velocity vector of a projectile which moves in 2D plain,
   * gets the max horizontal velocity (without friction, vx0 = maxVx)
   * @param vector velocity vector (velocity value + angle of movement in 2D plain)
   */
  private calculateVxMax(vector: VelocityVector): number {
    return vector.getVx();
  }

  // calculates the max y-axis velocity given a velocity vector and starting position (on impact)
  /**
   * Given a starting velocity vector and position of a projectile which moves in 2D plain,
   * and is accelerating vertically by 1 g force, gets the max vertical velocity (on impact when y = 0)
   * @param vector velocity vector (velocity value + angle of movement in 2D plain)
   * @param startingPos starting location on the x,y plain of the projectile movement
   */
  private calculateVyMax(vector: VelocityVector, startingPos: Point2D): number {
    return Math.sqrt(
      vector.getVy() - 2 * this.physicsRules.g * startingPos.y * -1
    );
  }

  /**
   * Calculates the max velocity in projectile movement (when it hits the ground, y = 0)
   * @param ball ball (projectile) for which the max velocity is calculated
   */
  private calculateVMax(ball: Ball): number {
    const vx = this.calculateVxMax(ball.startingVelocityVector);
    const vy = this.calculateVyMax(
      ball.startingVelocityVector,
      ball.startPosition
    );

    // use pythagorean theorem to get velocity
    return Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
  }
}
