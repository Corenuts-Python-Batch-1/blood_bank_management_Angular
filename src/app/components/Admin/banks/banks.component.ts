import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {

  @ViewChild('agGrid') agGrid: any;

  private apiUrl = 'http://localhost:8000/api/getall/bloodbank/'; // Replace with your API URL
  gridOptions: GridOptions;
  rowData: any[] = [];
  searchValue: string = '';

  constructor(private http: HttpClient) {
    this.gridOptions = {
      columnDefs: [
        { headerName: 'Name', field: 'blood_bank_name', editable: true, sortable: true, filter: true, },
        { headerName: 'City', field: 'location.city', editable: true, sortable: true, filter: true,  },
        { headerName: 'Area', field: 'location.area', editable: true, sortable: true, filter: true,  },


        // Add more column definitions as needed
      ],
      pagination: true,
      paginationPageSize: 8,
      onGridReady: () => this.loadData(),
      onColumnResized: (event) => this.onColumnResized(event),
    };

    this.rowData = []; // Assign an empty array to rowData
  }
  ngOnInit(): void {

  }

  loadData() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => {
        this.rowData = data;
      });
  }

  onSearch() {
    this.agGrid.api.setQuickFilter(this.searchValue);
  }

  onColumnResized(event: any) {
    const column = event.column;
    const newWidth = column.getActualWidth();

    // Handle the column resize event
    console.log(`Column "${column.getColDef().headerName}" resized to width: ${newWidth}`);
  }


}


// get locations()
//   {
//     return this.dataRepo.getLocations()
//   }
