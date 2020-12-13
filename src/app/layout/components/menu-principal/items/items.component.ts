import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/pages/accounts/interfaces/account';

@Component({
  selector: 'mvd-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  instructor: boolean= false;
  admin: boolean= false;
  

  constructor(
    private authService: AuthService
  ) {

   }

  ngOnInit(): void {
    const role_id = JSON.parse(localStorage.getItem('typeU'));
        
        switch (role_id) {
          // case 1: this.user = true;
          //   break;

          case 1: this.instructor = true
            break;

          case 3: this.admin = true
            break;

          default: this.instructor = true 
            break;
        }

  }


}
