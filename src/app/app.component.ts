import { Component } from '@angular/core';
import {
  IonApp, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {cogOutline, heartCircleOutline} from "ionicons/icons";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonHeader, IonTitle, IonToolbar, IonContent, IonButtons, IonButton, IonIcon],
})
export class AppComponent {
  constructor() {
    addIcons({
      heartCircleOutline,
      cogOutline
    })
  }
}
