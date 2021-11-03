import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '@app/core/models/recipe.model';
import * as ShoppingListActions from '@app/shopping-list/store/shopping-list.actions';
import { AppState } from '@app/root-store/app.reducer';
import * as RecipesActions from '@app/recipes/store/recipes.actions';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeId: number;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  addToShoppingList() {
    this.recipe.ingredients.forEach((ingredient) =>
      this.store.dispatch(ShoppingListActions.addIngredient({ ingredient }))
    );
  }

  deleteRecipe() {
    this.store.dispatch(RecipesActions.deleteRecipe({ index: this.recipeId }));
    this.router.navigate(['/recipes']);
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.recipeId = id;
          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find(
            (recipe, index) => index === this.recipeId
          );
        })
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  ngOnDestroy() {}
}
