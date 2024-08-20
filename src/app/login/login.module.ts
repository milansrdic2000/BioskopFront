import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '../data-access/data-access.module';
import { SharedModule } from '../shared/shared.module';
import { CookieModule } from 'ngx-cookie';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,

    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'admin',
        component: LoginComponent,
      },
    ]),
  ],
})
export class LoginModule {}
