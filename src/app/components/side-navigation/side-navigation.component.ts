import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, filter } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { MdFile } from '../../models/md-file.model';
import { WELCOME_FILE } from '../../constants/default-file';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FilesService } from 'src/app/services/files.service';

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
  mdFiles: MdFile[] = [];
  currentMdFile$!: Observable<MdFile>;
  currentUser!: User;
  unsubscribe$ = new Subject();

  constructor(
    private userService: UserService,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    if (!this.userId) {
      console.log('no user id');
      this.createNewUser();
    }
    this.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  createNewFile(): void {
    this.filesService.createNewFile(
      this.currentUser.id,
      this.currentUser.mdFiles
    );
  }

  private createNewUser(): void {
    this.userId = this.userService.createUserId();
    this.userService.createUser(this.userId);
    console.log(this.userId, 'create new user');
  }

  private getCurrentUser(): void {
    const users$ = this.userService.getUsers(this.userId);
    users$
      .pipe(
        filter((users) => !!users),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((users) => {
        this.currentUser = users.find((user) => user.id === this.userId);
        if (!this.currentUser) return;
        this.getMdFiles(this.currentUser);
      });
  }

  private getMdFiles(currentUser: User): void {
    this.mdFiles = currentUser.mdFiles;
    const mostRecentCreatedDateInSeconds = this.getMostRecentCreatedDate();
    if (mostRecentCreatedDateInSeconds) {
      const recentFile =
        this.mdFiles.find(
          (file) => file.createdAt.seconds === mostRecentCreatedDateInSeconds
        ) ?? WELCOME_FILE;
      this.currentMdFile$ = of(recentFile);
    }
    this.isLoading = false;
  }

  private getMostRecentCreatedDate(): number {
    if (!this.mdFiles.length) {
      return null;
    }
    return this.mdFiles.reduce((m, v, i) =>
      v.createdAt.seconds > m.createdAt.seconds && i ? v : m
    ).createdAt.seconds;
  }
}
