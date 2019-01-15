import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent, ProConPageComponent } from '@pages';
import { ProConResolveService } from '@services/resolvers';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'pro-con', component: ProConPageComponent, resolve: {proCon: ProConResolveService}},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
