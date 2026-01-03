import { Component, OnInit } from '@angular/core';
import {FavouritesService} from "../services/favourites-service";
import {RecipeLookup} from "../services/recipe-lookup";
import {IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    NgForOf
  ]
})
export class FavouritesComponent  implements OnInit {

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private favs: FavouritesService, private recipeLookup: RecipeLookup) {}
  favouritesList: any;
  favouritesRecipeInfo: any;

  ngOnInit() {}

  ionViewWillEnter() {
    this.fetchFavourites()
  }

  // Looks up the list of favourites and then searches for their recipe information
  async fetchFavourites() {
    this.favouritesList = await this.favs.getFavouritesList();
    const result = await this.recipeLookup.favouritesSearch(this.favouritesList);
    this.favouritesRecipeInfo = result?.data;
    console.log(this.favouritesRecipeInfo);
  }
}
