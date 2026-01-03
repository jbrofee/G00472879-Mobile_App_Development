import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeLookup } from '../services/recipe-lookup';
import {
  IonAccordion,
  IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol,
  IonContent, IonGrid, IonHeader, IonIcon,
  IonItem,
  IonLabel,
  IonList, IonModal, IonRow,
  IonSpinner, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {Units} from "../services/units";
import {NgFor, NgIf} from "@angular/common";
import {FavouritesService} from "../services/favourites-service";
import {addIcons} from "ionicons";
import {checkmarkCircleOutline, closeCircleOutline, heart, heartOutline} from "ionicons/icons";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  // This is ugly and I hate it
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
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon
  ]
})
export class RecipeComponent  implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpService: RecipeLookup,
    private unitService: Units,
    private favouriteService: FavouritesService
  ) { addIcons ({
      heart, heartOutline, checkmarkCircleOutline, closeCircleOutline
    }
    )}

  // Initialising variables to be used throughout the component
  recipeId: string = "";
  recipeDetails: any;
  unitPreference: any;
  isLoading = true;
  isFavourited = false;

  ngOnInit() {}

  // Fetch recipe details when the view is about to enter
  async ionViewWillEnter() {
    // Page shows a spinner while loading is true
    this.isLoading = true;
    // Grabs ID from URL
    this.recipeId = this.route.snapshot.paramMap.get('id') || "";
    // Checks if favourited to inform the favourite button state
    this.isFavourited = await this.favouriteService.isFavorited(this.recipeId);
    // Fetches recipe details
    await this.fetchRecipeDetails(this.recipeId);
    // Fetches unit preferences which is used for ingredient display
    await this.fetchUnitPreference()
    this.isLoading = false;
  }

  // Check recipeSearch service to see how recipe details are fetched
  async fetchRecipeDetails(id: string) {
    const response = await this.httpService.recipeSearch(id);
    this.recipeDetails = response?.data;
    console.log(this.recipeDetails);
  }

  async fetchUnitPreference() {
    this.unitPreference = await this.unitService.getUnitPreferences();
  }

  // Function that is called when the button is pressed
  async toggleFavourite() {
    const id = this.recipeDetails.id;
    if (this.isFavourited) {
      await this.favouriteService.removeFavourite(id);
    } else {
      await this.favouriteService.addFavourite(id);
    }
    this.isFavourited = !this.isFavourited;
  }

}
