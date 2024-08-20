import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BASE_PATH, BaseDataAccessService } from './base-data-access.service';
import { LoginService } from './users/login.service';
import { UsersService } from './users/users.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [BaseDataAccessService, LoginService, UsersService],
})
export class DataAccessModule {}
