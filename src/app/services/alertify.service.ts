import { Injectable } from '@angular/core';
declare let alertify:any
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message:string){

    alertify.success(message)
  }


  warning(message:string){
    alertify.set('notifier','position', 'bottom-left');
    alertify.warning(message)
  }


  error(message:any){

    alertify.error(message)
  }

  alert(message:string,message2:string){
    alertify.alert(message,message2)
  }
  errorbase(){

    alertify.error("Operation Canceled!.")
  }
}
