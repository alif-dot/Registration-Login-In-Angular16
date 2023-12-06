import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatepopupComponent>,
  ) {}

  editData: any;

  ngOnInit(): void {
    this.service.getAllRole().subscribe((result) => {
      this.roleList = result;
    });
    if (this.data.userId != null && this.data.userId != '') {
      this.service.getById(this.data.userId).subscribe((result) => {
        this.editData = result;
        this.updateForm.setValue({
          id: this.editData.id,
          name: this.editData.name,
          password: this.editData.password,
          email: this.editData.email,
          gender: this.editData.gender,
          role: this.editData.role,
          isactive: this.editData.isactive,
        });
      });
    }
  }

  roleList: any;

  updateForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  });

  updateUser() {
    if(this.updateForm.valid){
      this.service.updateUser(this.updateForm.value.id, this.updateForm.value).subscribe(result => {
        this.toastr.success('Updated Successfully!');
        this.dialog.close();
      })
    }else {
      this.toastr.warning('Please Select Role!');
    }
  }
}
