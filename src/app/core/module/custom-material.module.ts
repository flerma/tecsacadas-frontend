import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule
  ],
  exports: [
    CommonModule,
     MatToolbarModule,
     MatButtonModule,
     MatCardModule,
     MatInputModule,
     MatDialogModule,
     MatTableModule,
     MatMenuModule,
     MatIconModule,
     MatProgressSpinnerModule,
     MatProgressBarModule,
     MatSnackBarModule,
     FlexLayoutModule,
     MatSidenavModule,
     MatListModule,
     MatExpansionModule,
     RouterModule,
     MatTableModule,
     MatPaginatorModule,
     MatCheckboxModule
     ]
})
export class CustomMaterialModule { }
