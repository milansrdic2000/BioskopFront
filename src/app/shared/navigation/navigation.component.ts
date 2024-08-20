import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isAuthenticated: boolean;
  @Input() isAdmin = false;

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logOff() {
    this.authService.logOff();
    this.router.navigate([this.isAdmin ? '/login/admin' : '/login']);
  }
}
