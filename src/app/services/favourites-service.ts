import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {RecipeLookup} from "./recipe-lookup";

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage, private recipeLookup: RecipeLookup) {
    this.init();
  }
  private async init() {
    this._storage = await this.storage.create();
  }

  // Keeping it simple; favourites are just an array of recipe IDs
  // There was a lot of weirdness with IDs not being detected by isFavourite
  // So they are normalised to strings each time
  // Similar to units service the Ionic storage system is bad and doesn't init
  // quick enough sometimes
  async addFavourite(recipeId: string | number): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    const id = recipeId.toString();
    let favourites: string[] = (await this._storage!.get('favourites')) || [];
    if (!favourites.includes(id)) {
      favourites.push(id);
      await this._storage!.set('favourites', favourites);
    }
  }

  // Gets the current list of favourites and filters out the one to be removed
  async removeFavourite(recipeId: string | number): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    const idToBeRemoved = recipeId.toString();
    let favourites: string[] = (await this._storage!.get('favourites')) || [];
    favourites = favourites.filter(id => id !== idToBeRemoved);
    await this._storage!.set('favourites', favourites);
  }

  async getFavouritesList(): Promise<string[]> {
    if (!this._storage) {
      await this.init();
    }
    return (await this._storage!.get('favourites')) || [];
  }

  // Returns boolean indicating if the given recipe ID is in the favourites list
  async isFavorited(recipeId: string | number): Promise<boolean> {
    if (!this._storage) {
      await this.init();
    }
    const id = recipeId.toString();
    const favourites: string[] = (await this._storage!.get('favourites')) || [];
    return favourites.includes(id);
  }

}
