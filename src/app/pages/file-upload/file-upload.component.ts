import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subscription, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  percentCompleted: number = 0;
  isMultipleUploaded = false;
  isSingleUploaded = false;
  urlAfterUpload = '';
  percentUploaded = [0];
  acceptedExtensions = "jpg, jpeg, bmp, png, wav, mp3, mp4";

  @Input()
  requiredFileType!:string;

  fileName = '';
  uploadProgress: number = 0;
  uploadSub!: Subscription;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient) {}

  reportForm!: FormGroup;

  uploadForm = this.formBuilder.group({
    uploadFile: this.formBuilder.control('', [Validators.required, this.fileExtensionValidator(this.acceptedExtensions)])
  });

  upload(event: Event) {

    this.isSingleUploaded = false;
    this.urlAfterUpload = '';

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
          this.urlAfterUpload = event.body.link;
        }
      });
  }

  uploadWithProgress(formData: FormData): Observable<any> {

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });

    return this.http.post("http://localhost:8081/api/acompanhamento-leads/upload", formData, { observe: 'events',  reportProgress: true, headers: headers })
      .pipe(
        catchError((error) => {
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
