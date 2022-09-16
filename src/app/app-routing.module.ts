import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./companies/companies.module').then((m) => m.CompaniesModule)
    },
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        useHash: false
      }),
    ],
    exports: [RouterModule],
  })
export class AppRoutingModule {}