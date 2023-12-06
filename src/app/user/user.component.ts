import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { DeletepopupComponent } from '../deletepopup/deletepopup.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor(private service: AuthService, private dialog: MatDialog) {
    this.loadUser();
  }

  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadUser() {
    this.service.getAll().subscribe((result) => {
      this.userList = result;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'role',
    'status',
    'action',
  ];

  updateUser(id: any) {
    this.openUpdateUserDialog(id);
  }

  deleteUser(id: any) {
    this.openDeleteUserDialog(id);
  }

  openUpdateUserDialog(id: any) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '400ms',
      width: '50%',
      data: {
        userId: id,
      },
    });

    popup.afterClosed().subscribe((result) => {
      this.loadUser();
    });
  }

  openDeleteUserDialog(id: any) {
    const popup = this.dialog.open(DeletepopupComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '400ms',
      width: '50%',
      data: {
        userId: id,
      },
    });

    popup.afterClosed().subscribe((result) => {
      this.loadUser();
    });
  }
}
