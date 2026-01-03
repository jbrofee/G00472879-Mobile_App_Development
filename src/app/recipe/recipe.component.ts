import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeLookup } from '../services/recipe-lookup';
import {IonContent} from "@ionic/angular/standalone";
import {Units} from "../services/units";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [
    IonContent,
    NgIf
  ]
})
export class RecipeComponent  implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpService: RecipeLookup,
    private unitService: Units
  ) { }

  recipeId: string = "";
  recipeDetails: any;
  unitPreference: any;
  isLoading = true;

  ngOnInit() {}

  ionViewWillEnter() {
    this.recipeId = this.route.snapshot.paramMap.get('id') || "";
    this.fetchRecipeDetails(this.recipeId);
    this.fetchUnitPreference()
  }

  async fetchRecipeDetails(id: string) {
    this.isLoading = true;
    const response = await this.httpService.recipeSearch(id);
    this.recipeDetails = response?.data;
    this.isLoading = false;
    console.log(this.recipeDetails.title);
  }

  async fetchUnitPreference() {
    this.unitPreference = await this.unitService.getUnitPreferences();
  }

}
