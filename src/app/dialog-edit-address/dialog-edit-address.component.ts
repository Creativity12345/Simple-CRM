import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: User = new User(); //Leerer User ohne Vornamen, Nachnamen usw...
  userId: string;
  loading = false;

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  saveAddress() {
    this.loading = true;
    if (this.userId) {
      this.firestore.collection('users').doc(this.userId).update(this.user.toJSON()).then(() => {
        this.dialogRef.close();
        this.loading = false;
      });;
    } else {
      //Throw error
    }
  }
}
