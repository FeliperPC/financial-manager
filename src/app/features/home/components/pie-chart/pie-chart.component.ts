import { ChangeDetectionStrategy, Component, DestroyRef, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { PieChartConfig } from './pie-chart.interface';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  template: `<canvas #canvas></canvas>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent {
  canvas = viewChild.required<ElementRef>('canvas');

  config = input.required<PieChartConfig>();
  private destroyRef = inject(DestroyRef);

  private chart: Chart | null = null;

  constructor() {
    effect(() => {
      this.destroyChartInstance();
      this.chart = this.createChartInstance();
    });

    this.destroyRef.onDestroy(() => this.destroyChartInstance());
  }

  private destroyChartInstance() {
    this.chart?.destroy();
  }

  private createChartInstance() {
    return new Chart(this.canvas().nativeElement, {
      type: 'pie',
      data: {
        labels: this.config().labels,
        datasets: [
          {
            label: this.config().dataLabel,
            data: this.config().data,
          },
        ],
      },
    });
  }
}
