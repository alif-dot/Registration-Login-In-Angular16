import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3000/user';

  // GET METHODS
  getAll() {
    return this.http.get(this.apiUrl);
  }

  getAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  getById(code: any) {
    return this.http.get(this.apiUrl + '/' + code);
  }

  getRole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }

  // POST METHODS
  proceedRegister(inputData: any) {
    return this.http.post(this.apiUrl, inputData);
  }

  // PUT METHODS
  updateUser(code: any, inputData: any) {
    return this.http.put(this.apiUrl + '/' + code, inputData);
  }

  // DELETE METHODS
  deleteUser(id: any) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
}
