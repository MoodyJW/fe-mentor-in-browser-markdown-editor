import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, first } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { MdFile } from '../../models/md-file.model';
import { WELCOME_FILE } from '../../constants/fake-data';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit, OnDestroy {
  menuIsOpen = true;
  user!: User;
  users$!: Observable<User[]>;
  userId: string = localStorage.getItem('id') ?? '';
  mdFiles: MdFile[] = [];
  currentMdFile!: MdFile;
  showMd = false;
  currentUser$!: Observable<User>;
  unsubscribe$ = new Subject();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (!this.userId) {
      this.createNewUser();
    }
    this.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  createNewFile(event: any): void {
    console.log('create');
  }

  private createNewUser(): void {
    this.userId = this.userService.createUserId();
    localStorage.setItem('id', this.userId);
    this.userService.createUser(this.userId);
  }

  private getCurrentUser(): void {
    this.users$ = this.userService.getUser(this.userId);
    this.users$
      .pipe(first(), takeUntil(this.unsubscribe$))
      .subscribe((userArray) => {
        this.user = userArray[0];
        this.mdFiles = this.user.mdFiles;
        const mostRecentCreatedInSeconds = this.getMostRecentCreatedDate();
        this.currentMdFile =
          this.mdFiles.find(
            (file) => file.createdAt.seconds === mostRecentCreatedInSeconds
          ) ?? WELCOME_FILE;
      });
  }

  private getMostRecentCreatedDate(): number {
    return this.mdFiles.reduce((m, v, i) =>
      v.createdAt.seconds > m.createdAt.seconds && i ? v : m
    ).createdAt.seconds;
  }
}
