import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorizeRequestService } from '@services/api';
import { AuthService } from '@services';

@Component({
    selector: 'challenge-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public maxInputChatacters = 30;
    constructor(
        private fb: FormBuilder,
        private authorizeRequestService: AuthorizeRequestService,
        private authService: AuthService,
        private router: Router
        ) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            firstName: [ null, [ Validators.required, Validators.maxLength(this.maxInputChatacters) ] ],
            lastName: [ null, [ Validators.required , Validators.maxLength(this.maxInputChatacters) ] ]
          });
     }
     public submit() {
         if (this.loginForm.valid) {
             console.log(this.loginForm.value);
             this.getUserData(`${this.loginForm.value.firstName.toLowerCase()}_${this.loginForm.value.lastName.toLowerCase()}`);

         }
     }
    private async getUserData(userName: string) {
        const [groupId, userId] = await Promise.all(
            [this.authorizeRequestService.getGroupId(userName), this.authorizeRequestService.getUserId(userName)]);
            this.authService.setUserData({userId, groupId});
            this.router.navigate(['/pro-con']);
     }
}
