import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BallDisplaySettings } from '../models/BallDisplaySettings';
import { PhysicsRules } from '../models/PhysicsRules';

@Component({
  selector: 'app-playground-settings',
  templateUrl: './playground-settings.component.html',
  styleUrls: ['./playground-settings.component.css']
})
export class PlaygroundSettingsComponent implements OnInit {

  @Input() rules: PhysicsRules;
  @Input() ballDisplaySettings: BallDisplaySettings;
  @Output() clearEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emits event that the clear field button has been clicked
   */
  clearFields(): void{
    this.clearEvent.emit();
  }

}
