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
import { Resident, ResidentsResponse } from '../../../core/models/resident.model';
import { DatePickerModule } from 'primeng/datepicker';

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
  selectedResidents!: Resident[] | null;
  submitted: boolean = false;
  residentTypes!: any[];
  residentStates!: any[];
  @ViewChild('dt') dt!: Table;
  exportColumns!: ExportColumn[];
  cols!: Column[];

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
      { label: 'Propietario', value: 'Propietario' },
      { label: 'Arrendatario', value: 'Arrendatario' }
    ];

    this.residentStates = [
      { label: 'Activo', value: 'Activo' },
      { label: 'Inactivo', value: 'Inactivo' }
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


  editResident(resident: Resident) {
    this.resident = { ...resident };
    this.residentDialog = true;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.residents().length; i++) {
      if (this.residents()[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  updateResident() {
    this.submitted = true;
    let _residents = this.residents();

    _residents[this.findIndexById(this.resident.id)] = this.resident;
    this.residents.set([..._residents]);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Updated',
      life: 3000
    });

    this.residentDialog = false;
  }

  hideDialog() {
    this.residentDialog = false;
    this.submitted = false;
  }

  deleteResident(resident: Resident) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de inactivar al residente ' + resident.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*this.products.set(this.products().filter((val) => val.id !== product.id));
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000
        });*/
      }
    });
  }

  deleteSelectedResidents() {
    this.confirmationService.confirm({
      message: '¿Estas seguro de inactivar los residentes seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*this.products.set(this.products().filter((val) => !this.selectedProducts?.includes(val)));
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000
        });*/
      }
    });
  }

}
