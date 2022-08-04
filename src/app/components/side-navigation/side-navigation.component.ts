import { Component, OnInit } from '@angular/core';
import { MdFile } from 'src/app/models/md-file.model';
import { FAKE_DATA } from 'src/app/constants/fake-data';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/app.component';
@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
  menuIsOpen = true;
  mdFiles: MdFile[] = FAKE_DATA;
  currentMdFile: MdFile = FAKE_DATA[1];
  showMd = false;
  currentUser$!: Observable<User>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // use service to get user here, will probably have to check local for id first
    // if id, get user
    // if no id, create user
    // using the key as id, so might have to manually create the key
    // then assign to id prop
    // this.userService.getUser();
    // after user is set, then need to set values for md files
  }

  createNewFile(event: any): void {
    console.log('create');
  }
}
