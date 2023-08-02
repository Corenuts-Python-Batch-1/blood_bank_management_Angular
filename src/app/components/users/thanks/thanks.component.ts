import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {
patient:any
  constructor(private activeRoute: ActivatedRoute, private route:Router) {
    this.patient=this.activeRoute.snapshot.paramMap.get('patientObj')
   }

  ngOnInit(): void {
  }


  home()
  {
    localStorage.removeItem('token')
      this.route.navigate(['/home'])
  }
}
