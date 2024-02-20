import { LeadsReportsService } from './leads-reports.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeadReportModel } from '../../core/model/LeadReportModel';
import { take } from 'rxjs';

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
  displayedColumns: string[] = ['checkbox', 'download', 'id', 'name', 'source'];
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

    let month = this.reportForm.controls['month'].value;
    let year = this.reportForm.controls['year'].value;

    if (month.length === 0 || year.length === 0) {
      return;
    }

    this.dataSource.data.forEach(row => {
    if (this.selection.isSelected(row)) {
        this.generateOne(row);
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

  generateOne(row: LeadReportModel) {

    let month = this.reportForm.controls['month'].value;
    let year = this.reportForm.controls['year'].value;

    if (month.length === 0 || year.length === 0) {
      return;
    }

    let reportIdentifier: string = '';
    let reportName: string = '';


    reportName = row.reportName.replace('[YEAR]', year).replace('[MONTH]', month);
    reportIdentifier = row.identifier;

    this.leadsReportsService.generateSelectedReport(month,
                                                    year,
                                                    reportIdentifier)
    .subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);

      const link = document.createElement('a');
      link.href = url;
      link.download = reportName;
      link.click();

      window.URL.revokeObjectURL(url);
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
