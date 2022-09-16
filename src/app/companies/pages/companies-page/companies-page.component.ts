import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.css']
})
export class CompaniesPageComponent implements OnInit {
  companies: Company[] = [];
  selectedCompanies: Company[] = [];
  charge: boolean = false;

  constructor(private  companiesService: CompaniesService) { }

  ngOnInit(): void {
    this.getCompanies();
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

  onSelected(value: any) {
    if (value.e.checked) {
      this.selectedCompanies = [... this.selectedCompanies, value.company];
    }
    else {
      this.selectedCompanies = this.selectedCompanies.filter(item => item.entityId !== value.company.entityId);
    }
  }

  deleteCompanies(company: any) {
    this.selectedCompanies = this.selectedCompanies.filter(item => item.entityId !== company.entityId);
  }
}