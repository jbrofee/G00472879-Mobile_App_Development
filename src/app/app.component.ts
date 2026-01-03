import { Component } from '@angular/core';
import {
  IonApp, IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonHeader, IonTitle, IonToolbar, IonContent, IonButtons, IonButton],
})
export class AppComponent {
  constructor() {}
}
