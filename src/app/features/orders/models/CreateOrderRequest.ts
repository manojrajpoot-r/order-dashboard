export interface CreateOrderRequest {

  order_number: string;

  customer_name: string;

  product_code: string;

  quantity: number;

  total_amount: number;

  idempotency_key: string;

}
