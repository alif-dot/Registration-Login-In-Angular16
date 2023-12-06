import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-deletepopup',
  templateUrl: './deletepopup.component.html',
  styleUrls: ['./deletepopup.component.css'],
})
export class DeletepopupComponent {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private dialog: MatDialogRef<DeletepopupComponent>,
    private toastr: ToastrService,
  ) {}

  id: any;

  deleteForm = this.builder.group({
    id: this.builder.control(''),
  });

  deleteUser(){
    console.log('deleteUser() method called');
    console.log('id value:', this.deleteForm.value.id);
    this.service.deleteUser(this.deleteForm.value.id).subscribe(result => {
      console.log('deleteUser() API call successful');
      this.toastr.success('Deleted Successfully!');
      this.dialog.close();
    });
  }
}
