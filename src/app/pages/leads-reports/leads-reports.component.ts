import { SelectionModel } from '@angular/cdk/collections';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface LeadReport {
  checkbox: boolean;
  name: string;
  number: number;
}

const REPORT_DATA: LeadReport[] = [
  {checkbox: false, number: 1, name: 'Relatorio 1'},
  {checkbox: false, number: 2, name: 'Relatorio 2'},
  {checkbox: false, number: 3, name: 'Relatorio 3'},
  {checkbox: false, number: 4, name: 'Relatorio 4'},
  {checkbox: false, number: 5, name: 'Relatorio 5'},
  {checkbox: false, number: 6, name: 'Relatorio 6'},
  {checkbox: false, number: 7, name: 'Relatorio 7'},
  {checkbox: false, number: 8, name: 'Relatorio 8'},
  {checkbox: false, number: 9, name: 'Relatorio 9'},
  {checkbox: false, number: 10, name: 'Relatorio 10'},
];

@Component({
  selector: 'app-leads-reports',
  templateUrl: './leads-reports.component.html',
  styleUrl: './leads-reports.component.css'
})
export class LeadsReportsComponent {

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }

  selection = new SelectionModel<LeadReport>(true, []);
  dataSource: MatTableDataSource<LeadReport>;
  displayedColumns: string[] = ['number', 'name', 'checkbox'];
  reportForm!: FormGroup;

  checked = [];

  constructor(private router: Router,
    private fb: FormBuilder) {
    this.createForm();
    this.dataSource = new MatTableDataSource(REPORT_DATA);
  }

  createForm() {
    this.reportForm = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  gerar() {
    console.log(this.reportForm.controls['month'].value);
    console.log(this.reportForm.controls['year'].value);
  }
}
