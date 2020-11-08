# BouncingBalls

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

This is a project that contains playground in which you can "fire" balls in projectile movement that bounce and come to a stop. 

The balls are fired at random angle (0-90 degrees) and a random speed (0-100 by default). 

The movement is projected on the assumption that the "Ball" objects are moving in a 2D plain, represented by canvas, and there is no drag (air-resistance) in the X axis. The downward force (gravity) is 9.82 by default, but it can be adjusted. The time interval of movement is in scale of 10ms = 100ms. 

## Build

Each commit on master initiates a build/test/deploy cycle through Azure DevOps pipeline associated with this repo.

## Deployment

Application is deployed on azure app services: http://bouncing-balls-01.azurewebsites.net/
