export interface TableColumn {

  key: string;

  title: string;

  type?: 'text' | 'status' | 'date' | 'status-select' | 'action';

  width?: string;

}
