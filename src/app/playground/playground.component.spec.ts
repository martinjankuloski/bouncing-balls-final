import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhysicsEngineService } from '../core/services/physics-engine.service';
import { Ball } from '../models/Ball';
import { Point2D } from '../models/Point2D';
import { VelocityVector } from '../models/VelocityVector';

import { PlaygroundComponent } from './playground.component';

describe('PlaygroundComponent', () => {
  let component: PlaygroundComponent;
  let fixture: ComponentFixture<PlaygroundComponent>;
  let mockPhysicsService: jasmine.SpyObj<PhysicsEngineService>;

  beforeEach(async () => {
    mockPhysicsService = jasmine.createSpyObj(['fireProjectile', 'moveBallByTimeInterval']);
    await TestBed.configureTestingModule({
      declarations: [PlaygroundComponent],
      providers: [
        {provide: PhysicsEngineService, useValue: mockPhysicsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render canvas', () => {
    // arrange

    // act

    // assert
    expect(fixture.nativeElement.querySelector('canvas')).toBeTruthy();
  });

  it('should render playground-settings component', () => {
    // arrange

    // act

    // assert
    expect(fixture.nativeElement.querySelector('app-playground-settings')).toBeTruthy();
  });

  it('should add a ball to fieldBalls array', () => {
    // arrange
    mockPhysicsService.fireProjectile.and.returnValue(new Ball(new Point2D(10, 20), new VelocityVector(50, 20)));

    // act
    component.fireProjectile(new MouseEvent('click'));

    // assert
    expect(component.fieldBalls.length).toEqual(1);
  });

  it('should clear the fieldBalls array', () => {
    // arrange
    component.fieldBalls.push(new Ball(new Point2D(10, 20), new VelocityVector(50, 20)));
    component.fieldBalls.push(new Ball(new Point2D(10, 20), new VelocityVector(50, 20)));
    component.fieldBalls.push(new Ball(new Point2D(10, 20), new VelocityVector(50, 20)));

    // act
    component.clearField();

    // assert
    expect(component.fieldBalls.length).toEqual(0);
  });
});
