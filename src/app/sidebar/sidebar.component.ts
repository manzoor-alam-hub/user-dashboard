import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public isAdmin = false;

  constructor(private appService: AppService) { 
    this.appService.isAdminUser.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
      
    });
  }

  ngOnInit() {
   
  }

}
