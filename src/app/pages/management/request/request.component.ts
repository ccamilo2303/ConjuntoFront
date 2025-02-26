import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Product, ProductService } from '../../service/product.service';
import { RequestService } from '../../../core/services/request.service';
import { RequestsResponse, Request, UpdateStateRequest } from '../../../core/models/request.model';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})

export class RequestComponent {

  private requestService = inject(RequestService);
  private confirmationService = inject(ConfirmationService);

  requests = signal<Request[]>([]);
  cols!: Column[];
  motivoRechazo: string = "";

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.requestService.getRequests(10, 0).subscribe((requestResponse: RequestsResponse) => {
      this.requests.set(requestResponse.solicitudes);
    });

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  approveRequest(request: Request) {
    this.confirmationService.confirm({
      message: 'Estas seguro de aprobar la solicitud de: ' + request.nombre + '?',
      header: 'Aprobar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aprobar',
      rejectLabel: 'Cancelar',
      rejectVisible: true,
      accept: () => {
        let updateStateRequest: UpdateStateRequest = {
          estadoSolicitud: 1,
          motivoRechazo: ""
        };
        this.requestService.updateStateRequest(request.id, updateStateRequest);
      }
    });
  }

  rejectRequest(request: Request) {
    this.motivoRechazo = '';
    this.confirmationService.confirm({
      message: `
        <div>
          <p>¿Estás seguro de rechazar la solicitud de: ` + request.nombre + `?</p>
          <label for="motivo">Motivo de rechazo:</label>
          <input id="motivo" type="text" [(ngModel)]="motivoRechazo" class="p-inputtext p-component" />
        </div>`,
      header: 'Rechazar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Rechazar',
      rejectLabel: 'Cancelar',
      rejectVisible: true,
      accept: () => {
        if (this.motivoRechazo.trim() === '') {
          this.confirmationService.confirm({
            message: 'Debes ingresar un motivo para rechazar la solicitud.',
            header: 'Advertencia',
            icon: 'pi pi-exclamation-circle',
            acceptLabel: 'OK',
            rejectVisible: false
          });
        } else {
          let updateStateRequest: UpdateStateRequest = {
            estadoSolicitud: 2,
            motivoRechazo: this.motivoRechazo
          };
          this.requestService.updateStateRequest(request.id, updateStateRequest);
        }
      }
    });
  }

}
