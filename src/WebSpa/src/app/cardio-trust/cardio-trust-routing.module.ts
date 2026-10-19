import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EcgRordingListComponent} from "./components/ecg-recording/ecg-recording-list/ecg-recording-list";
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
    path: 'ecg-recording-list',
    component: EcgRordingListComponent
  },
  
] 
