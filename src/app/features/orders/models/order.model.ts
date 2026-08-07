export interface Order {

  id?: number;

  orderNumber: string;
  customerName: string;
  productCode: string;
  quantity: number;
  totalAmount: number;
  status: string;

  createdAt?: string;

}
