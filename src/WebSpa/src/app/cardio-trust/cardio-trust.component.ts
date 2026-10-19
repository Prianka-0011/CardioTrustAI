
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MenuItem } from './components/ecg-recording/interfaces/MenuItem';
import { CommonModule } from '@angular/common';
import { CommonService } from '../shared/services/common.service';
import { ICurrentLoginUserDetail } from '../shared/services/ICurrentLoginUserDetail';

@Component({
  selector: 'app-cardio-trust',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './cardio-trust.component.html',
  styleUrl: './cardio-trust.component.scss'
})
export class CardioTrustComponent implements OnInit {

  isCollapsed = false;
  isUserMenuOpen = false;
  @HostListener('document:click')

  closeMenu() {
    this.isUserMenuOpen = false;
  }
  userDetail: ICurrentLoginUserDetail = {
    id: "",
    fullName: "",
    email: "",
    roles: []
  };

  menu: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'speedometer2',
      route: 'dashboard',
      rolesPermission: [
        // CustomCategory.RoleType.Instructor,
        // CustomCategory.RoleType.Student,
        // CustomCategory.RoleType.TA
      ],
    },
    {
      label: 'ECG Recording',
      icon: 'bi bi-person-vcard',
      route: 'ecg-recording-list',
      rolesPermission: [
        // CustomCategory.RoleType.Instructor,
        // CustomCategory.RoleType.Student,
        // CustomCategory.RoleType.TA
      ],
    },
    // { label: 'Questions', icon: 'bi bi-person-vcard', route: 'questions' },

    // {
    //   label: 'Courses',
    //   icon: 'book',
    //   isOpen: false,
    //   children: [
    //     { label: 'Course List', icon: 'list', route: 'courses' },
    //     { label: 'Create Course', icon: 'plus-circle', route: 'courses/create' }
    //   ]
    // },
   
  ];

  constructor(private router: Router, private commonService: CommonService) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.syncActiveMenu());
  }

  ngOnInit(): void {
    this.loadUserAndBuildMenu();
  }

  private loadUserAndBuildMenu(): void {
    // this.commonService.getCurrentLoginUser().subscribe(res => {
    //   this.userDetail = res;
    //   const roles = res.roles?.map(r => r.id) || [];
    //   this.menu = this.filterMenuByRoles(this.menu, roles);
    //   this.syncActiveMenu();
    // });
    this.syncActiveMenu();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSubmenu(item: MenuItem) {
    this.menu.forEach(i => {
      if (i !== item && i.children) i.isOpen = false;
    });
    item.isOpen = !item.isOpen;
  }

  private syncActiveMenu() {
    this.menu.forEach(item => {
      if (item.children) {
        item.isOpen = item.children.some(child =>
          this.router.url.includes(child.route!)
        );
      }
    });
  }

  private filterMenuByRoles(menu: MenuItem[], userRoles: string[]): MenuItem[] {
    return menu
      .map(item => {
        const hasAccess =
          !item.rolesPermission ||
          item.rolesPermission.some(r => userRoles.includes(r));

        if (!hasAccess) {
          return null;
        }

        const filteredChildren = item.children
          ? this.filterMenuByRoles(item.children, userRoles)
          : [];

        return {
          ...item,
          children: filteredChildren.length ? filteredChildren : undefined
        };
      })
      .filter(Boolean) as MenuItem[];
  }

  toggleUserMenu(event: Event) {   // <--- add this method
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.commonService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        this.router.navigate(['/auth']);
      }
    });
  }
}