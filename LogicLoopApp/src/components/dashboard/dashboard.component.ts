import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, delay, of, tap } from 'rxjs';


@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [RouterModule, HttpClientModule, CommonModule, FormsModule],
  providers: [DataService],
})
export class DashboardComponent implements OnInit {
  data: any;
  title = 'dashboard component';
  filteredData: any;
  searchName: string = '';
  selectedOrder: string = '';
  originalData: any;
  searchScore: any;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService
      .getData()
      .pipe(
        delay(2000),
        tap((response: any) => {
          const { data } = response || {};
          this.originalData = data || [];
          this.filteredData = [...this.originalData];
        }),
        catchError((error: any) => {
          console.error(`Something went wrong: ${error.message}`);
          return of([]);
        })
      )
      .subscribe();
  }

  filterByName(): void {
    const searchName = this.searchName?.trim().toLocaleLowerCase();
      
    if (!searchName) {
      this.filteredData = this.originalData;
      return;
    }

    this.filteredData = this.originalData.filter((item: any) => {
      const itemName = item?.attributes?.name?.toLocaleLowerCase();
      return itemName.includes(searchName);
    });
  }

  filterByScore(): void {
    this.filteredData = this.data?.data.filter(
      (item: any) => item?.attributes.rating == this.searchScore
    );
  }

  orderBy(event: any): void {
    const sortBy = event.target.value;

    this.filteredData.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'name':
          return a?.attributes?.name.localeCompare(b?.attributes?.name);
        case 'score':
          return a?.attributes?.rating - b?.attributes?.rating;
        case 'release_date':
          return (
            new Date(a?.attributes?.publishedAt).getTime() -
            new Date(b?.attributes?.publishedAt).getTime()
          );
        default:
          return 0;
      }
    });
  }

  clearData(): void {
    this.searchName = '';
    this.searchScore = null;
    this.selectedOrder = '';
    this.filteredData = [...this.originalData];
  }
}