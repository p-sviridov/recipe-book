import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RecipeDefaultComponent } from './recipe-default/recipe-default.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeDefaultComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ],
})
export class RecipesModule {}
