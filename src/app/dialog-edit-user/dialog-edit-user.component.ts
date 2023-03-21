import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user: User = new User();
  userId: string;
  birthDate: Date;
  loading = false;

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogEditUserComponent>) { }

  saveUser() {
    this.loading = true;
    if (this.userId) {
      this.firestore.collection('users').doc(this.userId).update(this.user.toJSON()).then(() => {
        this.dialogRef.close();
        this.loading = false;
      });
    } else {
      //Throw error
    }
  }
}
