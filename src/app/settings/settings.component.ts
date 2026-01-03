import { Component, OnInit } from '@angular/core';
import {Units} from "../services/units";
import {IonContent, IonRadio, IonRadioGroup} from "@ionic/angular/standalone";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    IonContent,
    IonRadioGroup,
    IonRadio
  ]
})
export class SettingsComponent  implements OnInit {

  currentPreference: any;

  constructor(private unitService: Units) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.currentPreference = this.getPreference()
  }

  async getPreference() {
    this.currentPreference = await this.unitService.getUnitPreferences();
  }

  async onPreferenceChange(event: any) {
    const value = event.detail.value;
    if (value === 'Metric' || value === 'Imperial') {
      console.log("ping")
      this.currentPreference = value;
      await this.unitService.setUnitPreference(value);
    }
  }
}
