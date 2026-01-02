import { Component } from '@angular/core';
import {IonApp, IonContent, IonHeader, IonRouterOutlet, IonTitle, IonToolbar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonHeader, IonTitle, IonToolbar, IonContent],
})
export class AppComponent {
  constructor() {}
}
