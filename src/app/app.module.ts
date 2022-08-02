import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { ActionButtonComponent } from './components/action-button/action-button.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrentFileNameComponent } from './components/current-file-name/current-file-name.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { MdContentComponent } from './components/md-content/md-content.component';
import { MdFileComponent } from './components/md-file/md-file.component';
import { MdFilesListComponent } from './components/md-files-list/md-files-list.component';
import { PreviewBarComponent } from './components/preview-bar/preview-bar.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    ActionButtonComponent,
    AppComponent,
    CurrentFileNameComponent,
    DeleteModalComponent,
    HeaderComponent,
    MdContentComponent,
    MdFileComponent,
    MdFilesListComponent,
    PreviewBarComponent,
    SideNavigationComponent,
    ThemeToggleComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
