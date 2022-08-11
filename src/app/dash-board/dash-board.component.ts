import { Component, OnInit } from '@angular/core';
import { DataSharedService } from '../shared/services/services/datashared.service';

@Component({
	selector: 'app-dash-board',
	templateUrl: './dash-board.component.html',
	styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {
	isOpen: boolean = false;
	// isShow: boolean = true;
	constructor(private dataSharedService: DataSharedService) { }

		// navOpen(_$event: boolean): void {
		// 	this.isOpen = true;
		// }

	ngOnInit() {
		this.dataSharedService.currentSideNavObject.subscribe((isShow: boolean) => {
			this.isOpen = !isShow;
		});
	}
}
