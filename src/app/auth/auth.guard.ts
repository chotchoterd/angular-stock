import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (auth.isLoggedIn()) {
    if (state.url == '/login' || state.url == '/register') {
      router.navigate(['dashboard']);
    }
    return true;
  } else {
    if (state.url != '/login' && state.url != '/register') {
      router.navigate(['login']);
    }
    return true;
  }
};
