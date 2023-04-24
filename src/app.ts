// ============== General Info About Decorators ==================
/**
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
 * There are five types of decorators we can use: Class Decorators,
 * Property Decorators, Method Decorators, Accessor Decorators,
 * Parameter Decorators.
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
 * The evaluation order of different types of decorators is well-defined:
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

// ============== Class Decorator ==================
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
 * Except for the "parameter decorator", we must ALWAYS use decorators right above
 * the name of the "member" (class, property, method, accessor) we want to
 * use it on.
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

// ============== Decorator Factory ==================
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
 * developers to use by adding it to a class, otherwise it would do
 * nothing and that is what some frameworks do (in a more elaborated
 * way ofc).
 */
function WithTemplate(template: string, hookId: string) {
  /**
   * The parameter "underscore" means that we know we'll receive an
   * argument, but we won't need it, in this case we have to specify
   * a variable name for the parameter and if we used any other name
   * TS would complain about declaring a variable not using it later.
   */
  return function (_: Function) {
    console.log("Rendering Template...");
    const hookEl = document.getElementById(hookId);

    if (hookEl) {
      hookEl.innerHTML = template;
    }
  };
}

/**
 * We can add multiple decorators anywhere in our classes, but they
 * have a specific order they run, basically from bottom to top (see
 * line 47).
 */
@LoggerFactory("Logging with multiple decorators")
@WithTemplate("<h2>This was created by a decorator function.</h2>", "app")
class Person3 {
  firstName = "Maria";

  constructor() {
    console.log("Creating Person3 object...");
  }
}

const personTemplate = new Person3();
console.log(personTemplate);

// ============== Property Decorator ==================
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

// ============== Accessor (get/set) Decorator ==================
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

// ============== Method Decorator ==================
/**
 * "Method decorators" also receive the same 3 arguments that "accessor decorators"
 * do, just the "descriptor" is a bit different, since it's a method and not an
 * accessor.
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

// ============== Parameter Decorator ==================
/**
 * "Parameter decorators" also receive 3 arguments, "target" is the same as the
 * others above, "name" refers to the name of the function where it was used and
 * "position" refers to the index of the parameter inside the function.
 */
function LogParameter(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator.");
  console.log(target);
  console.log(name);
  console.log(position);
}

// ============== Using Decorators ==================
class Product {
  /**
   * This "LogProperty" decorator executes even though we didn't instantiate
   * the "Product" class and that's because (as we saw earlier),
   * decorators are executed when classes are defined, not necessarily
   * when they are instantiated.
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
   * If the accessor decorator returns a value, it will be used as the Property
   * Descriptor for the member.
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
   * We use "parameters decorators" before the name of the parameter in the function,
   * and it's possible to have different decorators on different parameters in the
   * same function.
   */
  getPriceWithtax(@LogParameter tax: number) {
    return this._price * (1 + tax);
  }
}

/**
 * The decorators won't execute again just because we instanciated the class, they 
 * only execute once when the class is defined.
 */
const videoGame = new Product("PS5", 3500);
console.log(videoGame);

const laptop = new Product("Alienware", 13300);
console.log(laptop);
