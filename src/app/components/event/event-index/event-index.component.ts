import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/Event';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-event-index',
  templateUrl: './event-index.component.html',
  styleUrls: ['./event-index.component.css']
})
export class EventIndexComponent implements OnInit {

  constructor( private _eventService : EventService) { }

  columnNames = ['details', 'location','dateOfEvent','buttons'];
  
  dataSource: MatTableDataSource<Event> = new MatTableDataSource([]);

   private sort;
  @ViewChild(MatSort) set content(content:ElementRef){
    this.sort =content;
    if (this.sort){
       this.dataSource.sort=this.sort;}
  }
  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  
  ngOnInit() {
    this._eventService.getEvents().subscribe((events:Event[])=>{
      this.dataSource = new MatTableDataSource<Event>(events);
    });
  }
            setDataSourceAttributes(){
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
}
