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
  @Output() selectedCompanies = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(e: any, company: Company) {
    this.selectedCompanies.emit({ e, company });
  }
}