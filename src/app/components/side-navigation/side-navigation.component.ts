import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { MdFile, NewMdFileData } from '../../models/md-file.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FilesService } from 'src/app/services/files.service';
import { SCREEN_WIDTHS } from 'src/app/constants/screen-sizes';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit, OnDestroy {
  showMd = true;
  menuIsOpen = true;
  isLoading = true;
  userId: string = localStorage.getItem('inBrowserMarkdownId') ?? '';
  currentUser: User;
  unsubscribe$ = new Subject();
  isLargeScreen = false;

  constructor(
    private userService: UserService,
    private filesService: FilesService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isLargeScreen = window.innerWidth > SCREEN_WIDTHS.DESKTOP_MIN;
  }

  ngOnInit(): void {
    this.isLargeScreen = window.innerWidth > SCREEN_WIDTHS.DESKTOP_MIN;
    if (!this.userId) {
      this.createNewUser();
    }
    this.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  createNewFile(): void {
    if (this.currentUser.currentMdFile) {
      const autosaveFile = {
        currentMdFile: this.currentUser.currentMdFile,
        newMdFileName: this.currentUser.currentMdFile.name,
      };
      this.saveCurrentMdFile(autosaveFile, true);
    } else
      this.filesService.createNewFile(
        this.currentUser.id,
        this.currentUser.mdFiles
      );
  }

  switchCurrentMdFile(mdFile: MdFile): void {
    if (this.currentUser.currentMdFile.id === mdFile.id) return;
    const autosaveFile = {
      currentMdFile: this.currentUser.currentMdFile,
      newMdFileName: this.currentUser.currentMdFile.name,
    };
    this.saveCurrentMdFile(autosaveFile);
    this.filesService.changeCurrentFile(this.userId, mdFile);
  }

  saveCurrentMdFile(newMdFileData: NewMdFileData, createNewFile = false): void {
    const updatedMdFiles = this.currentUser.mdFiles.map((mdFile: MdFile) =>
      mdFile.id === newMdFileData.currentMdFile.id
        ? {
            ...newMdFileData.currentMdFile,
            name: newMdFileData.newMdFileName ?? mdFile.name,
            content: newMdFileData.currentMdFile.content,
          }
        : mdFile
    );
    const updatedCurrentUser = {
      ...this.currentUser,
      currentMdFile: {
        ...newMdFileData.currentMdFile,
        name:
          newMdFileData.newMdFileName ?? this.currentUser.currentMdFile.name,
      },
      mdFiles: updatedMdFiles,
    };
    this.filesService.saveFile(updatedCurrentUser);
    if (createNewFile)
      this.filesService.createNewFile(
        updatedCurrentUser.id,
        updatedCurrentUser.mdFiles
      );
  }

  toggleSidenav(event: string): void {
    this.menuIsOpen = event === 'open' ? true : false;
  }

  private createNewUser(): void {
    this.userId = this.userService.createUserId();
    this.userService.createUser(this.userId);
  }

  private getCurrentUser(): void {
    const users$: Observable<User[]> = this.userService.getUsers(this.userId);
    users$
      .pipe(
        filter((users: User[]) => !!users.length),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((users: User[]) => {
        this.currentUser = users[0];
        this.isLoading = false;
      });
  }
}
