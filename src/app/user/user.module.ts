import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
    declarations: [
        UserListComponent,
        UserUpdateComponent,
    ],
    imports: [RouterModule, CommonModule, FormsModule, UserRoutingModule]
})
export class UserModule{

}