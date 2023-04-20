//------------------------INTERSECTION TYPE-------------------------------

// example 1:
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;

  // Date is a TS type based on the Date object built in JS.
  startDate: Date;
};

/** here we're creating an "intersection" type, it's a type based on other types separated by the "&" sign, it's a bit like interfaces inheritance, we could have even created this type if Admin and Employee were interfaces. */
type elevatedEmployee = Admin & Employee;

const e1: elevatedEmployee = {
  name: "Clayton",
  privileges: ["write", "read"],
  startDate: new Date(),
};

console.log(e1);

// example 2:
/** although the "intersection" type is specially useful with "object" types, we can also create it based on any time, like the union types bellow
 */
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//------------------------TYPE GUARDS-------------------------------

/** "type guards" are not a feature of TS, they're more like techniques to check types before doing anything with our code, that's important because a custom "type" can be a mix of other types */

// example 1:
function addCombinables(p1: Combinable, p2: Combinable) {
  /** this check is a "type guard" using "typeof", that is, it allows us to use the flexibility of union types an ensures our code runs correctly at runtime depending on the type of the data we receive */
  if (typeof p1 === "string" || typeof p2 === "string") {
    return p1.toString() + p2.toString();
  }

  return p1 + p2;
}

// example 2:
type unknownEmployee = Employee | Admin;

function printEmployeeInfo(employee: unknownEmployee) {
  console.log(`Name: ${employee.name}`);

  /** bellow we got an error at first, because it's not guaranteed that "employee" will always have the "privileges" property, it could be a regular "Employee" type without the "privileges".
   * At the same time we couldn't just use "typeof" to check for equality, because later JS would not recognize these custom object types, the solution was to check if the property "privileges" exists "in" the employee object before doing anything else. */
  if ("privileges" in employee) {
    console.log(`Privileges: ${employee.privileges}`);
  }
  if ("startDate" in employee) {
    console.log(`Start Date: ${employee.startDate}`);
  }
}

printEmployeeInfo(e1);

// test object created without privileges.
printEmployeeInfo({ name: "Jack", startDate: new Date() });

// example 3:
class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a tuck...");
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo...${amount}`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  // both vehicle's classes have this method
  vehicle.drive();

  /** only the "Truck" class have the "loadCargo" method, so bellow we're checking to see if the vehicle we received in the function is an instance of this class before proceeding.
   * JS understands classes and that's why this is possible, but IF we we're using interfaces, then that would not be possible since JS does not have interfaces.
   */
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

//------------------------DISCRIMINATED UNION-------------------------------

/** it's a very useful pattern we can use when working with object types and union types that makes implementing type guards easier.
 */

/** bellow we added one common property (type) on both "Bird" and "Horse" interfaces (it could also be classes) that make up our union type and describes them (bird or horse) */
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number; // placeholder variable.

  /** now that both interfaces have a "type" property, we can check them using switch/case instead of "instanceof" (doesn't work with interfaces) or "in" (would be very repetitive to make an "if" check for each property).
   * with this pattern we also eliminated the risk of mistyping a property, because the editor helps us with autocompletion/typo error in this case.
   */
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }

  console.log(`Animal moving at speed: ${speed}Km/h.`);
}

moveAnimal({ type: "horse", runningSpeed: 15 });
moveAnimal({ type: "bird", flyingSpeed: 25 });

//------------------------TYPE CASTING-------------------------------

/** here, selecting by tag, if we hover over the name of the variable, TS knows what type of element this is */
const h1 = document.querySelector("h1");

/** but bellow, selecting by "id", TS has no idea about the exact type of element, so it returns a generic "HTMLElement"
 *
 * PS: the exclamation mark after the selection of the element bellow is just a way for us to say to TS that we're sure that this selection will not return "null" (without it we would get an error).
 */
const input = document.getElementById("userInput")!;

/** so here we get an error, because TS doesn't know that "input" has the property "value" in this case. */
input.value = "Test";

/** to solve it, there are 2 ways/syntaxes of type casting...
 *
 * the first one (showed bellow) is to place the type of the element we're selecting in front of the selection and between "<" and ">" */
const input1 = <HTMLInputElement>document.getElementById("userInput")!;

/** the second syntax for type casting is specially useful if we're using React, because the element between "<" and ">" symbols would be confused with JSX elements, so we pass the type of the element after the selection "as" blahblahblah */
const input2 = document.getElementById("userInput")! as HTMLInputElement;

// and now it works :)
input2.value = "Test 2";

/** the alternative to the exclamation mark showed on the examples above (in cases we're not sure if the selection could return null), would be to make an "if" check after selecting the element and inside of it we must attribute the "type casting" to the variable containing the element between parenthesis, this way it'll be evaluated first and only later the property "value" would be accessed, without the parenthesis it would not not work, it would be invalid syntax */
const input3 = document.getElementById("userInput");

if (input3) {
  (input3 as HTMLInputElement).value = "Test 3";
}

//----------------------INDEX TYPE/SIGNATURE----------------------------

/** it's a feature that allows us to create objects wich are more flexible regarding the properties they might hold.
 *
 * let's say we have an app with a form and we have to validate the inputs and we want different error messages for different inputs, but we don't know how many inputs we'll have and we want something reusable for other forms.
 *
 * basically we need objects where we're clear regarding the value type, but we don't know in advance how many properties we'll have and which name those properties will have and for this scenario we need index type/signature.
 */
interface ErrorContainer {
  /** we define an index type between "[]" with any name of our choice like "key" or "prop" inside of it, followed by a ":" than the type of the name of property/key itself (in JS it can be string, number or symbols) than another ":" and the type of the value of the property (key/value pair).
   *
   * with this we're saying we don't know the property name or the property count, we just know that every property that will be added to this object must have a property name and value of the string type.
   */
  [key: string]: string;

  /** we can still add predefined properties, but only if the type is the same of the type we defined in the index above, otherwise we get an error. */
  id: string;
}

/** now any object that adheres to the ErrorContainer interface must have an "id" property and it can add as many other properties as they need.  */
const errorBag: ErrorContainer = {
  id: "007",
  email: "Not a valid e-mail!",
  username: "Must start with a letter",
};
