import { Component, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from './interfaces/company.interface';
import { CompaniesService } from './services/companies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  companies: Company[] = [];
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
  dataSource: any = [];
  charge: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private  companiesService: CompaniesService, public dialog: MatDialog) {
    this.getCompanies();
    this.deleteCompany = this.deleteCompany.bind(this);
    this.openEditCompany = this.openEditCompany.bind(this);
  }

  async getCompanies() {
    const companies: Company[] = [];
    this.charge = true;

    for (let i = 1; i <= 10; i ++) {
      const response = await this.companiesService.getCompanies(i).toPromise();
      companies.push(response.data);
    }

    this.companies = companies;
    this.charge = false;
  }

  onSelected(e: any, company: Company) {
    if (e.checked) {
      this.selectedCompanies.push(company);
    }
    else {
      this.selectedCompanies = this.selectedCompanies.filter(item => item.entityId !== company.entityId);
    }

    this.dataSource = new MatTableDataSource(this.selectedCompanies);
    this.dataSource.sort = this.sort;
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

    dialogRef.afterClosed().subscribe(result => {
      result && console.log('The dialog was closed ', result);
    });
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
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