import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import {Product} from 'src/app/models/product';
import {ProductService} from '../../services/product.service';
import { qs } from 'qs';
import { element } from 'protractor';

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {range: true};
    }
    return null;
  };
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  id: number;
  product: Product;
  addEditForm: FormGroup;
  selectedImage1: File = null ;
  selectedImage2: File = null ;
  selectedImage3: File = null ;
  imageUrl1: any;
  imageUrl2: any;
  imageUrl3: any;
  public imagePath1;
  public imagePath2;
  public imagePath3;
  productNamemessage: string;
  productCodemessage: string;
  ratingmessage: string;
  quantitymessage: string;
  pricemessage: string;
  brandmessage: string;
  descriptionmessage: string;
  imagemessage: string;
  errorMessage: string;
  gendermessage: string;
  typemessage: string;
  optImage = false;
  imagesForRemoving = [];
  index = 0;


  private validatorsMessages = {
    productNamerequired: 'Please enter the product name.',
    productNameminlength: 'Product name must be at least 7 characters.',
    productCoderequired: 'Please enter the product code.',
    productCodeminlength: 'Product code must be at least 7 characters.',
    releaseDaterequired: 'Please enter the release date of the product.',
    pricerequired: 'Please enter the product price.',
    pricemin: 'The product price has to be at least 1 dollar.',
    starRatingrequired: 'Plaese enter the product rating.',
    starRatingrange: 'The product range must be between 1 and 5.',
    descriptionrequired: 'Product description must be provided.',
    quantityrequired: 'Please enter the product quantity.',
    quantitymin: 'There must be at least 1 replica of the product.',
    brandrequired: 'Please enther the product brand.',
    brandminlength: 'Brand name must be at least 4 charachters.',
    imagerequired: 'One image must be provided.',
    genderrequired: 'The gender for the product must be chosen.',
    typerequired: 'The type of the product must be chosen.'
  };

  constructor(private fb: FormBuilder,
              private router: ActivatedRoute,
              private productService: ProductService,
              private routeNavigator: Router) {
  }

  ngOnInit() {
    this.addEditForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(7)]],
      productCode: ['', [Validators.required, Validators.minLength(7)]],
      starRating: [null, [Validators.required, ratingRange(1, 5)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(1)]],
      brand: ['', [Validators.required, Validators.minLength(4)]],
      description: [null, Validators.required],
      gender: [, Validators.required],
      type: [, Validators.required]
    });

    this.router.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.id = id;
        console.log(id);
        this.addEditForm.reset();
        this.imageUrl2 = null;
        this.imageUrl3 = null;
        this.imageUrl1 = null;
        this.getProduct(id);
      }
    );

    const productNameControl = this.addEditForm.get('productName');
    productNameControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setProductNameMessage(productNameControl)
    );

    const productCodeControl = this.addEditForm.get('productCode');
    productCodeControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setProductCodeMessage(productCodeControl)
    );

    const ratingControl = this.addEditForm.get('starRating');
    ratingControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setRatingMessage(ratingControl)
    );

    const quantityControl = this.addEditForm.get('quantity');
    quantityControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setQuantityMessage(quantityControl)
    );

    const priceControl = this.addEditForm.get('price');
    priceControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setPriceMessage(priceControl)
    );

    const brandControl = this.addEditForm.get('brand');
    brandControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setBrandMessage(brandControl)
    );


    const descriptionControl = this.addEditForm.get('description');
    descriptionControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setDescriptionMessage(descriptionControl)
    );

    // const imageControl = this.addEditForm.get('image1');
    // imageControl.valueChanges.pipe(debounceTime(1000)).subscribe(
    //   value => this.setImageMessage(imageControl)
    // );

    const genderControl = this.addEditForm.get('gender');
    genderControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setGenderMessage(genderControl)
    );

    const typeControl = this.addEditForm.get('type');
    typeControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setTypeMessage(typeControl)
    );

    // if (this.id === 0) {
    //   this.product = new Product();
    // } else {
    //   this.productService.getProductById(this.id).subscribe({
    //     next: productt => {
    //         this.product = productt;
    //         this.displayValue();
    //     },
    //     error: err => this.errorMessage = err
    //   });
    // }
  }

  getProduct(id: number): void {
    if (id !== 0) {
      this.productService.getProductById(id).subscribe({
        next: productt => {
            this.product = productt;
            this.displayValue();
        },
        error: err => this.errorMessage = err
      });
    } else {
      this.product = new Product();
      console.log('Add product!!');
    }
  }

  displayValue(): void {
    this.addEditForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      quantity: this.product.quantity,
      price: this.product.price,
      brand: this.product.brand,
      description: this.product.description,
      gender: this.product.category.gender,
      type: this.product.category.type
    });
  }

  setProductNameMessage(c: AbstractControl): void {
    this.productNamemessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.productNamemessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['productName' + key]
      ).join(' ');
    }

  }

  setProductCodeMessage(c: AbstractControl): void {
    this.productCodemessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      // console.log('productCode' + Object.keys(c.errors));
      this.productCodemessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['productCode' + key]
      ).join(' ');
    }
    // console.log(this.productCodemessage);

  }

  setRatingMessage(c: AbstractControl): void {
    this.ratingmessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      // console.log('productCode' + Object.keys(c.errors));
      this.ratingmessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['starRating' + key]
      ).join(' ');
    }
    // console.log(this.productCodemessage);

  }

  setQuantityMessage(c: AbstractControl): void {
    this.quantitymessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      // console.log('productCode' + Object.keys(c.errors));
      this.quantitymessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['quantity' + key]
      ).join(' ');
    }
    // console.log(this.productCodemessage);

  }

  setPriceMessage(c: AbstractControl): void {
    this.pricemessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      // console.log('productCode' + Object.keys(c.errors));
      this.pricemessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['price' + key]
      ).join(' ');
    }
    // console.log(this.productCodemessage);

  }


  setBrandMessage(c: AbstractControl): void {
    this.brandmessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      // console.log('productCode' + Object.keys(c.errors));
      this.brandmessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['brand' + key]
      ).join(' ');
    }
    // console.log(this.productCodemessage);

  }

  setDescriptionMessage(c: AbstractControl): void {
    this.descriptionmessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      // console.log('productCode' + Object.keys(c.errors));
      this.descriptionmessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['description' + key]
      ).join(' ');
    }
    // console.log(this.productCodemessage);

  }

  // setImageMessage(c: AbstractControl): void {
  //   this.imagemessage = '';
  //   if ((c.touched || c.dirty) && c.errors) {
  //     // console.log('productCode' + Object.keys(c.errors));
  //     this.imagemessage = Object.keys(c.errors).map(
  //       key => this.validatorsMessages['image' + key]
  //     ).join(' ');
  //   }
  //   // console.log(this.productCodemessage);

  // }


  setGenderMessage(c: AbstractControl): void {
    this.gendermessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      // console.log('productCode' + Object.keys(c.errors));
      this.gendermessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['gender' + key]
      ).join(' ');
    }
    // console.log(this.productCodemessage);

  }


  setTypeMessage(c: AbstractControl): void {
    this.typemessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      // console.log('productCode' + Object.keys(c.errors));
      this.typemessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['type' + key]
      ).join(' ');
    }
    // console.log(this.productCodemessage);

  }

 emptyMockFile(): File {
    const contentData = 'Fake file.';
    const data = new Blob([contentData] , { type: 'application/image'});
    const arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    return new File(arrayOfBlob, 'Mock.png');
  }

  save(): void {
    if (this.addEditForm.valid) {
      if (this.addEditForm.dirty || this.selectedImage1 != null || this.selectedImage2 != null || this.selectedImage2 != null ||
        this.imagesForRemoving.length !== 0) {

        if (this.id === 0) {
          const product = this.addEditForm.value;
          const formData = new FormData();
          formData.append('product', JSON.stringify(product));
          formData.append('image1', this.selectedImage1);
          formData.append('image2', this.selectedImage2 == null ? this.emptyMockFile() : this.selectedImage2);
          formData.append('image3', this.selectedImage3 == null ? this.emptyMockFile() : this.selectedImage3);
          // alert(JSON.stringify(p));
          this.productService.createProduct(formData)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          const product = this.addEditForm.value;
          const formData = new FormData();
          formData.append('product', JSON.stringify(product));
          formData.append('image1', this.product.images[0].base64format);
          formData.append('image2', this.product.images.length > 1  ? this.product.images[1].base64format : ' ');
          formData.append('image3', this.product.images.length > 2  ? this.product.images[2].base64format : ' ');
          formData.append('image1Update', this.selectedImage1 != null ? this.selectedImage1 : this.emptyMockFile());
          formData.append('image2Update', this.selectedImage2 != null ? this.selectedImage2 : this.emptyMockFile());
          formData.append('image3Update', this.selectedImage3 != null ? this.selectedImage3 : this.emptyMockFile());
          formData.append('removeImages', this.imagesForRemoving.join(' '));
          this.productService.updateProduct(formData, this.id)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    this.addEditForm.reset();
    this.routeNavigator.navigate(['/admin-managment/products']);
  }

  onFileChange1(event) {
    this.selectedImage1 = null;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedImage1 = file;

      const type = event.target.files[0].type;
      if (type.match(/image\/.*/) == null) {
        this.imagemessage = 'Only images are supported.';
        return;
      }

      // tslint:disable-next-line:prefer-const
      let reader = new FileReader();

      this.imagePath1 = file;
      reader.readAsDataURL(file);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imageUrl1 = reader.result;
      };

    }
  }

  onFileChange2(event) {
    this.selectedImage2 = null;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedImage2 = file;

      // tslint:disable-next-line:prefer-const
      let reader = new FileReader();

      this.imagePath2 = file;
      reader.readAsDataURL(file);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imageUrl2 = reader.result;
      };

    }
  }

  onFileChange3(event) {
    this.selectedImage2 = null;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedImage3 = file;

      // tslint:disable-next-line:prefer-const
      let reader = new FileReader();

      this.imagePath3 = file;
      reader.readAsDataURL(file);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imageUrl3 = reader.result;
      };

    }
  }

  toggleOptImage(): void {
    this.optImage = !this.optImage;
  }

  removeImage(imageIndex: number, operation: string) {
    this.product.images[imageIndex].imageToggled = !this.product.images[imageIndex].imageToggled;
    if (operation === 'remove') {
      this.imagesForRemoving.push(this.product.images[imageIndex].id);
    } else {
      const index: number = this.imagesForRemoving.indexOf(this.product.images[imageIndex].id);
      if (index !== -1) {
        this.imagesForRemoving.splice(index, 1);
      }
    }
  }
}
