import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  cardForm!: FormGroup;
  upiForm!: FormGroup;
  walletForm!: FormGroup;
  bankForm!: FormGroup;

  activePaymentMethod: string = 'card';
  orderAmount: string = '2,499.00';
  currency: string = 'INR';
  
  showOptCard: boolean = true;
  showOptUpi: boolean = false;
  showOptWallet: boolean = false;
  showOptNetBanking: boolean = false;

  submitted: boolean = false;
  processing: boolean = false;
  paymentSuccess: boolean = false;

  banks = [
    { code: 'SBI', name: 'State Bank of India', logo: 'SBI' },
    { code: 'HDFC', name: 'HDFC Bank', logo: 'HDFC' },
    { code: 'ICICI', name: 'ICICI Bank', logo: 'ICICI' },
    { code: 'AXIS', name: 'Axis Bank', logo: 'AXIS' },
    { code: 'KOTAK', name: 'Kotak Mahindra Bank', logo: 'KOTAK' },
    { code: 'PNB', name: 'Punjab National Bank', logo: 'PNB' }
  ];

  wallets = [
    { code: 'PAYTM', name: 'Paytm', logo: 'PTM' },
    { code: 'PHONEPE', name: 'PhonePe', logo: 'PP' },
    { code: 'GPAY', name: 'Google Pay', logo: 'GP' },
    { code: 'AMAZON', name: 'Amazon Pay', logo: 'AP' }
  ];

  selectedBank: string = '';
  selectedWallet: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initFormGroups();
  }

  initFormGroups(): void {
    this.cardForm = new FormGroup({
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(19)]),
      cardHolder: new FormControl('', [Validators.required]),
      expiryMonth: new FormControl('', [Validators.required]),
      expiryYear: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(4)])
    });

    this.upiForm = new FormGroup({
      vpa: new FormControl('', [Validators.required, Validators.pattern(/^[\w.-]+@[\w]+$/)])
    });

    this.walletForm = new FormGroup({
      walletCode: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10)])
    });

    this.bankForm = new FormGroup({
      bankCode: new FormControl('', [Validators.required])
    });
  }

  selectPaymentMethod(method: string): void {
    this.activePaymentMethod = method;
    this.showOptCard = method === 'card';
    this.showOptUpi = method === 'upi';
    this.showOptWallet = method === 'wallet';
    this.showOptNetBanking = method === 'netbanking';
    this.submitted = false;
  }

  selectBank(bankCode: string): void {
    this.selectedBank = bankCode;
    this.bankForm.patchValue({ bankCode: bankCode });
  }

  selectWallet(walletCode: string): void {
    this.selectedWallet = walletCode;
    this.walletForm.patchValue({ walletCode: walletCode });
  }

  onCardSubmit(): void {
    this.submitted = true;
    if (this.cardForm.valid) {
      this.processPayment();
    }
  }

  onUpiSubmit(): void {
    this.submitted = true;
    if (this.upiForm.valid) {
      this.processPayment();
    }
  }

  onWalletSubmit(): void {
    this.submitted = true;
    if (this.walletForm.valid) {
      this.processPayment();
    }
  }

  onBankSubmit(): void {
    this.submitted = true;
    if (this.bankForm.valid) {
      this.processPayment();
    }
  }

  processPayment(): void {
    this.processing = true;
    setTimeout(() => {
      this.processing = false;
      this.paymentSuccess = true;
    }, 2000);
  }

  goToDashboard(): void {
    this.router.navigate(['/auth/dashboard']);
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.cardForm.patchValue({ cardNumber: formattedValue });
  }

  get cf() {
    return this.cardForm.controls;
  }

  get uf() {
    return this.upiForm.controls;
  }

  get wf() {
    return this.walletForm.controls;
  }

  get bf() {
    return this.bankForm.controls;
  }
}
