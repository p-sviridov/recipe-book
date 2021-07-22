import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/core/guards/auth.guard';
import { RecipesResolverService } from '@app/core/services/recipes-resolver.service';
import { RecipeDefaultComponent } from './recipe-default/recipe-default.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    resolve: [RecipesResolverService],
    children: [
      {
        path: '',
        component: RecipeDefaultComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
