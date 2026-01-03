import { Component, OnInit } from '@angular/core';
import {Units} from "../services/units";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
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

}
