export interface SagaTimeline {
  id: number;
  orderId: number;
  step: string;
  status: string;
  message?: string;
  createdAt: string;
}
