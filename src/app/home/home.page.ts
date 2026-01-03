import { Component } from '@angular/core';
import {IonContent, IonInput, IonButton} from '@ionic/angular/standalone';
import {FormsModule} from "@angular/forms";
import {NavController} from "@ionic/angular/standalone";
import {inject} from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonInput, FormsModule, IonButton],
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

    // Navigate to results page with ingredients as state
    this.navCtrl.navigateForward(['/results'], {
      state: { ingredients: ingredientList }
    });
  }
}
