import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, filter } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { MdFile } from '../../models/md-file.model';
import { WELCOME_FILE } from '../../constants/default-file';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit, OnDestroy {
  showMd = false;
  menuIsOpen = true;
  isLoading = true;
  userId: string = localStorage.getItem('inBrowserMarkdownId') ?? '';
  mdFiles: MdFile[] = [];
  currentMdFile$!: Observable<MdFile>;
  unsubscribe$ = new Subject();

  get mostRecentCreatedDate(): number {
    return this.mdFiles.reduce((m, v, i) =>
      v.createdAt.seconds > m.createdAt.seconds && i ? v : m
    ).createdAt.seconds;
  }

  constructor(private userService: UserService) {}

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

  createNewFile(event: any): void {
    console.log('create new file');
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
        const currUser = users.find((user) => user.id === this.userId);
        if (!currUser) return;
        this.getMdFiles(currUser);
      });
  }

  private getMdFiles(currentUser: User): void {
    this.mdFiles = currentUser.mdFiles;
    const mostRecentCreatedDateInSeconds = this.mostRecentCreatedDate;
    const curr = this.mdFiles.find(
      (file) => file.createdAt.seconds === mostRecentCreatedDateInSeconds
    );
    this.currentMdFile$ = of(curr ?? WELCOME_FILE);
    this.isLoading = false;
  }
}
