import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeLookup } from '../services/recipe-lookup';
import {
  IonAccordion,
  IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCol,
  IonContent, IonGrid,
  IonItem,
  IonLabel,
  IonList, IonRow,
  IonSpinner
} from "@ionic/angular/standalone";
import {Units} from "../services/units";
import {NgFor, NgIf} from "@angular/common";
import {FavouritesService} from "../services/favourites-service";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  imports: [
    IonContent,
    NgIf,
    IonSpinner,
    IonAccordion,
    IonAccordionGroup,
    NgFor,
    IonItem,
    IonLabel,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton
  ]
})
export class RecipeComponent  implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpService: RecipeLookup,
    private unitService: Units,
    private favouriteService: FavouritesService
  ) { }

  recipeId: string = "";
  recipeDetails: any;
  unitPreference: any;
  isLoading = true;
  isFavourited = false;

  ngOnInit() {}

  async ionViewWillEnter() {
    this.isLoading = true;
    this.recipeId = this.route.snapshot.paramMap.get('id') || "";
    this.isFavourited = await this.favouriteService.isFavorited(this.recipeId);
    await this.fetchRecipeDetails(this.recipeId);
    this.fetchUnitPreference()
    this.isFavourited = await this.favouriteService.isFavorited(this.recipeId)
    this.isLoading = false;
  }

  async fetchRecipeDetails(id: string) {
    const response = await this.httpService.recipeSearch(id);
    this.recipeDetails = response?.data;
  }

  async fetchUnitPreference() {
    this.unitPreference = await this.unitService.getUnitPreferences();
  }

  async toggleFavourite(): Promise<void> {
    const id = this.recipeDetails.id;
    if (this.isFavourited) {
      await this.favouriteService.removeFavourite(id);
    } else {
      await this.favouriteService.addFavourite(id);
    }
    this.isFavourited = !this.isFavourited;
  }

}
