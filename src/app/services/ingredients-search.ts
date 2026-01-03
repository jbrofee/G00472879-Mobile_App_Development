import { Injectable } from '@angular/core';
import {Capacitor, CapacitorHttp, HttpOptions} from "@capacitor/core";

@Injectable({
  providedIn: 'root',
})
export class IngredientsSearch {
  constructor() {}

  // Takes in ingredients and appends them to URL for querying
  async searchFunction(ingredients: string[]){
    const options: HttpOptions = {
      url: 'https://api.spoonacular.com/recipes/complexSearch?includeIngredients=' + ingredients.join(','),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '70759a4f7911402abcc53d3c51d3b759',
      }
    }

    return await CapacitorHttp.get(options);
  }
}
