import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user = new User();
  allUsers = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore){}

  ngOnInit(): void {
    this.firestore
    .collection('users') //Sammlung aus firestore angeben
    .valueChanges() //wenn sich etwas in der Datenbank ändert wird die Sammlung automatisch neu abonniert und aktualisiert
    .subscribe((changes: any) => {
      console.log(changes);
      this.allUsers = changes;
    });
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }
}