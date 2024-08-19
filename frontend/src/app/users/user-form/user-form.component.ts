import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import User from '../../types/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule], // reactiveForm Module se html form ko connect krne k liye backend se
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

formBuilder = inject(FormBuilder);
userForm :FormGroup = this.formBuilder.group({

   name : ['',[Validators.required]],
   email: ['',[Validators.required , Validators.email]],
   age: [''],
   address : [''],
   password : ['',[Validators.required, Validators.minLength(8)]],

});

userService = inject(UserService);
router=inject(Router);

route = inject(ActivatedRoute);
editUserId! : string;

ngOnInit()
{
  this.editUserId = this.route.snapshot.params['id']; // edit karne k liye id nikalege is treeke se 
  if (this.editUserId)
  {
    this.userService.getUser(this.editUserId).subscribe((result)=>
    {
      this.userForm.patchValue(result);
    });
  }

}

addUser()
{
  if(this.userForm.invalid)
  {
    alert('Please provide all valid details');
    return;
  }
  const model : User = this.userForm.value;
  this.userService.addUser(model).subscribe(result=>{
    alert("user added successfully.");
    this.router.navigateByUrl('/');

  });


}

updateUser()
{
  if(this.userForm.invalid)
    {
      alert('Please provide all valid details');
      return;
    }
    const model : User = this.userForm.value;
    this.userService.updateUser(this.editUserId, model).subscribe((result)=>
    {
      alert("user update successfully.");
      this.router.navigateByUrl('/');
  
    });


}


}
