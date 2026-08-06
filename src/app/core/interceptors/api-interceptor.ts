import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { SnackbarService } from '../../shared/services/snackbar/snackbar.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  const loader = inject(LoaderService);
  const snackbar = inject(SnackbarService);

  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  loader.show();

  return next(req).pipe(
    catchError((error) => {
      snackbar.error(error.error?.message || 'Something went wrong');
      return throwError(() => error);
    }),
    finalize(() => loader.hide())
  );
};
