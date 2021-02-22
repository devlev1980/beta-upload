import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/upload',
    pathMatch: 'full'
  },
  {
    path: 'upload',
    loadChildren: () => import('../app/upload-files/upload-files.module').then(m => m.UploadFilesModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../app/about/about/about.module').then(m => m.AboutModule)
  },
  {
    path: '**',
    redirectTo: '/upload',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
