import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { SnackbarService } from '../../shared/services/snackbar/snackbar.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {


  const loader = inject(LoaderService);

  const snackbar = inject(SnackbarService);



  loader.show();


  return next(req)

    .pipe(

      catchError((error) => {


        let message = 'Something went wrong';


        if (error.error?.message) {

          message = error.error.message;

        }


        snackbar.error(message);


        return throwError(() => error);


      }),


      finalize(() => {

        loader.hide();

      })

    );


};
