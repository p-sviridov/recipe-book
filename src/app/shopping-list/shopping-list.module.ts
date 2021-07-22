import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ShoppingListRoutingModule,
    SharedModule
  ],
})
export class ShoppingListModule {}
