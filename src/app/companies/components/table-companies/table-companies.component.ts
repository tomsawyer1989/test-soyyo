import { Component, OnInit, ViewChild, Input, Output, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-table-companies',
  templateUrl: './table-companies.component.html',
  styleUrls: ['./table-companies.component.css']
})
export class TableCompaniesComponent implements OnInit {
  @Output() deleteCompaniesEvent = new EventEmitter();
  @Output() editCompaniesEvent = new EventEmitter();
  @Input() set data(value: Company[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.sort = this.sort;
  }
  selectedCompanies: Company[] = [];
  displayedColumns: string[] = [
    'entityId',
    'name',
    'identificationNumber',
    'expirationDate',
    'contactName',
    'contactMail',
    'ipAddress',
    'logo',
    'actions'
  ];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  deleteCompany(company: Company) {
    this.deleteCompaniesEvent.emit(company);
  }

  openEditCompany(company: Company) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { company }
    });

    dialogRef.afterClosed().subscribe((result: Company) => {
      if (result) {
        this.editCompaniesEvent.emit(result);
      }
    });
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  company: Company;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.company = { ...this.data.company };
  }

  onNoClick() {
    this.dialogRef.close();
  }
}