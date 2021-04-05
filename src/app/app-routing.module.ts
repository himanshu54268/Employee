import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { FirstComponent } from './first/first.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'first', component: FirstComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
