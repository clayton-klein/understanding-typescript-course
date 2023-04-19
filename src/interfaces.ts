// the "interface" keyword is exclusive to TS, it doesn't exist in JS and if we check the compiled JS code we won't even see traces of the interfaces, it's a pure development feature that helps writing better code.

// by convention we should start the name of an interface with a capital letter like in classes.

// an interface defines how an object should look like, it cannot be instantiated, it's used to define and type-check a custom object type.

// we cannot initialize (assign values) the properties of interfaces, it should only be used to define the structure of the object type.

// just like in classes, in interfaces we also separate the properties/methods with semi-colons (;), but when we create the objects themselves we should separate those fields with colons (,).

// interfaces are a bit like abstract classes, but the main difference is that an interface must not have any implementation details at all, while in abstract classes we can have them.

// we can implement an interface in many different classes.

// we create this simple interface just to make an example of interface inheritance (see bellow).
interface Country {
  country: string;

  // by adding a "?" after the property name we're saying that this interface's property is optional...
  city?: string;

  // we can also do it with methods and their parameters (including the constructor's params).
  // myMehtod?(param?: boolean) {
  //     // then since the param is optional, it would be wise to check for it before doing something else.
  //     if(param){
  //         return param;
  //     }
  //     ...
  // }
}

// differently from classes, interfaces can inherit from multiple other interfaces (separated by a comma). Now any class that implements "Person" (or objects with the "Person" type) will also have to have the "country" property, this way we can create simpler interfaces and compose them if necessary using the "extends" keyword (inheritance), in this example "Person" is inheriting from just one other interface, but it could be more (this is a TS feature, in JS we cannot do that).
interface Person extends Country {
  // id: number = 007; // error, cannot assign a value to an interface's property.

  // we can use the "readonly" modifier on properties of interfaces (we cannot use "public" or "private" though).
  readonly name: string;
  age: number;

  // we can also define methods in interfaces, but again, only the structure/signature, it cannot have a body.
  greet(phrase: string): void;
}

// here we're defining the custom type "Person" to an uninitialized variable and hen initializing it with the values (except for the method, we just implemented it and passed the value for the func parameter later when we call it).
let user1: Person;
user1 = {
  name: "Clayton",
  age: 36,
  country: "Brazil", // we had to add this property later in the course (see line 14).
  greet(phrase: string): void {
    console.log(`${phrase} ${this.name}!`);
  },
};

console.log(user1);

user1.greet("Hi, I'm");

/* A custom object type could also be created using the "type" keyword, so why we should use interfaces?

    The main differences is legibility (when we use interfaces we're being clear we want to define a custom object type, while "type" is more generic) and differently from a "type", we can use interfaces in classes like a "contract" the class has to adhere to.
*/

// this is how we implement an interface in a class, a class can only inherit (extends) from 1 class, but it can have multiples implementations of interfaces (separated by commas).
class Someone implements Person {
  name: string;
  age: number;

  // we had to add this property later in the course (see line 15).
  country: string;

  // this property is not defined in the "Person" interface, we can have more properties/methods than our interfaces in our classes, we just need to make sure we implement everything defined in the interfaces inside our classes too.
  gender: string;

  constructor(name: string, age: number, gender: string, country: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.country = country;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}!`);
  }
}

// bellow we can define the type "Person" to this variable, because the class "Someone" implements "Person" and of course we could also have just defined it with the type "Someone" too, but here we could say we're being kinda flexible, because in this case it doesn't matter what else the class "Someone" has, we just need it to have at least the structure of the interface "Person".
let user2: Person;
user2 = new Someone("João", 40, "masculino", "New Zealand");

// bellow we get an error because the property "name" was defined as "readonly" on the "Person" interface and even though "user2" is an instance of "Someone" and we're not explicitly modifying the "name" property to "readonly" inside the "Someone" class, it "cascades" since the class "Someone" implements the interface "Person" (see line 11).
user2.name = "Maria";
console.log(user2);

// it's also possible to use interfaces as an alternative to create custom function's type (although it's more common and cleaner to do it using the "type" keyword, this is just a nice to have knowledge in case you see it in the wild).
interface addFn {
  // inside the interface we just structure the function like we would do with a method in a regular interface (just the types of the arguments and the return, without the body).
  (n1: number, n2: number): void;
}

let addFunction: addFn;

addFunction = (num1: number, num2: number) => {
  console.log(num1 + num2);
};
