import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Color, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categoriaSeleccionada = '';
  tiempoSeleccionado = 'Tiempo Completo';
  tituloSeleccionado = '';
  investigacionSeleccionada = '';
  salarioCalculado: number | null = null;
  historicoSalarios: { name: string; value: number }[] = [];

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454'],
  };

  calcularSalario() {
    let sueldoBase = 0;
    let bonificacionPostgrado = 0;
    let bonificacionInvestigacion = 0;

    if (this.categoriaSeleccionada === 'Auxiliar') {
      sueldoBase = this.tiempoSeleccionado === 'Tiempo Completo' ? 2.645 : 1.509;
    } else if (this.categoriaSeleccionada === 'Asistente') {
      sueldoBase = this.tiempoSeleccionado === 'Tiempo Completo' ? 3.125 : 1.749;
    } else if (this.categoriaSeleccionada === 'Asociado') {
      sueldoBase = this.tiempoSeleccionado === 'Tiempo Completo' ? 3.606 : 1.990;
    } else if (this.categoriaSeleccionada === 'Titular') {
      sueldoBase = this.tiempoSeleccionado === 'Tiempo Completo' ? 3.918 : 2.146;
    }

    if (this.tituloSeleccionado === 'Especialización') {
      bonificacionPostgrado = sueldoBase * 0.10;
    } else if (this.tituloSeleccionado === 'Maestría') {
      bonificacionPostgrado = sueldoBase * 0.45;
    } else if (this.tituloSeleccionado === 'Doctorado') {
      bonificacionPostgrado = sueldoBase * 0.90;
    }

    if (this.investigacionSeleccionada === 'A1') {
      bonificacionInvestigacion = sueldoBase * 0.56;
    } else if (this.investigacionSeleccionada === 'A') {
      bonificacionInvestigacion = sueldoBase * 0.47;
    } else if (this.investigacionSeleccionada === 'B') {
      bonificacionInvestigacion = sueldoBase * 0.42;
    } else if (this.investigacionSeleccionada === 'C') {
      bonificacionInvestigacion = sueldoBase * 0.38;
    } else if (this.investigacionSeleccionada === 'Reconocido Minciencias') {
      bonificacionInvestigacion = sueldoBase * 0.33;
    } else if (this.investigacionSeleccionada === 'Semillero') {
      bonificacionInvestigacion = sueldoBase * 0.19;
    }

    this.salarioCalculado = sueldoBase + bonificacionPostgrado + bonificacionInvestigacion;
    this.historicoSalarios = [
      ...this.historicoSalarios,
      {
        name: `Simulación ${this.historicoSalarios.length + 1}`,
        value: this.salarioCalculado!,
      },
    ];
  }
}
