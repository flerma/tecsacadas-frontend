import { LeadsReportsService } from './leads-reports.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeadReportModel } from '../../core/model/LeadReportModel';

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

  selection = new SelectionModel<LeadReportModel>(true, []);
  dataSource: MatTableDataSource<LeadReportModel>;
  displayedColumns: string[] = ['checkbox', 'id', 'name', 'source'];
  reportForm!: FormGroup;

  checked = [];

  constructor(private router: Router,
    private fb: FormBuilder,
    private leadsReportsService: LeadsReportsService) {
    this.createForm();
    this.dataSource = new MatTableDataSource();
    this.loadReports();
  }

  createForm() {
    this.reportForm = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required, [Validators.min(2023), Validators.min(2100)]]
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

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  generateSelected() {

    if (this.reportForm.invalid) {
      return;
    }

    let reportList: string[] = [];

    this.dataSource.data.forEach(row => {
      if (this.selection.isSelected(row)) {
        reportList.push(row.identifier);
      }
    });

    this.leadsReportsService.generateSelectedReports(this.reportForm.controls['month'].value,
                                             this.reportForm.controls['year'].value,
                                             reportList).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  formInvalid() {
    const invalid = [];
    const controls = this.reportForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid.length > 0;
  }

  generateOne() {

    let reportIdentifier: string = '';

    this.dataSource.data.forEach(row => {
      if (this.selection.isSelected(row)) {
        reportIdentifier = row.identifier;
      }
    });

    this.leadsReportsService.generateSelectedReport(this.reportForm.controls['month'].value,
                                                    this.reportForm.controls['year'].value,
                                                    reportIdentifier)
                                                    .subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadReports() {

    this.leadsReportsService.getReports().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log(this.dataSource.data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
