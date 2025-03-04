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
import { ResidentService } from '../../../core/services/resident.service';
import { Resident, ResidentsResponse, ResidentStatusUpdate, ResidentTypeUpdate, ResidentUnit, ResidentUnitsResponse } from '../../../core/models/resident.model';
import { DatePickerModule } from 'primeng/datepicker';
import { TableRowExpandEvent } from 'primeng/table';


interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-resident',
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
    DatePickerModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './resident.component.html',
  styleUrl: './resident.component.scss'
})
export class ResidentComponent {

  private residentService = inject(ResidentService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  residentDialog: boolean = false;
  residents = signal<Resident[]>([]);
  resident!: Resident;
  residentUnits = signal<ResidentUnit[]>([]);
  selectedResidents!: Resident[] | null;
  submitted: boolean = false;
  residentTypes!: any[];
  residentStates!: any[];
  @ViewChild('dt') dt!: Table;
  exportColumns!: ExportColumn[];
  cols!: Column[];
  expandedRows = {};
  
  residentStatusUpdate: ResidentStatusUpdate | undefined;
  residentTypeUpdate: ResidentTypeUpdate | undefined;

  exportCSV() {
    this.dt.exportCSV();
  }

  ngOnInit() {
    this.loadResidents();
  }

  loadResidents() {

    this.residentService.getResidents(10, 0).subscribe((residentsResponse: ResidentsResponse) => {
      this.residents.set(residentsResponse.residentes);
    });

    this.residentTypes = [
      { label: 'Propietario', value: 1 },
      { label: 'Arrendatario', value: 2 }
    ];

    this.residentStates = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 2 }
    ];

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'image', header: 'Image' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onRowExpand(event: TableRowExpandEvent) {
    this.residentService.getResidentUnits(event.data.idResidenteUnidad, 10, 0).subscribe((residentUnitsResponse: ResidentUnitsResponse) => {
      this.residentUnits.set(residentUnitsResponse.unidades);
    });
  }

  getUnitsResident(idResident: number){
    
  }
  
  getColorState(state: string) {
    if (state == "<string>") {
      return "success";
    } else {
      return "danger";
    }
  }

  editResident(resident: Resident) {
    this.resident = { ...resident };
    this.residentDialog = true;
  }

  updateResident() {
    this.submitted = true;

    if (this.resident.tipo.trim() && this.resident.estado.trim()) {

      this.residentTypeUpdate = { idTipo: this.residentTypes.find(type => type.label === this.resident.tipo).value };
      this.residentStatusUpdate = { idEstado: this.residentStates.find(state => state.label === this.resident.estado).value };

      this.residentService.updateResidentType(this.resident.idResidenteUnidad, this.residentTypeUpdate).subscribe({
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000
          });
        }
      });

      this.residentService.updateResidentState(this.resident.idResidenteUnidad, this.residentStatusUpdate).subscribe({
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000
          });
        }
      });

      this.loadResidents();
      this.messageService.add({
        severity: 'success',
        summary: 'Residente Actualizado',
        detail: 'Se ha actualizado la información del residente correctamente.',
        life: 3000
      });
      this.residentDialog = false;
    }
  }

  hideDialog() {
    this.residentDialog = false;
    this.submitted = false;
  }

  deleteSelectedResidents() {
    this.confirmationService.confirm({
      message: '¿Estas seguro de inactivar los residentes seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedResidents?.forEach(resident => {
          this.residentStatusUpdate = { idEstado: this.residentStates.find(state => state.label === "Inactivo").value };
          this.residentService.updateResidentState(resident.idResidenteUnidad, this.residentStatusUpdate).subscribe({
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
                life: 3000
              });
            }
          });

        });
        this.loadResidents();
        this.messageService.add({
          severity: 'success',
          summary: 'Residente Actualizado',
          detail: 'Se ha actualizado la información del residente correctamente.',
          life: 3000
        });
      }
    });
  }

}
