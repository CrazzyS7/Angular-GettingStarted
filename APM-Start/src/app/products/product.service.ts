import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { iProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor( private http: HttpClient ) {

  }

  getProduct(): Observable<iProduct[]> {
    return this.http.get<iProduct[]>(this.productUrl).pipe(
      tap( data => console.log( 'All: ' + JSON.stringify( data ))),
      catchError( this.handleError )
    );
  }

  private handleError( err: HttpErrorResponse ) {
    let errorMessage = '';
    if( err.error instanceof ErrorEvent ) {
      // in a real world app, we may send the server to some remote logging infrastrure
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else{
      // the backend returned an unsucceful response code
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }

    console.log( errorMessage );
    return throwError( errorMessage );
  }
}