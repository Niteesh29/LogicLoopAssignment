import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone:true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [RouterModule,HttpClientModule, CommonModule,FormsModule],
  providers: [DataService]
})
export class DashboardComponent implements OnInit {
data: any
title = 'dashboard component';
filteredData: any;
searchName: string = ''
  originalData: any;
constructor(private dataService : DataService){

}
ngOnInit(): void {
    this.getData() 
}

  getData()
  {
    this.dataService.getData().subscribe((response)=> 
    {
        this.data = response
        this.originalData = this.data?.data
        this.filteredData = this.originalData
    })
  
}

filterByName(): void {
  this.filteredData = this.data?.data.filter((item:any) => item?.attributes?.name.toLocaleLowerCase().includes(this.searchName.toLocaleLowerCase()));
}
}