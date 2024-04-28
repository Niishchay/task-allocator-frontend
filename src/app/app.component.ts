import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { error, selectLoader, selectUser } from './state/app.selector';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task-allocator';
  isDrawerOpened = false;
  isRoleLead = false;
  showSpinner = false;

  constructor(private store: Store<{app: AppState}>, private cdr: ChangeDetectorRef, private snackBar: MatSnackBar){
  }

  ngOnInit() {
    this.store.select(selectUser).subscribe(data=> {
      this.isDrawerOpened = data ? true: false
      this.isRoleLead = data?.role === "LEAD" ? true: false;
    });
    this.store.select(selectLoader).subscribe(data=> {
      this.showSpinner = data;
      this.cdr.detectChanges();
    });
    this.store.select(error).subscribe(data=>{
      if(data){
        this.snackBar.open(data.error, "😢",{
          duration: 3000
        });
      }
    })
  }
}
