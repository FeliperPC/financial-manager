import { computed, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoggedUser {
  private readonly state = signal<User | null>(null);

  // this returns the user object, can be null or the hole object
  loggedUser = computed(() => this.state());

  // returns if the user is logged or not
  isLoggedIn = computed(() => this.state() !== null);

  // call this method to create a store
  setUser(user: User) {
    this.state.set(user);
  }

  // call this method to clear the store
  logout() {
    this.state.set(null);
  }
}
