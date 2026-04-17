import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-buttons',
  imports: [],
  templateUrl: './action-buttons.html',
  styleUrl: './action-buttons.scss',
})
export class ActionButtonsComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  edit() {
    this.params.context.componentParent.startEdit(this.params.data.raw);
  }

  delete() {
    this.params.context.componentParent.delete(this.params.data.raw);
  }
}
