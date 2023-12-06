import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  result: any;

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      //   this.service.proceedRegister(this.loginForm.value).subscribe(result => {
      //     console.log(result);
      //     this.toastr.success('Please contact admin for enable access.','Registered Successfully')
      //     this.router.navigate(['login'])
      //   });
      // } else {
      //   this.toastr.warning('Please enter valid data.')
      // }

      this.service
        .getById(this.loginForm.value.username)
        .subscribe((result: any) => {
          this.result = result;
          console.log(this.result);

          if(this.result.password === this.loginForm.value.password){
            if(this.result.isactive){
              sessionStorage.setItem('username', this.result.id);
              sessionStorage.setItem('role', this.result.role);
              this.router.navigate([''])
            }else{
              this.toastr.error('Please Contact Admin!', 'Inactive User')
            }
          }else {
            this.toastr.error('Invalid Credentials!')
          }
        });
    }
  }
}
