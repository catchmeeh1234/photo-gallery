import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent  implements OnInit {
  public addUserForm:FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      Emp_ID: ['', Validators.required],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      FullName: ['', Validators.required],
      Division: ['', Validators.required],
      Designation: ['', Validators.required],
      Access: ['', Validators.required],
      email: [''],
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this.addUserForm.valid);
    if (this.addUserForm.valid) {
      return this.modalCtrl.dismiss(this.addUserForm.value, 'confirm');
    } else {
      return;
    }
  }

}
