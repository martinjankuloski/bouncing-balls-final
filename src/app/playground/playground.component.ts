import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { PhysicsEngineService } from '../core/services/physics-engine.service';
import { Ball } from '../models/Ball';
import { BallDisplaySettings } from '../models/BallDisplaySettings';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit, AfterViewInit {
  @ViewChild('surface', { static: false }) surface: ElementRef;
  canvasWidth = (80 * window.innerWidth) / 100;
  canvasHeight = (95 * window.innerHeight) / 100;
  ballDisplaySettings = new BallDisplaySettings();
  fieldBalls: Ball[] = [];
  private canvasEl: HTMLCanvasElement;
  private canvasCtx: CanvasRenderingContext2D;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    console.log('onResize');
    this.canvasWidth = (80 * window.innerWidth) / 100;
    this.canvasHeight = (95 * window.innerHeight) / 100;
    this.canvasEl.width = this.canvasWidth;
    this.canvasEl.height = this.canvasHeight;
    // transform drawing (x,y) plain to begin from bottom left rather than top left (default HTML)
    // changing width/height restores transform to defaults (y = 0 is top left corner)
    this.canvasCtx.transform(1, 0, 0, -1, 0, this.canvasHeight);
  }

  constructor(public physicsEngine: PhysicsEngineService) {}
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.canvasEl = this.surface.nativeElement as HTMLCanvasElement;
    this.canvasEl.width = this.canvasWidth;
    this.canvasEl.height = this.canvasHeight;
    this.canvasCtx = this.canvasEl.getContext('2d');

    // transform drawing (x,y) plain to begin from bottom left rather than top left (default HTML)
    this.canvasCtx.resetTransform();
    this.canvasCtx.transform(1, 0, 0, -1, 0, this.canvasEl.height);

    // set drawing interval for canvas (this is also used to emulate movement time)
    setInterval(
      () => this.move(this.canvasEl, this.drawBall, this.physicsEngine),
      10
    );
  }

  ngOnInit(): void {}

  /**
   * Assigned on the click event in playground, fires a ball projectile
   */
  public fireProjectile(event: MouseEvent): void {
    const x = event.offsetX;
    const y = this.canvasEl.height - event.offsetY;
    // initialize a new ball
    const ball = this.physicsEngine.fireProjectile(x, y);
    ball.color = this.ballDisplaySettings.color;
    ball.radius = this.ballDisplaySettings.radius;

    // add it in the playground field
    this.fieldBalls.push(ball);
  }

  /**
   * Clears balls on the playing field
   */
  public clearField(): void {
    this.fieldBalls = [];
  }

  /**
   *
   * @param canvasEl the canvas element on which we draw
   * @param drawBall callback that draws the ball on the canvas
   * @param physicsEngine physics engine service used to generate next position in move
   */
  private move(
    canvasEl: HTMLCanvasElement,
    drawBall: (canvasContext: CanvasRenderingContext2D, ball: Ball) => void,
    physicsEngine: PhysicsEngineService
  ): void {
    const ctx = canvasEl.getContext('2d');

    // clear canvas
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    // draw elements
    this.fieldBalls.forEach((element) => {
      // drawBall callback
      drawBall(ctx, element);

      // move the ball by time interval
      physicsEngine.moveBallByTimeInterval(element);
    });
  }

  /**
   *
   * @param canvasContext context of canvas element in which the ball is drawn
   * @param ball ball object containing info about drawing (location, radius, color)
   */
  private drawBall(canvasContext: CanvasRenderingContext2D, ball: Ball): void {
    canvasContext.beginPath();
    canvasContext.fillStyle = ball.color;
    canvasContext.arc(
      ball.currentPosition.x,
      ball.currentPosition.y + ball.radius, // add radius to y when drawing because it draws from ball center
      ball.radius,
      0,
      Math.PI * 2,
      true
    );
    canvasContext.fill();
  }
}
