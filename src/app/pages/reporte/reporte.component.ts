import { Component, OnInit } from '@angular/core';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, BarController, BarElement, ArcElement, DoughnutController, RadarController, RadialLinearScale, PieController } from 'chart.js';

import { ConsultaService } from 'src/app/_service/consulta.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, BarController, BarElement, ArcElement, DoughnutController, RadarController, RadialLinearScale, PieController);

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  chart: any;
  tipo!: string;
  pdfSrc!: string;



  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {

    this.tipo = 'line';
    this.dibujar();
    if (this.chart) {
      this.chart.destroy();
    }


  }
  dibujar() {
    this.consultaService.listarResumen().subscribe(data => {
      console.log(data);
      let cantidad = data.map(res => res.cantidad);
      let fechas = data.map(res => res.fecha);

      console.log(cantidad);
      console.log(fechas);

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart('canvas', {
        type: this.tipo as any,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Cantidad',
              data: cantidad,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            x: { display: true },
            y: { display: true }
          }
        }
      });


    });
  }

  cambiar(tipo: string) {
    this.tipo = tipo;
    this.dibujar();
  }

  generarReporte() {
    this.consultaService.genererReporte().subscribe(data => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        console.log(this.pdfSrc);
      }
      reader.readAsArrayBuffer(data);
    });
  }

  descargarReporte() {
    this.consultaService.genererReporte().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      //console.log(url);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.pdf'
      a.click();
    });
  }



  async pdfgrafico() {
    // Convertir el contenido del canvas a una imagen
    let canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvasElement) {
      console.error("No se encontró el elemento canvas");
      return;
    }

    let imgData: any;
    await html2canvas(canvasElement).then(canvas => {
      imgData = canvas.toDataURL('image/png');
    });

    // Crear PDF
    const pdf = new jsPDF('l', 'mm', 'a4');

    // Añadir el título "Reporte Consultas" 
    pdf.setFontSize(20);  // Establecer el tamaño de la fuente
    pdf.text("Reporte Consultas - Clinica Villa Salud", 0, 20);  // Posiciona el texto 10mm desde el borde izquierdo y 20mm desde el borde superior

    // Añadir la fecha
    const fecha = new Date().toLocaleDateString();  // Obtener la fecha actual
    pdf.setFontSize(12);  // Establecer el tamaño de la fuente
    pdf.text(fecha, 250, 20);  // Ajusta la posición según lo necesites

    // Añadir la imagen del canvas
    const imgProps = pdf.getImageProperties(imgData!);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData!, 'PNG', 0, 30, pdfWidth, pdfHeight - 30);  // Comienza a añadir la imagen un poco más abajo para tener espacio para el título y la fecha

    // Guardar el PDF
    pdf.save("Reporte_Consultas.pdf");
  }


}
