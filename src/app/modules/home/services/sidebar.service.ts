import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor() {}

  public get isSidebarOpened(): boolean {
    const isOpened = JSON.parse(localStorage.getItem('isSidebarOpened'));

    if (isOpened) {
      return isOpened.value;
    }

    return false;
  }

  public set isSidebarOpened(value: boolean) {
    localStorage.setItem('isSidebarOpened', JSON.stringify({ value }));
  }
}
