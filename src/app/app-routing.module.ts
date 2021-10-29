import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
    { path: '', component: ListViewComponent },
    { path: 'view/:name', component: DetailViewComponent },
    { path: '**', component: ListViewComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
