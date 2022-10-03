import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';

import { ActionButtonComponent } from './components/action-button/action-button.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrentFileNameComponent } from './components/current-file-name/current-file-name.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { environment } from '../environments/environment';
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
    AngularFireAnalyticsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
