import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';
import { CreateOrderRequest } from '../models/CreateOrderRequest';

@Service()
export class OrderService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/orders`;



  async getOrders() {
    return await firstValueFrom(this.http.get<any>(`${environment.apiUrl}/orders`))
  }



  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createOrder(payload: CreateOrderRequest): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/create`,
      payload
    );
  }

  updateOrder(id: number, payload: CreateOrderRequest): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/update/${id}`,
      payload
    );
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/status/${id}`,
      { status }
    );
  }

  cancelOrder(order_number: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/cancel`,
      {
        order_number
      }
    );
  }

  getTimeline(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${id}/timeline`
    );
  }

  importOrders(
    formData: FormData
  ) {

    return this.http.post<any>(
      `${this.apiUrl}/import`,

      formData

    );

  }
}





