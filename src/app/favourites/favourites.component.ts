import { Component, OnInit } from '@angular/core';
import {FavouritesService} from "../services/favourites-service";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  standalone: true,
})
export class FavouritesComponent  implements OnInit {

  constructor(private favs: FavouritesService) {}
  favouritesList: any;
  favouritesRecipeInfo: any;

  ngOnInit() {}

  ionViewWillEnter() {
    this.fetchFavourites()
  }

  async fetchFavourites() {
    this.favouritesList = await this.favs.getFavouritesList();
    this.favouritesRecipeInfo = await this.favs.fetchFavouriteRecipeInfo(this.favouritesList);
    console.log(this.favouritesRecipeInfo);
  }

}
