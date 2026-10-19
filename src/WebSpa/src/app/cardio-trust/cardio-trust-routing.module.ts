import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";


export const CardioTrustRoutes: Routes = [
 
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'ecg-recording',
    component: DashboardComponent
  },
  
] 
