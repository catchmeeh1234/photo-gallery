import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { AddUserModalComponent } from '../modals/add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public users:any;
  message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(private userService:UserService, private modalCtrl:ModalController) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.fetchUsers()
    .subscribe((res:any) => {
      this.users = res;
    });
  }

  deleteUser(userID:string) {
    console.log(userID);

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userID) {
        this.users.splice(i, 1);
        break; // Exit the loop after removing the item
      }
    }
  }

  async openAddUserModal() {
    const modal = await this.modalCtrl.create({
      component: AddUserModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
      this.message = `Hello, ${data}!`;
      this.userService.addUser(data)
      .subscribe((res:any) => {
        if (res.status === "success") {
          this.loadUsers();
        }
      });
    }
  }

  // onAddUser() {
  //   this.userService.addUser()
  //   .subscribe(data => {
  //     console.log(data);
  //   });
  // }
}
