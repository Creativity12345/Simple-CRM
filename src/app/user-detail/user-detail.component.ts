import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userId = '';
  user:User = new User();

  constructor(public dialog: MatDialog, private route:ActivatedRoute, private firestore: AngularFirestore){}

  ngOnInit():void {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id');
      this.getUser();
    })
  }

  getUser(){
    this.firestore.collection('users').doc(this.userId).valueChanges().subscribe((userT: any) => {
      this.user = new User(userT);
    });
  }

  editName(){
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editAdress(){
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
