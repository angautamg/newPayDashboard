import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private hasToken(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  login(email: string, password: string): boolean {
    if (email && password) {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('authToken', 'dummy-token-' + Date.now());
        localStorage.setItem('userEmail', email);
      }
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    if (name && email && password) {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('authToken', 'dummy-token-' + Date.now());
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
      }
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
    }
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getUserEmail(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('userEmail') || '';
    }
    return '';
  }

  getUserName(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('userName') || 'User';
    }
    return 'User';
  }
}
