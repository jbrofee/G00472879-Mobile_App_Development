import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeLookup } from '../services/recipe-lookup';
import {IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [
    IonContent
  ]
})
export class RecipeComponent  implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpService: RecipeLookup
  ) { }

  recipeId: string = "";
  recipeDetails: any;

  ngOnInit() {}

  ionViewWillEnter() {
    this.recipeId = this.route.snapshot.paramMap.get('id') || "";
    this.fetchRecipeDetails(this.recipeId);
  }

  async fetchRecipeDetails(id: string) {
    const response = await this.httpService.recipeSearch(id);
    this.recipeDetails = response?.data;
    console.log(this.recipeDetails);
  }

}
