import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  durationInSeconds = 5;
  percentCompleted: number = 0;
  isMultipleUploaded = false;
  isSingleUploaded = false;
  percentUploaded = [0];
  acceptedExtensions = "jpg, jpeg, bmp, png, wav, mp3, mp4";
  uploadHasError = false;
  uploadError = '';

  @Input()
  requiredFileType!:string;

  fileName = '';
  uploadProgress: number = 0;
  uploadSub!: Subscription;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar) {}

  reportForm!: FormGroup;

  uploadForm = this.formBuilder.group({
    uploadFile: this.formBuilder.control('', [Validators.required, this.fileExtensionValidator(this.acceptedExtensions)])
  });

  openSuccessSnackBar() {
    this.snackBar.open("Upload efetuado com sucesso.", "OK", {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }

  openFailureSnackBar(){
    this.snackBar.open("Ocorreu um erro no upload.", "Tente novamente!", {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
      panelClass: ['red-snackbar'],
    });
  }

  upload(event: Event) {

    this.isSingleUploaded = false;

    const formData = new FormData();
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
        return;
    }

    const file:File = input.files[0];

    formData.append("file", file);

    this.fileName = file.name;

    console.log(file.name + ', Size: ' + file.size);

    this.uploadWithProgress(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.isSingleUploaded = true;
          this.openSuccessSnackBar();
        }
      });
  }

  uploadWithProgress(formData: FormData): Observable<any> {

    return this.http.post("http://localhost:8081/acompanhamento-leads/upload", formData, { observe: 'events',  reportProgress: true })
      .pipe(
        catchError((error) => {
          this.uploadError = error;
          this.uploadHasError = true;
          this.openFailureSnackBar();
          return throwError(() => error);
        })
      );
  }

  fileExtensionValidator(validExt: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let forbidden = true;
      if (control.value) {
        const fileExt = control.value.split('.').pop();
        validExt.split(',').forEach(ext => {
          if (ext.trim() == fileExt) {
            forbidden = false;
          }
        });
      }
      return forbidden ? { 'inValidExt': true } : null;
    };
  }
}
