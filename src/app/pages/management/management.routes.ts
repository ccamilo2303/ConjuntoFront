import { Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { ResidentComponent } from './resident/resident.component';
import { UnitComponent } from './unit/unit.component';
import { ConceptComponent } from './concept/concept.component';
import { NoticeComponent } from './notice/notice.component';

export default [
    { path: 'requests', component: RequestComponent },
    { path: 'residents', component: ResidentComponent },
    { path: 'units', component: UnitComponent },
    { path: 'concepts', component: ConceptComponent },
    { path: 'notices', component: NoticeComponent },
    { path: '', redirectTo: 'residents', pathMatch: 'full' },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
