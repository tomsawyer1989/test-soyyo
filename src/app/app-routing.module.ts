import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./companies/companies.module').then((m) => m.CompaniesModule),
        // component: LayoutComponent,
        // children: [
        //     {
        //         path: '',
        //         redirectTo: '/home',
        //         pathMatch: 'full',
        //     },
        //     {
        //         path: 'home',
                // loadChildren: () =>
                //     import('./home/home.module').then((m) => m.HomeModule),
        //     }
        // ],
    },
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        useHash: false,
        // initialNavigation: 'enabled',
      }),
    ],
    exports: [RouterModule],
  })
export class AppRoutingModule {}