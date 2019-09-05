import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import components
import { SetupPageComponent } from './pages/setup-page/setup-page.component';

const routes: Routes = [
  { path: '', component: SetupPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
