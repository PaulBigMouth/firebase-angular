import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {path: '', component: MainLayoutComponent, children: [
        {path: 'heroes', loadChildren: () => import('./modules/heroes/heroes.module').then(m => m.HeroesModule)}
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {}