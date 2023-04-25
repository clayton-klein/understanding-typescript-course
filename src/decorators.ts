// ================ General Info About Decorators =================
/**
 * The Decorator pattern is a structural design pattern that allows
 * you to dynamically add new behavior to objects. It does so by
 * wrapping them in special objects (functions in TS) called
 * decorators, which contain the added behavior. This is an
 * alternative to inheritance.
 *
 * The Decorator pattern is useful when you want to add behavior to
 * individual objects, rather than to an entire class of objects. It
 * is also useful when you want to add behavior without affecting the
 * existing hierarchy, or when you want to add behavior that can be
 * changed dynamically at runtime.
 *
 * When to use "decorators"? Some cases are...
 *  - Before/After hooks.
 *  - Watch property changes and method calls.
 *  - Transform parameters.
 *  - Add extra methods or properties.
 *  - Runtime type validation.
 *  - Auto serialization and deserialization.
 *  - Dependency Injection.
 *
 * Popular frameworks like Angular and Nest use decorators a lot.
 *
 * To be able to use "decorators" we first need to set the 2 options
 * in the tsconfig file, "target: ES6" and "experimentalDecorators:
 * true", because at this moment decorators are a stage 2 proposal for
 * JavaScript and are available as an experimental feature of
 * TypeScript.
 *
 * Decorators in general are related to classes and its members and in
 * the the end they're basically functions.
 *
 * There are five types of decorators we can use:
 *  - Class Decorators,
 *  - Property Decorators,
 *  - Method Decorators,
 *  - Accessor Decorators,
 *  - Parameter Decorators.
 *
 * Decorators provide a way to add both annotations and a
 * meta-programming syntax for class declarations and members.
 *
 * Applying decorators is a lot like composing a chain of
 * functions, pretty much like higher-order function or class. With
 * decorators, we can easily implement proxy pattern to reduce our
 * code and do some cool things.
 *
 * Decorators are "executed only once" when a class is defined and
 * not when it is instantiated, so we don't even need to instantiate a
 * class to have a decorator being executed.
 *
 * The evaluation order of different types of decorators is
 * well-defined:
 *  1) Parameter Decorators, followed by Method, Accessor, or Property
 * Decorators are applied for each instance member.
 *  2) Parameter Decorators, followed by Method, Accessor, or Property
 * Decorators are applied for each static member.
 *  3) Parameter Decorators are applied for the constructor.
 *  4) Class Decorators are applied for the class.
 *
 * We can apply multiple decorators to a single target. The evaluation
 * order of the decorators composed is:
 *  1) Outer Decorator Evaluate.
 *  2) Inner Decorator Evaluate.
 *  3) Inner Decorator Call.
 *  4) Outer Decorator Call.
 */

// ==================== Class Decorator ========================
/**
 * This function is a "class decorator", it's not necessarily a
 * convention, but it's common to see the name of the decorators
 * starting with a capital letter.
 */
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

/**
 * Here we're using the "class decorator", the "@" symbol is an
 * special identifier that TS recognizes and directly in front of it
 * we should point to a function (the decorator) without the "()";
 *
 * Except for the "parameter decorator", we must ALWAYS use decorators
 * right above the name of the "member" (class, property, method,
 * accessor) we want to use it on.
 */
@Logger
class Person {
  firstName = "Clayton";

  constructor() {
    console.log("Creating Person object...");
  }
}

const person1 = new Person();

/**
 * The decorator's message and the class itself will be logged first,
 * then the constructor's message and only then the instance of the
 * class.
 */
console.log(person1);

// ==================== Decorator Factory ========================
/**
 * A decorator factory returns a decorator function, but it allows us
 * to configure it when we assign it as a decorator to something.
 *
 * Now we can have a parameter in the decorator and pass to it the
 * message to log when we call it on the class.
 */
function LoggerFactory(logString: string) {
  console.log("Logger Factory...");

  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

/**
 * We need to execute (use the parenthesis) it as a regular
 * function in this case, then the "outer" function "LoggerFactory"
 * will return the attached value (wich is another function) as the
 * decorator to this class.
 *
 * The advantage is that now we can and pass in arguments to be used
 * in the returned "inner" decorator function.
 */
@LoggerFactory("Logging: personFactory")
class Person2 {
  firstName = "João";

  constructor() {
    console.log("Creating Person2 object...");
  }
}

const personFactory = new Person2();
console.log(personFactory);

/**
 * The decorator bellow is an example of "meta programming", because
 * we're creating a decorator (tool) that could be exposed for other
 * developers to use by adding it to classes, otherwise it would do
 * nothing and that is what some frameworks do (in a more elaborated
 * way ofc).
 */
function WithTemplate(template: string, hookId: string) {
  console.log("Factory With Template");

  /**
   * The parameter "underscore" means that we know we'll receive an
   * argument, but we won't need it, in this case we have to specify
   * a variable name for the parameter and if we used any other name
   * TS would complain about declaring a variable not using it later.
   */
  // The param's name bellow changed later in the course, but we
  // used this feature again in line 189.
  // return function (_: Function) {

  /**
   * Bellow we're using a generic type and extending a special object
   * type with the "new" keyword as a method and it tells TS that
   * it'll be an object that can be "newed" and it'll receive any
   * amount of arguments and in the end it must return an object with
   * at least a "firstName" property.
   */
  return function <T extends { new (...args: any[]): { firstName: string } }>(
    originalConstructor: T
  ) {
    /**
     * In order to do some more advanced things with decorators we can
     * return values from them, the kind of values will depend on what
     * kind of decorator we're working with, in this case is a class
     * decorator, so we can return a new constructor which will
     * replace the original one.
     *
     * Remenber, the "class" keyword returned bellow is just a
     * "syntactic sugar" to create a constructor function in JS/TS
     * and we can (and in this case should) extend the constructor
     * we'll receive (the original one, so we can keep all the
     * properties).
     */
    return class extends originalConstructor {
      /**
       * Now, since here we created a new constructor that will
       * replace the original one, this logic will be executed every
       * time we instantiate a new object from a class using this
       * decorator and that's a new behavior since normally a
       * decorator only executes once when the class is defined,
       * with this we can add/extend new logic to objects.
       */

      constructor(..._: any[]) {
        /**
         * Remember, if we add a constructor in a class that extends
         * another class we need to call "super()" inside of the
         * constructor.
         */
        super();

        // then we can add whatever logic we need.
        console.log("Rendering Template...");
        const hookEl = document.getElementById(hookId);

        if (hookEl) {
          hookEl.innerHTML = template;
        }
      }
    };
  };
}

/**
 * We can add multiple decorators anywhere in our classes, but they
 * have a specific order they run, basically from bottom to top (see
 * line 63).
 */
@LoggerFactory("Logging with multiple decorators")
@WithTemplate("<h2>This was created by a decorator function.</h2>", "app")
class Person3 {
  firstName = "Maria";

  constructor() {
    console.log("Creating Person3 object...");
  }
}

/**
 * Now, since we replaced the original constructor of the class
 * "Person3" in the factory decorator "WithTemplate", this
 * instance object will be created with the logic of the latter.
 */
const personTemplate = new Person3();
console.log(personTemplate);

// ================== Property Decorator ======================
/**
 * When we add a decorator to a property, the decorator receive 2
 * arguments (target and propertyName, but they don't need to have
 * these names), if we use a decorator on an instance property
 * the target will be the "prototype" of the object that was created
 * and if we had a "static" property then target would refer to the
 * "constructor" function instead.
 */
function LogProperty(target: any, propertyName: string | Symbol) {
  console.log("Property decorator.");
  console.log(target, propertyName);
}

// ================= Accessor (get/set) Decorator ===================
/**
 * When we add a decorator to an accessor, the decorator receive 3
 * arguments (target, name and descriptor), if we use the decorator
 * on an instance property the "target" will be the "prototype" of
 * the object that was created and if we had a "static" property
 * then target would refer to the "constructor" function instead,
 * the "name" refers to the name of the accessor and the descriptor
 * refers to the "property descriptor" of the member in which the
 * decorator was applied to.
 *
 * Here we also used a special TS type for the desciptor.
 */
function LogAccessor(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor decorator.");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// ==================== Method Decorator ========================
/**
 * "Method decorators" also receive the same 3 arguments that
 * "accessor decorators" do, just the "descriptor" is a bit different,
 * since it's a method and not an accessor.
 */
function LogMethod(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator.");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// ================== Parameter Decorator =====================
/**
 * "Parameter decorators" also receive 3 arguments, "target" is the
 * same as the others above, "name" refers to the name of the function
 * where it was used and "position" refers to the index of the
 * parameter inside the function.
 */
function LogParameter(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator.");
  console.log(target);
  console.log(name);
  console.log(position);
}

// ==================== Using Decorators =========================
class Product {
  /**
   * This "LogProperty" decorator executes even though we didn't
   * instantiate the "Product" class and that's because (as we saw
   * earlier), decorators are executed when classes are defined, not
   * necessarily when they are instantiated.
   */
  @LogProperty
  title: string;
  private _price: number;

  /**
   * TypeScript disallows decorating both the "get" and "set" accessor
   * for a single member. Instead, all decorators for the member must
   * be applied to the first accessor specified in document order.
   * This is because decorators apply to a "Property Descriptor", which
   * combines both the get and set accessor, not each declaration
   * separately.
   *
   * If the accessor decorator returns a value, it will be used as the
   * Property Descriptor for the member.
   */
  @LogAccessor
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - it should be a positive value!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @LogMethod
  /**
   * We use "parameters decorators" before the name of the parameter
   * in the function, and it's possible to have different decorators
   * on different parameters in the same function.
   */
  getPriceWithtax(@LogParameter tax: number) {
    return this._price * (1 + tax);
  }
}

/**
 * The decorators won't execute again just because we instanciated the
 * class, they only execute once when the class is defined.
 */
const videoGame = new Product("PS5", 3500);
console.log(videoGame);

const laptop = new Product("Alienware", 13300);
console.log(laptop);

// ============== Auto Bind Method Decorator Example ===============

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  /**
   * The "property descriptor" is an object with a property "value"
   * that holds the name of the method in this case, to see more
   * info about this object check out the documentation:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
   */
  const originalMethod = descriptor.value;

  // Here we're creating our custom "property descriptor" object.
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,

    /**
     * This "get" method works like a "value" property that runs
     * extra logic before the value is returned.
     */
    get() {
      /**
       * "this" will refer to whatever triggers this method, in
       * this it'll be the object in which we originally defined
       * the method.
       */
      const boundFunc = originalMethod.bind(this);
      return boundFunc;
    },
  };

  // this will overwrite the original descriptor
  return adjustedDescriptor;
}

// dummy class
class Printer {
  message = "This works!";

  // using our newly created decorator
  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const btn = document.querySelector("button")!;
/**
 * Here we had to use the ".bind()" method to change the "scope"
 * of the "this" keyword to be the "p" object and not the "target"
 * (button element) attached to the "addEventListener" function.
 */
// btn.addEventListener("click", p.showMessage.bind(p));

/**
 * With our "AutoBind" method decorator we don't need to bind
 * the "this" keyword manually like on the example right above
 * anymore and it could be reusable!
 */
btn.addEventListener("click", p.showMessage);

// now it binds "this" correctly no matter where we call it.
p.showMessage();

// ============= Validation With Decorators Example ==============

// a storage to work with
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

/**
 * When the app starts no validators have been registered yet,
 * that's why the empty object.
 */
const registeredValidators: ValidatorConfig = {};

/**
 * The 2 "property decorators" bellow will be used to add something
 * to the registeredValidators.
 *
 * Remember that a "property decorator" receive 2 arguments (target
 * and name).
 */
function Required(target: any, propName: string) {
  /**
   * The prototype of the instance we're working with will have a
   * constructor key which points at the constructor function that
   * was used to create our object and since any function in JS has
   * a name property, basically we registered the class name as a key.
   */
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

// another prop decorator
function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

/**
 * This function should go through all registered validators and
 * run different logic based on which validator it finds.
 */
function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];

  if (!objValidatorConfig) {
    /**
     * If there's nothing to validate then it's certainly already
     * valid.
     */
    return true;
  }

  /**
   * The loop bellow give us access to all the properties names
   * which might have validators.
   */
  let isValid = true; // flag
  for (const prop in objValidatorConfig) {
    /**
     * Since we get an array, we loop over it to get validators values
     * like "required" or "positive" and store it in the "validator"
     * variable.
     */
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          /**
           * Check if the title exists.
           *
           * Here we used "!!" (bang operator) to convert the value
           * to a boolean, because we want to return "true" if the
           * object has a non empty value.
           */
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          // Check if the price is a negative value.
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  // now we return something in all circumstances.
  return isValid;
}

class Course {
  /**
   * We registered these props and their validators in our global
   * ValidatorConfig when the class is defined.
   */
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleEl = document.getElementById("courseTitle") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;

  /**
   * We added the "+" sign to convert the returned input value
   * to a number (values from inputs are string by default).
   */
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  /**
   * Here we're using the "validate" function from our "Required"
   * decorator.
   */
  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }

  console.log(createdCourse);
});
