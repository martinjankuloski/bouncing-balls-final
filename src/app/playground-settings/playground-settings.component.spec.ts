import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundSettingsComponent } from './playground-settings.component';

describe('PlaygroundSettingsComponent', () => {
  let component: PlaygroundSettingsComponent;
  let fixture: ComponentFixture<PlaygroundSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaygroundSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
