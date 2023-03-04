import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../model/student";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  listaStudentow: Student[] = []
  listaKolumnDoWyswietlenia: string[] = [
    'student-id-col',
    'student-imie-col',
    'student-nazwisko-col',
    'student-wiek-col',
    'student-usun-col'
  ]

  constructor(private httpClient: HttpClient) {
    this.getStudents()
  }

  getStudents(): void {
    this.httpClient.get<Student[]>("http://localhost:8080/student")
      .subscribe({
        next: dane => {
          console.log(dane)

          this.listaStudentow = dane
        },
        error: err => {
          console.log("Error: " + err)
        }
      })
  }

  deleteStudent(idDoUsuniecia: number): void {
    this.httpClient.delete("http://localhost:8080/student",
      {
        params: {
          stId: idDoUsuniecia
        }
      })
      .subscribe({
        next: dane => {
          this.getStudents()
        },
        error: err => {
          this.getStudents()
          console.log("Error: " + err)
        }
      })
  }
}
