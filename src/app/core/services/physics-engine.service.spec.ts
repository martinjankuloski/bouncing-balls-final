import { TestBed } from '@angular/core/testing';
import { Ball } from 'src/app/models/Ball';
import { Point2D } from 'src/app/models/Point2D';
import { VelocityVector } from 'src/app/models/VelocityVector';

import { PhysicsEngineService } from './physics-engine.service';

describe('PhysicsEngineService', () => {
  let service: PhysicsEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicsEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a ball', () => {
    // arrange
    const x = 100;
    const y = 200;

    // act
    const ball = service.fireProjectile(x, y);

    // asssert
    expect(ball).toBeTruthy();
  });

  /**
   * Fired projectile (ball) should always be moving by default
   */
  it('should return a moving ball', () => {
    // arrange
    const x = 42;
    const y = 42;

    // act
    const ball = service.fireProjectile(x, y);

    // assert
    expect(ball.isMoving).toBeTruthy();
  });

  /**
   *
   */
  it('should throw an exception if x is negative', () => {
    // arrange
    const x = -42;
    const y = 42;

    // act

    // assert
    expect(() => service.fireProjectile(x, y)).toThrowError();
  });

  it('should throw an exception if y is negative', () => {
    // arrange
    const x = 42;
    const y = -42;

    // act

    // assert
    expect(() => service.fireProjectile(x, y)).toThrowError();
  });

  it('should stop ball from moving', () => {
    // arrange
    const ball = new Ball(new Point2D(42, 0), new VelocityVector(0, 45));
    // act
    service.moveBallByTimeInterval(ball);

    // assert
    expect(ball.isMoving).toBeFalsy();
  });

  it('should bounce the ball', () => {
    // arrange
    const ball = new Ball(new Point2D(42, 0), new VelocityVector(1, 0));

    // act
    service.moveBallByTimeInterval(ball);
    // assert
    expect(ball.startingVelocityVector.v !== 1).toBeTruthy();
  });
});
