import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_MODULES } from '../../../shared/components/material/material';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  private authService = inject(AuthService);
  private dialog = inject(MatDialog);


  appName = 'TechSaga Admin';
  userName = 'Admin';




  logout() {

    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '350px',
        data: {
          title: 'Logout',
          message: 'Are you sure you want to logout?'
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.authService.logout();
      }

    });

  }

}
