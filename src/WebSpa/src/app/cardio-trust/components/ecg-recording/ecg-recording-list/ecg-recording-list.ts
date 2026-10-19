
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { SideDrawerComponent } from '../../../../shared/components/side-drawer/side-drawer.component';
import { RecordingService } from '../services/recording';
import { IRecording } from '../interfaces/IRecording';
import { CustomCategory } from '../../../../shared/interface/customCategory';


@Component({
  selector: 'app-recording-list',
  imports: [
    CommonModule,
    FormsModule,
    SideDrawerComponent,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule
  ],
  templateUrl: './ecg-recording-list.html',
  styleUrl: './ecg-recording-list.scss'
})

export class EcgRordingListComponent implements OnInit {
  constructor(
    private recordingService: RecordingService,
    private router: Router
  ) { }

  recordings: IRecording[] = [];
  filteredRecordings: IRecording[] = [];
  pagedRecordings: IRecording[] = [];

  selectedRecordingId: string | null = null;
  drawerOpen = false;
  searchText = '';

  pageSizeOptions = [5, 10, 20];
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;

  sortColumn: keyof IRecording | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.getRecordings();
  }

  getRecordings(): void {
    this.recordingService.getRecordings().subscribe({
      next: data => {
        this.recordings = data.filter(recording => !recording.isDeleted);
        this.applyFilter();
      },
      error: error => console.error('Failed to load recordings:', error)
    });
  }

  openCreateDrawer(): void {
    this.selectedRecordingId = null;
    this.drawerOpen = true;

    this.router.navigate([], {
      queryParams: {
        id: '00000000-0000-0000-0000-000000000000'
      },
      queryParamsHandling: 'merge'
    });
  }

  openEditDrawer(id: string): void {
    this.selectedRecordingId = id;
    this.drawerOpen = true;

    this.router.navigate([], {
      queryParams: { id },
      queryParamsHandling: 'merge'
    });
  }

  closeDrawer(): void {
    this.drawerOpen = false;
    this.selectedRecordingId = null;

    this.router.navigate([], {
      queryParams: { id: undefined },
      queryParamsHandling: 'merge'
    });
  }

  onRecordingSaved(): void {
    this.closeDrawer();
    this.getRecordings();
  }

  applyFilter(): void {
    const value = this.searchText.toLowerCase().trim();

    this.filteredRecordings = this.recordings.filter(recording =>
      recording.patientReference.toLowerCase().includes(value) ||
      recording.fileName.toLowerCase().includes(value) ||
      recording.fileFormat.toLowerCase().includes(value) ||
      this.getStatusLabel(recording.status).toLowerCase().includes(value)
    );

    this.totalItems = this.filteredRecordings.length;
    this.currentPage = 1;
    this.applySort();
  }

  applySort(column?: keyof IRecording): void {
    if (column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    }

    if (this.sortColumn) {
      const key = this.sortColumn;

      this.filteredRecordings.sort((a, b) => {
        const valueA = String(a[key] ?? '').toLowerCase();
        const valueB = String(b[key] ?? '').toLowerCase();

        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB, undefined, { numeric: true })
          : valueB.localeCompare(valueA, undefined, { numeric: true });
      });
    }

    this.updatePage();
  }

  updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedRecordings = this.filteredRecordings.slice(
      start,
      start + this.pageSize
    );
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.updatePage();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    this.updatePage();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get rangeLabel(): string {
    if (!this.totalItems) {
      return '0 of 0';
    }

    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalItems);

    return `${start} – ${end} of ${this.totalItems}`;
  }

  formatDuration(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return 'N/A';
    }

    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }

    return `${remainingSeconds}s`;
  }

  getStatusLabel(status: string = ''): string {
  const labels: Record<string, string> = {
    [CustomCategory.RecordingStatus.Uploaded]: 'Uploaded',
    [CustomCategory.RecordingStatus.Processing]: 'Processing',
    [CustomCategory.RecordingStatus.Processed]: 'Processed',
    [CustomCategory.RecordingStatus.Failed]: 'Failed'
  };

  return labels[status] ?? status;
}

getStatusClass(status: string = ''): string {
  const classes: Record<string, string> = {
    [CustomCategory.RecordingStatus.Uploaded]: 'status-uploaded',
    [CustomCategory.RecordingStatus.Processing]: 'status-processing',
    [CustomCategory.RecordingStatus.Processed]: 'status-processed',
    [CustomCategory.RecordingStatus.Failed]: 'status-failed'
  };

  return classes[status] ?? 'status-default';
}
}
