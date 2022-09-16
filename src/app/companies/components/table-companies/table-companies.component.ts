import { Component, OnInit, ViewChild, Input, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-table-companies',
  templateUrl: './table-companies.component.html',
  styleUrls: ['./table-companies.component.css']
})
export class TableCompaniesComponent implements OnInit, OnChanges {
  @Input() selectedCompanies: Company[] = [];
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
  dataSource: any = [];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    // this.deleteCompany = this.deleteCompany.bind(this);
    // this.openEditCompany = this.openEditCompany.bind(this);
  }

  ngOnInit(): void {
    console.log('tablaaaa ', this.selectedCompanies);
    // this.dataSource = new MatTableDataSource(this.selectedCompanies);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('tablaaaa 2', this.selectedCompanies);
  }

  deleteCompany(company: Company) {
    this.selectedCompanies = this.selectedCompanies.filter(item => item.entityId !== company.entityId);
    this.dataSource = new MatTableDataSource(this.selectedCompanies);
    this.dataSource.sort = this.sort;
  }

  openEditCompany(company: Company) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { company }
    });

    dialogRef.afterClosed().subscribe((result: Company) => {
      if (result) {
        const selectedCompanies = [...this.selectedCompanies];

        selectedCompanies.forEach((item, index) => {
          if (item.entityId === result.entityId) {
            selectedCompanies[index] = { ...result };
          }
        });

        this.selectedCompanies = selectedCompanies;
        this.dataSource = new MatTableDataSource(this.selectedCompanies);
        this.dataSource.sort = this.sort;
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