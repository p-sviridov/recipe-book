import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(environment.firebaseDatabaseURL, recipes).subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(environment.firebaseDatabaseURL).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
