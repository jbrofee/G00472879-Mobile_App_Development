import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton} from '@ionic/angular/standalone';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular/standalone";
import {inject} from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, FormsModule, IonButton],
})
export class HomePage {
  ingredients: string = '';
  constructor() {}
  private navCtrl = inject(NavController);
  searchRecipes() {
    if (!this.ingredients.trim()) {
      return;
    }

    // Split by comma and trim whitespace
    const ingredientList = this.ingredients
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    // Navigate to results page with ingredients as query params
    this.navCtrl.navigateForward(['/results'], {
      state: { ingredients: ingredientList }
    });
  }
}
