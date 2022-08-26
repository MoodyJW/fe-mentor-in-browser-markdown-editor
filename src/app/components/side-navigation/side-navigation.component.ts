import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { MdFile } from '../../models/md-file.model';
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
  currentUser: User;
  unsubscribe$ = new Subject();

  constructor(
    private userService: UserService,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    if (!this.userId) {
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

  changeCurrentMdFile(mdFile: MdFile): void {
    this.filesService.updateCurrentFile(this.userId, mdFile);
  }

  private createNewUser(): void {
    this.userId = this.userService.createUserId();
    this.userService.createUser(this.userId);
  }

  private getCurrentUser(): void {
    const users$: Observable<User[]> = this.userService.getUsers(this.userId);
    users$
      .pipe(
        filter((users) => !!users),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((users) => {
        this.currentUser = users.find((user) => user.id === this.userId);
        if (!this.currentUser) return;
        this.isLoading = false;
      });
  }
}
