import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CompaniesService } from './services/companies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  companies: any[] = [];
  selectedCompanies: any[] = [];
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

  constructor(private  companiesService: CompaniesService) {
    this.getCompanies();
    this.deleteCompany = this.deleteCompany.bind(this);
  }

  async getCompanies() {
    const companies: any[] = [];
    this.charge = true;

    for (let i = 1; i <= 10; i ++) {
      const response = await this.companiesService.getCompanies(i).toPromise();
      companies.push(response.data);
    }

    this.companies = companies;
    this.charge = false;
  }

  onSelected(e: any, company: any) {
    if (e.checked) {
      this.selectedCompanies.push(company);
    }
    else {
      this.selectedCompanies = this.selectedCompanies.filter(item => item.entityId !== company.entityId);
    }

    this.dataSource = new MatTableDataSource(this.selectedCompanies);
    this.dataSource.sort = this.sort;
  }

  deleteCompany(company: any) {
    this.selectedCompanies = this.selectedCompanies.filter(item => item.entityId !== company.entityId);
    this.dataSource = new MatTableDataSource(this.selectedCompanies);
    this.dataSource.sort = this.sort;
  }
}