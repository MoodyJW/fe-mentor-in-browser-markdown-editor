import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { MdFileComponent } from './components/md-file/md-file.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrentFileNameComponent } from './components/current-file-name/current-file-name.component';
import { PreviewBarComponent } from './components/preview-bar/preview-bar.component';
import { MdContentComponent } from './components/md-content/md-content.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavigationComponent,
    ActionButtonComponent,
    MdFileComponent,
    HeaderComponent,
    CurrentFileNameComponent,
    PreviewBarComponent,
    MdContentComponent,
    DeleteModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
