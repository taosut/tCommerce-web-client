import { Component, OnInit } from '@angular/core';
import { CustomerDto } from '../../shared/dtos/customer.dto';
import { Router } from '@angular/router';
import { CustomerService } from '../../shared/services/customer/customer.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    if (this.customerService.customer) {
      this.router.navigate(['/', 'account']);
    }
  }

  onLogin(customer: CustomerDto) {
    this.router.navigate(['/']);
  }

  switchToRegister() {
    this.router.navigate(['/', 'register']);
  }
}
