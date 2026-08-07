export interface TableAction {

  name: 'view' | 'edit' | 'delete' | 'status';

  label: string;

  icon: string;

}
