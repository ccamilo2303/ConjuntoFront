import { Component, inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FluidModule } from 'primeng/fluid';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-unit',
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    TabsModule,
    FluidModule
  ],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
})
export class UnitComponent {

  autoValue: any[] | undefined;
  selectedAutoValue: any = null;
  autoFilteredValue: any[] = [];

  filterCountry(event: AutoCompleteCompleteEvent) {
    const filtered: any[] = [];
    const query = event.query;

    for (let i = 0; i < (this.autoValue as any[]).length; i++) {
      const country = (this.autoValue as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.autoFilteredValue = filtered;
  }

}
