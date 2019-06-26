import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'manageTab',
        children: [
          {
            path: '',
            loadChildren: '../manageTab/manageTab.module#manageTabPageModule'
          }
        ]
      },
      {
        path: 'warsTab',
        children: [
          {
            path: '',
            loadChildren: '../warsTab/warsTab.module#warsTabPageModule'
          }
        ]
      },
      {
        path: 'profileTab',
        children: [
          {
            path: '',
            loadChildren: '../profileTab/profileTab.module#profileTabPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/manageTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/warsTab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
