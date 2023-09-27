import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

type pizzaGroupType = {name: FormControl<string |null>, cut: FormControl<boolean | null>};
type addressGroupType = {street: FormControl<string | null>, houseNumber: FormControl<string | null>, postalCode: FormControl<number | null>, city: FormControl<string | null>}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{
  title = 'forms';
  public pizzaGroup;
  public sameAddress = false;

  constructor(private formBuilder: FormBuilder) {


  this.pizzaGroup = this.formBuilder.group({pizzas: this.formBuilder.array<FormGroup<pizzaGroupType>>([]),
   billingAddress: this.createAddressFormGroup(), deliveryAddress: this.createAddressFormGroup(), sameAddress: new FormControl(false)})
  }

  protected createAddressFormGroup(): FormGroup<addressGroupType> {
    return this.formBuilder.group({street: new FormControl<string>(''), houseNumber: new FormControl<string>(''), postalCode: new FormControl<number | null>(null), city: new FormControl<string>('')})
  }

  public addPizza() {
   const pizza = this.formBuilder.group({name: new FormControl(''), cut: new FormControl(false)});
   this.pizzaGroup.controls.pizzas.push(pizza);
  }
  public deletePizza(index: number) {
    this.pizzaGroup.controls.pizzas.removeAt(index);
  }

  public getPizzas() {
    return this.pizzaGroup.controls.pizzas.controls;
  }

  protected readonly JSON = JSON;

  ngOnInit(): void {
    this.pizzaGroup.controls.sameAddress.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.sameAddress = value;
      }
      if (value) {
        this.pizzaGroup.controls.billingAddress.reset();
      }
    })
  }
}
