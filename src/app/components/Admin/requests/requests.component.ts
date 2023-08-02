import { Component, OnInit } from '@angular/core';
import { PatientDetails } from 'src/app/models/PatientDetails';
import { ApiUrlService } from 'src/app/services/ApiUrls.service';
import { DataRepositoryService } from 'src/app/services/DataRepository.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  pageSize = 8;
  p: number = 1;
  currentPage = 1;
  searchValue: string = '';
  filteredRequests: any[] = [];
  request: PatientDetails[] = [];
  constructor(private dataRepo: DataRepositoryService, private api: ApiUrlService) {}

  ngOnInit(): void {}

  get requests(): any[] {
    return this.dataRepo.getAllpatinetRequests().filter((e: any) => e.status?.toUpperCase() === "REQUESTED");
  }


  back() {}

  acceptRequest(id: any) {
    console.log('Accepting request with ID:', id); // Check if the method is being called and the ID is correct
    this.dataRepo.acceptedPatientRequest(id);
    this.request = this.request.filter((details: PatientDetails) => details.patient_id !== id);
  }
  rejectRequest(id: any) {
    console.log('Accepting request with ID:', id); // Check if the method is being called and the ID is correct
    this.dataRepo.rejectedPatientRequest(id);
    this.request = this.request.filter((details: PatientDetails) => details.patient_id !== id);
  }

}





















// @ViewChild('agGrid') agGrid: any;

//   private apiUrl = 'http://localhost:8000/api/request/currentday/patientdetails/';
//   gridOptions: CustomGridOptions;
//   rowData: any[] = [];
//   searchValue: string = '';

//   constructor(private http: HttpClient) {
//     this.gridOptions = {
//       columnDefs: [
//         { headerName: 'Name', field: 'patient_name', editable: true, sortable: true, filter: true },
//         { headerName: 'Group', field: 'blood_group.blood_group_type', editable: true, sortable: true, filter: true },
//         { headerName: 'Units Req', field: 'units_required', editable: true, sortable: true, filter: true },
//         { headerName: 'Gender', field: 'gender', editable: true, sortable: true, filter: true },
//         { headerName: 'Location', field: 'patient_location.area', editable: true, sortable: true, filter: true },
//         { headerName: 'Hospital', field: 'hospital_name', editable: true, sortable: true, filter: true },
//         {
//           headerName: 'Status',
//           field: 'status',
//           cellRenderer: 'statusCellRenderer'
//         },
//         // Add more column definitions as needed
//       ],
//       frameworkComponents: {
//         statusCellRenderer: this.StatusCellRendererComponent.bind(this)
//       },
//       pagination: true,
//       paginationPageSize: 8,
//       onGridReady: () => this.loadData(),
//       onColumnResized: (event) => this.onColumnResized(event),
//     };

//     this.rowData = []; // Assign an empty array to rowData
//   }

//   ngOnInit(): void {}

//   loadData() {
//     this.http.get<any[]>(this.apiUrl)
//       .subscribe(data => {
//         this.rowData = data;
//       });
//   }

//   onSearch() {
//     this.agGrid.api.setQuickFilter(this.searchValue);
//   }

//   onColumnResized(event: any) {
//     const column = event.column;
//     const newWidth = column.getActualWidth();

//     // Handle the column resize event
//     console.log(`Column "${column.getColDef().headerName}" resized to width: ${newWidth}`);
//   }

//   acceptRequest(id: number) {
//     // Logic to accept the request with the given id
//     console.log(`Accepted request with id: ${id}`);
//     // Make an API call to update the status to 'accept' in the backend
//     // Example: this.http.put(`/api/request/${id}/status`, { status: 'accept' }).subscribe(...);
//   }

//   rejectRequest(id: number) {
//     // Logic to reject the request with the given id
//     console.log(`Rejected request with id: ${id}`);
//     // Make an API call to update the status to 'reject' in the backend
//     // Example: this.http.put(`/api/request/${id}/status`, { status: 'reject' }).subscribe(...);
//   }

//   StatusCellRendererComponent(params: any) {
//     const container = document.createElement('div');

//     const acceptButton = document.createElement('button');
//     acceptButton.className = 'btn btn-success';
//     acceptButton.innerText = 'Accept';

//     acceptButton.addEventListener('click', () => this.acceptRequest(params.data.id));

//     const rejectButton = document.createElement('button');
//     rejectButton.className = 'btn btn-danger';
//     rejectButton.innerText = 'Reject';
//     rejectButton.addEventListener('click', () => this.rejectRequest(params.data.id));

//     container.appendChild(acceptButton);
//     container.appendChild(rejectButton);

//     return container;
//   }
