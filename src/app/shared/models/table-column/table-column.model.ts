export interface TableColumn {

  key: string;

  title: string;

  type?: 'text' | 'status' | 'date' | 'action';

  width?: string;

}
