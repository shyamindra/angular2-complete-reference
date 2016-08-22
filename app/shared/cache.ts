import {Injectable} from '@angular/core';

@Injectable()
export class Cache {
  _isLoggedIn: boolean = false;
  _token: string;
  _userId: string;
  
  constructor(){
  }

  isUserLoggedIn(){
    return this._isLoggedIn;
  }

  setIsLoggedIn(isLoggedIn: boolean){
    this._isLoggedIn = isLoggedIn;
  }

  getToken() {
    return this._token;
  }
  setToken(value) {
    this._token = value;
  }
  
  getUserId(){
    return this._userId;
  }
  
  setUserId(user: string){
    this._userId = user;
  }
}