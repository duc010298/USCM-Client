import { ModalService } from './../../core/service/modal.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RestService } from 'src/app/core/service/rest.service';
import { ReportForm } from 'src/app/models/ReportFormModel';
import { Subscription } from 'rxjs';
import { dialogIdConstant } from '../dialog/dialogIdContant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  reportForms: ReportForm[] = new Array();
  subscription: Subscription;
  @Input() toggle: boolean;

  constructor(
    private restService: RestService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getAllReport();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllReport() {
    this.subscription = this.restService.getAllReport()
      .subscribe(
        (data: any) => {
          for (let report of data) {
            let rp = <ReportForm>{
              id: report.id,
              reportName: report.reportName
            };
            this.reportForms.push(rp);
          }
        },
        error => {
          this.modalService.open(dialogIdConstant.NOTIFY, "Lỗi không tải được dữ liệu, vui lòng tải lại trang", true);
        }
      )
  }
}
