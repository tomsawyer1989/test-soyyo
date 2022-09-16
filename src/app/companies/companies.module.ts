import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CompaniesRoutingModule } from './companies-routing.module';
import { DialogComponent, TableCompaniesComponent } from './components/table-companies/table-companies.component';
import { CheckListCompaniesComponent } from './components/check-list-companies/check-list-companies.component';
import { CompaniesPageComponent } from './pages/companies-page/companies-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    TableCompaniesComponent,
    CheckListCompaniesComponent,
    CompaniesPageComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [
    DialogComponent
  ],
})
export class CompaniesModule { }
