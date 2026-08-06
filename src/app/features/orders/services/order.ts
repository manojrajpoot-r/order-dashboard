import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';

@Service()
export class OrderService {


  private http = inject(HttpClient);


  private apiUrl =
    `${environment.apiUrl}/orders`;



  async getOrders() {
    return await firstValueFrom(this.http.get<any>(`${environment.apiUrl}/orders`))
  }



  getOrderById(id: number): Observable<Order> {

    return this.http.get<Order>(
      `${this.apiUrl}/${id}`
    );

  }



  createOrder(order: Order): Observable<Order> {

    return this.http.post<Order>(
      this.apiUrl,
      order
    );

  }



  updateOrder(
    id: number,
    order: Order
  ): Observable<Order> {


    return this.http.put<Order>(
      `${this.apiUrl}/${id}`,
      order
    );

  }



  deleteOrder(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }


}
