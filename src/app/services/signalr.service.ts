import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
}) //27.01.2023
export class SignalRService {
  private _connection: HubConnection;
  get connection(): HubConnection {
    return this._connection;
  }

  start(hubUrl: string) {
    if (
      !this.connection ||
      this._connection?.state == HubConnectionState.Disconnected
    ) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection: HubConnection = builder
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

      hubConnection
        .start()
        .then(() => {
          console.log('Connected...');
        })
        .catch((error) => setTimeout(() => this.start(hubUrl), 2000));
      this._connection = hubConnection;
    }
    this._connection.onreconnected((connectionId) =>
      console.log('Reconected...')
    );
    this._connection.onreconnecting((error) => console.log('Reconecting...'));
    this._connection.onclose((error) => console.log('Close Reconection'));
  }

  invoke(
    procedureName: string,
    message: any,
    successCallBack?: (value: any) => void,
    errorCallBack?: (error: any) => void
  ) {
    this.connection
      .invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(procedureName: string, callBack: (...message: any) => void) {
    this.connection.on(procedureName, callBack);
  }
}
