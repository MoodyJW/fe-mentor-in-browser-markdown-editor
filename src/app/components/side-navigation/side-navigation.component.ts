import { Component, OnInit } from '@angular/core';
import { MdFile } from 'src/app/models/md-file.model';
import { FAKE_DATA } from 'src/app/constants/fake-data';
@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
  menuIsOpen = true;
  mdFiles: MdFile[] = FAKE_DATA;
  currentMdFile: MdFile = FAKE_DATA[1];
  showMd = true;
  // probably get data here and input to children

  constructor() {}

  ngOnInit(): void {}

  createNewFile(event: any): void {
    console.log('create');
  }
}
