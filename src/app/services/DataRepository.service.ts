import { CookieService } from 'ngx-cookie-service';
import { DonorDetails } from './../models/DonorDetails';
import { Injectable } from '@angular/core';
import { ApiUrlService } from './ApiUrls.service';
import { User } from '../models/user.component';
import Swal from 'sweetalert2';
import { Location } from '../models/Locations';
import { TotalUnits } from '../models/TotalUnits';
import { PatientDetails } from '../models/PatientDetails';
import { BloodGroup } from '../models/BloodGroup';
import { Router } from '@angular/router';
import { BloodBank } from '../models/BloodBank';
@Injectable()
export class DataRepositoryService {

  register:User={}
  location:Location[]=[]
  dayrequestsPatients:PatientDetails[]=[]
  acceptedPatients:PatientDetails[]=[]
  donorDetails:DonorDetails[]=[]
  currentDayDonors:DonorDetails[]=[]
  blood:BloodGroup[]=[];
  lid?:number|undefined;
  bid?:number;
  bloodBanks:BloodBank[]=[]
  allpatientRequests:PatientDetails[]=[]
  constructor(private api:ApiUrlService,private route:Router,private cookieService: CookieService) {
    this.api.getLocations().subscribe(data=>this.location=data)
    this.api.getPendingPatients().subscribe(dayrequest=> this.dayrequestsPatients=dayrequest)
    this.api.getAcceptedPatients().subscribe(accept=>this.acceptedPatients=accept)
    this.api.getDonarsdetails().subscribe(data=>this.donorDetails=data)
    this.api.getcurrentDayDonardetails().subscribe(donor=>this.currentDayDonors=donor )
    this.api.getBloodGroupType().subscribe(type=>this.blood=type)
    this.api.getBloodBanks().subscribe(banks=>this.bloodBanks=banks)
    this.api.getCurrentAllPatients().subscribe(all=>this.allpatientRequests=all)
  }
//locations getting
getLocations(){
  return this.location
}


  registeration(user: User) {
    Swal.fire({
      title: 'Registration Successful',
      text: 'Your registration has been successful.',
      icon: 'success',
      showCancelButton: true,
      cancelButtonColor:'red',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.register(user).subscribe(data => {

            this.route.navigate(['/login'])
            this.register = data;
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      }
    });
  }

//patient details for present day
acceptedPatientRequest(id: number) {
  this.api.acceptRequest(id).subscribe(e => {
    console.log(e); // Check if the received data is correct


    const index = this.allpatientRequests.findIndex(item => item.patient_id === e.patient_id);

    if (index !== -1) {

      this.allpatientRequests[index] = e;
    } else {

      this.allpatientRequests.push(e);
    }
  });
}
rejectedPatientRequest(id: number) {
  this.api.rejectRequest(id).subscribe(e => {
    console.log(e); // Check if the received data is correct
    const index = this.allpatientRequests.findIndex(item => item.patient_id === e.patient_id);

    if (index !== -1) {

      this.allpatientRequests[index] = e;
    } else {

      this.allpatientRequests.push(e);
    }
  });
}

getAllpatinetRequests(): PatientDetails[] {
  console.log(this.allpatientRequests); // Check if the array contains the updated data
  return this.allpatientRequests;
}


// donor details

getDonardetails()
{
  return this.donorDetails
}

getCurrentDayDonors()
{
  return this.currentDayDonors
}
// get blood availability for user request
getBloodGroupType(){
  return this.blood;
 }



 bloodDonation(donardetails: DonorDetails,) {
   Swal.fire({
     title: 'Donor Added Successfully',
     icon: 'success',
     showCancelButton: false,
     showConfirmButton: true,
     confirmButtonText: 'OK',
     allowOutsideClick: false,
     allowEscapeKey: false,

   }).then((result) => {
     if (result.isConfirmed) {
       this.api.bloodDonate(donardetails).subscribe((response) => {
         this.donorDetails=response
         this.currentDayDonors=response
         const desiredCookie = this.cookieService.get('blood_Bank');
    const role = desiredCookie ? desiredCookie : null;
    // console.warn(role)
         this.route.navigate(['admin/main/blood/location/',role]);
       });
     }
   });
 }

getbloodBanks()
{
  return this.bloodBanks
}
  }




