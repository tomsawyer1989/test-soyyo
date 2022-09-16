import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-check-list-companies',
  templateUrl: './check-list-companies.component.html',
  styleUrls: ['./check-list-companies.component.css']
})
export class CheckListCompaniesComponent implements OnInit {
  @Input() companies: Company[] = [];
  // @Output() selectedCompanies: Company[] = [];
  @Output() addCompaniesEvent = new EventEmitter();
  @Input() selectedCompanies: Company[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(e: any, company: Company) {
    this.addCompaniesEvent.emit({ e, company });
  }

  isCompany(value: string) {
    return this.selectedCompanies.some((item) => item.entityId === value);
  }
}