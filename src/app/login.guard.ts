import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  console.log(route);
  console.log(state);
  return true;
};
