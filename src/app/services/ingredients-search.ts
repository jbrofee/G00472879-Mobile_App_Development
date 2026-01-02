import { Injectable } from '@angular/core';
import {Capacitor, CapacitorHttp, HttpOptions} from "@capacitor/core";

@Injectable({
  providedIn: 'root',
})
export class IngredientsSearch {
  constructor() {}

  async searchFunction(ingredients: string[]){
    const options: HttpOptions = {
      url: 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=' + ingredients.join(','),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '70759a4f7911402abcc53d3c51d3b759',
      }
    }

    return await CapacitorHttp.get(options);
  }
}
