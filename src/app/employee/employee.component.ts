import { Component, OnInit } from '@angular/core';
import { candidate_data } from '../candidate-data';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  tableData: any = [];
  formData: any = [];
  cols: any[] = [];
  display: boolean = false;
  empData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'department', header: 'Department' },
      { field: 'joining_date', header: 'Joining Date', date: true, format: `dd/mm/yyyy` }
    ];

    this.tableData = candidate_data;
    this.tableData.map((each: any) => {
      let date = each['joining_date'].split(/\//);
      let latest_date = [date[1], date[0], date[2]].join('/');
      let newDate = new Date(latest_date).toLocaleString();
      each['joining_date'] = newDate;
    })

  }

  filterGlobal(event: any) {
    this.tableData = candidate_data.filter((each: any) => {
      return each['name'].toLowerCase().includes(event.value)
    })
  }

  removeDevEmp() {
    this.tableData = candidate_data.filter((each: any) => {
      return each['department'] != "Development";
    })
  }

  empCount() {
    let me = this;
    this.display = true;
    let count = 0;
    let obj = {};
    this.tableData.map((each: any) => {
      this.tableData.map((eachData: any) => {
        if (each['department'] == eachData['department']) {
          count++;
        }
      })
      obj = { 'count': count, 'dep': each['department'] }
      me.empData.push(obj);
      count = 0;
    })
    me.empData = me.empData.filter((test, index, array) =>
      index === array.findIndex((findTest) =>
        findTest.dep === test.dep
      )
    );
  }

  getExpEmployee() {
    let me = this;
    let currDate = new Date("04-05-2021");
    me.tableData = me.tableData.filter((each: any) => {
      let empDate = new Date(each['joining_date']);
      let time = currDate.getTime() - empDate.getTime();
      let timeDiff = time / (1000 * 3600 * 24 * 30)
      return timeDiff > 24;
    })
  }

  getEmployee() {
    this.tableData = candidate_data;
  }

}
