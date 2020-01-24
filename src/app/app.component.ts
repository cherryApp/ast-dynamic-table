import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ast-filter-pipe';
  phrase = '';
  cols: { title: string, key: string }[] = [
    { key: 'id', title: '#' },
    { key: 'first_name', title: 'First Name' },
    { key: 'last_name', title: 'Last Name' },
    { key: 'email', title: 'Email' },
    { key: 'gender', title: 'Gender' },
    { key: 'address', title: 'Address' },
  ];
  lastDragKey = '';

  list$: Observable<any[]> = this.employeeService.get();

  constructor(
    private employeeService: EmployeeService,
  ) { }

  onHeaderDragStart(event: DragEvent) {
    this.lastDragKey = (event.target as HTMLTableHeaderCellElement).id;
  }

  onHeaderDrop(event: DragEvent) {
    event.preventDefault();
    const targetID: string = (event.target as HTMLTableHeaderCellElement).id;
    const from = this.cols.findIndex(col => col.key === this.lastDragKey);
    const to = this.cols.findIndex(col => col.key === targetID);
    const temp = Object.assign({}, this.cols[from]);
    this.cols.splice(from, 1);
    this.cols.splice(to, 0, temp);
  }

}
