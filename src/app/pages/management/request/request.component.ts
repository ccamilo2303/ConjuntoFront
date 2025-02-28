import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { ManagementService } from '../../../core/services/management.service';
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
    ConfirmDialogModule,
    TextareaModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})

export class RequestComponent {

  private managementService = inject(ManagementService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  requests = signal<Request[]>([]);
  cols!: Column[];
  rejectDialog: boolean = false;
  motivoRechazo: string = '';
  selectedRequest: Request | null = null;
  updateStateRequest: UpdateStateRequest | undefined;

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.managementService.getRequests(10, 0).subscribe((requestsResponse: RequestsResponse) => {
      this.requests.set(requestsResponse.solicitudes);
    });

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  approveRequest(request: Request) {
    this.confirmationService.confirm({
      message: 'Estas seguro de aprobar la solicitud de: ' + request.nombre + '?',
      header: 'Aprobación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aprobar',
      rejectLabel: 'Cancelar',
      rejectVisible: true,
      accept: () => {
        this.updateStateRequest = {
          estadoSolicitud: 1,
          motivoRechazo: ""
        };
        this.managementService.updateStateRequest(request.id, this.updateStateRequest).subscribe({
          next: () => {
            this.messageService.add({ 
              severity: 'success', 
              summary: 'Solicitud Aprobada', 
              detail: 'La solicitud ha sido aprobada correctamente.', 
              life: 3000 
            });
          },
          error: (error) => {
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Error', 
              detail: error.message, 
              life: 3000 
            });
          }
        });
      }
    });
  }

  rejectRequest(request: Request) {
    this.selectedRequest = request;
    this.motivoRechazo = '';
    this.rejectDialog = true;
  }

  confirmReject() {
    if (!this.motivoRechazo.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe ingresar un motivo de rechazo',
        life: 3000
      });
      return;
    }
  
    this.updateStateRequest = {
      estadoSolicitud: 2,
      motivoRechazo: this.motivoRechazo
    };
  
    this.managementService.updateStateRequest(this.selectedRequest?.id!, this.updateStateRequest).subscribe({
      next: () => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Solicitud Rechazada', 
          detail: 'La solicitud ha sido rechazada correctamente.', 
          life: 3000 
        });
      },
      error: (error) => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: error.message, 
          life: 3000 
        });
      }
    });
    this.rejectDialog = false;
  }

}
