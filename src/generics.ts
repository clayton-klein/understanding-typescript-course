/**
 * ------------------ General Info About Generics -----------------------
 *
 * In languages like C# and Java, one of the main tools in the toolbox for
 * creating reusable components is "generic types", that is, being able
 * to create a component (a class or a function) that can work over a
 * variety of types rather than a single one, this allows users to consume
 * these components and use their own types.
 *
 * While using the type "any" is certainly generic in that it will cause
 * a function for example to accept any and all types for the type of the
 * parameter, we actually are losing the information about what that type
 * was when the function returns. If we passed in an array for example,
 * the only information we would get back is that any type could be
 * returned and it would prevent us from using "type-specific methods",
 * like ".map()" for example.
 *
 * So "generics" or "generic types" allows us to be flexible with our
 * the types we need and have "type check/safety" at the same time.
 *
 * To create a generic type we need to use angle brackets "<...>" right
 * after the function or class name and pass the generic "variable" name
 * of the type into it.
 *
 * We could name the "variable" inside the brackets by any name, but by
 * convention we start it with the capital letter "T" and if we need more
 * generic types we follow the sequence of the alphabet (U, V, W...). This
 * "generic variable" works like a placeholder that holds the types of our
 * functions' parameters/returns or the properties/methods of our classes
 * and we can change it later if we need to be more specific about the
 * types we need (like <T> to <object> for example) or we can just let TS
 * define them automatically by inference.
 *
 * We can (and usually should) add "constraints" to our "generic types" to
 * make sure we get the type of the data we need, without it we could
 * receive any type of data as arguments in our functions or classes, like
 * a number or string instead of objects we may need.
 *
 * We can add a constraint by "extending" the generic type, in the case of
 * the mergeObj function bellow it should be "object" on both parameters
 * (but it could even be a custom type and on just one parameter for
 * example) and if we try to pass anything different we should get an
 * error.
 * 
 * One common source of confusion is the difference between "generics" and 
 * "union" types. With "generics", once we set a type we have to stick to
 * it throughout all the way in our functions or classes and with "union" 
 * types we can always mix the types we set, it can sound great, but 
 * there are times when this is exactly what we DON'T want, so we use 
 * "generics" instead.
 */

// ------------------------ Example 1 ---------------------------------
/**
 * By "extending" the "generic types" in the function mergeObj bellow,
 * basically what we're saying is that instead of the "parameters" of this
 * function be of the "object" type and return an "unknown" object or
 * instead of trying to be even more specific saying that they should
 * literally receive an object with the property "name" of the type
 * string" for example, we're just saying (on the definition of the
 * "generic type") that the parameters can (and probably will) receive
 * different objects with probably different "types" of properties in them
 * and the "return" should just be the intersection of those types and
 * then we assign the "generic types" as the type of the parameters.
 *
 * Without this "constraint" the app would "fail silently" in this case,
 * since it would be ok to accept any data type and what we really need
 * are objects.
 *
 * Pay attention to what we did on the mergeObj function bellow, first we
 * defined the "generic type variables" inside de angle brackets (it can
 * be any object, but it must be an object), then we assigned those
 * "variables" as the types of the paremeters and the same can be done with
 * classes and their properties and methods.
 */
function mergeObj<T extends object, U extends object>(obj1: T, obj2: U) {
  return Object.assign({}, obj1, obj2);
}

/**
 * Here we passed to the function objects with different properties and
 * data types and TS infers the return value automatically (hover over the
 * name of the function to see).
 */
const mergedObj = mergeObj({ name: "Clayton" }, { age: 36 });
console.log(mergedObj);

/**
 * Here, without the generic types, we wouldn't be able to access the
 * properties of the newly created object, because TS wouldn't know them,
 * it would just know that "mergedObj" is of type "object" and the
 * property "name" doesn't exist on type object, so we would get an error.
 */
console.log(mergedObj.name);

// ------------------------ Example 2 ---------------------------------
// Creating an interface with the property "length".
interface Lengthy {
  length: number;
}

/**
 * Bellow we created a function where we don't care about the argument it
 * receives (generic type) as long as it has the "length" property in it.
 *
 * We're also extending our generic "T" type to inherit from the "Lengthy"
 * interface and we're constraining the returned value of the function to
 * be a "tuple" with 2 values, where the first one must match the type
 * "Lengthy" and the second one must be a "string".
 */
function countAndShowLength<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";

  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 0) {
    descriptionText = `Got ${element.length} elements.`;
  }

  return [element, descriptionText];
}

console.log(countAndShowLength([]));
console.log(countAndShowLength({ length: 1 }));
console.log(countAndShowLength(["hobbies", "skills"]));
console.log(countAndShowLength("Howdy mate!"));

// It doesn't have the "length" property, so it won't work.
console.log(countAndShowLength(true));

// --------------------- KEYOF CONSTRAINT --------------------------

/**
 * On the function bellow at first we got an error, because we defined the
 * type of the first param as object and the type of the second as string,
 * but it's not garanteed that the object will have the key that we'll
 * pass to the function.
 */
function extractAndConvert(obj: object, key: string) {
  // Here the function doesn't know if this key exist in the obj.
  return `Value: ${obj[key]}`;
}

/**
 * Here we got "undefined" for trying to access a property that
 * doesn't exist in the object and TS is not alerting us about it...
 */
console.log(extractAndConvert({ name: "Clayton" }, "age"));

/**
 * So here what we did to solve the problem above was to use a generic
 * type "T" for the first param that extends object and another generic
 * type "U" for the second param that extends "keyof" type "T", it ensures
 * that the second param must be a key inside the object passed as the
 * first param to the function.
 */
function extractAndConvert2<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  // Now the function knows if the key exists or not in the "obj".
  return `Value: ${obj[key]}`;
}

/**
 * And here we got an error, because the property name doesn't exist
 * in this empty object.
 */
extractAndConvert2({}, "name");

// Now it works!
console.log(extractAndConvert2({ name: "Clayton" }, "name"));

// --------------------- GENERIC CLASSES --------------------------

/**
 * Bellow we created a class with just one generic type "T" for the sake
 * of simplicity, but it could be more, we could have methods with their
 * own different generic types for example.
 *
 * If we wanted to constrain the types accepted by this class it would go
 * like this for example:
 * class DataStorage<T extends number | string | boolean> {
 */
class DataStorage<T> {
  // Data will receive an array of the generic type "T".
  private data: T[] = [];

  // The parameters will also receive arguments of the generic type "T".
  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    /**
     * If we can't find an index that matches the one we want to delete
     * then just return so the code after the "if" won't be executed.
     */
    if (this.data.indexOf(item) === -1) {
      return;
    }

    /**
     * This would return -1 and remove the last element of the array if
     * it couldn't find one that matched with the index we passed to the
     * function (default behavior of the method "indexOf").
     */
    this.data.splice(this.data.indexOf(item), 1);
  }

  /**
   * By inference TS will return an array of the generic type "T" (hover
   * over the function name to see it).
   */
  getItems() {
    return [...this.data];
  }
}

// ------------- textStorage instance ---------------
/**
 * Here we're "transforming" the generic type "T" into the type "string",
 * but we could also use a union type like "string|number" for example or
 * even a custom one.
 */
const textStorage = new DataStorage<string>();

// And here we get an error for trying to add a number (see line 159).
textStorage.addItem(10);

textStorage.addItem("PlayStation");
textStorage.addItem("Xbox");
textStorage.addItem("Nintendo");
textStorage.removeItem("Nintendo");

/**
 * The code bellow will log the number 10 in the array, because remember,
 * in the end TS will be transpiled to JS and unless we configure TS to
 * not transpile while there are errors, it will just alert us about them
 * during development, for vanilla JS this is perfectly ok.
 */
console.log(textStorage);

// ------------- objStorage instance ---------------
/**
 * On the instance bellow we changed the generic type "T" to "object".
 *
 * At first we tried to make it work by passing the objects directly
 * into de functions, but objects are passed by reference and not by
 * value, so the methods weren't working properly to delete the itens,
 * since the references would always be different.
 *
 * The solution was to store the objects into variables and then to pass
 * the variables into the functions.
 *
 * We could constrain the types of the DataStorage class to only work with
 * primitive values (number, string, boolean) to avoid this kind of
 * problem (see line 176), then the type "object" would not be allowed
 * anymore.
 */
const objStorage = new DataStorage<object>();
/**
 * The objects on the 2 lines bellow look similar, but they have different
 * references in memory and that's why it wouldn't work properly.
 */
// objStorage.addItem({ name: "shirt" });
// objStorage.removeItem({ name: "shirt" });

// And that's how we should solve the reference problem.
const shirt = { name: "shirt" };
const trousers = { name: "trousers" };

objStorage.addItem(shirt);
objStorage.addItem(trousers);

console.log(objStorage.getItems());

objStorage.removeItem(shirt);
console.log(objStorage.getItems());

objStorage.removeItem(trousers);
console.log(objStorage.getItems());

// --------------- TS Built-In Utility Types Examples ----------------
/**
 * TypeScript provides several utility generic types to facilitate common
 * type transformations, they are available globally.
 *
 * Here we'll see just 2 examples, just be aware that these are TS
 * features only, they would not transpile to JS for example and should be
 * used only for development, like many other TS features.
 *
 * At this moment (04/2023) there are 22 utility types in TS, we can see
 * all of them and waht they do at: 
 * https://www.typescriptlang.org/docs/handbook/utility-types.html
 */

// --------------- Partial<Type>:
/**
 * Constructs a type with all properties of Type set to optional, this
 * utility will return a type that represents all subsets of a given type.
 */
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  /**
   * We could just do it like we did bellow and it would work, but let's
   * say that for any reason we need to do it step by step, maybe we have
   * some kind of check before assigning each data.
   */
  // return {
  //   title: title,
  //   description: description,
  //   completeUntil: date,
  // };

  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  /**
   * First we wouldn't be able to assign the data to the properties,
   * because they would not be available to the empty object that we
   * initialized the "courseGoal" variable with (at least not in TS,
   * because in JS it would be ok in this case).
   *
   * Then we tried to assign just the type "CourseGoal" to the variable
   * but TS complained again, because the object is empty and not with the
   * same signature of the interface.
   *
   * To solve the problem we used the "Partial" generic utility type
   * holding the "CourseGoal" type and what it does is to tell TS that
   * the empty object will be in the end a "CourseGoal" object.
   *
   * The Partial type kind of wraps our own type and changes all their
   * properties to optional temporarily and that's why the empty object is
   * not a problem anymore.
   *
   * In the end we had to use type casting on the return value to convert
   * the "courseGoal" variable type, otherwise the type would still be
   * Partial<CourseGoal> and not CourseGoal and we would have another
   * error.
   */

  return courseGoal as CourseGoal;
}

// --------------- Readonly<Type>:
/**
 * It constructs a type with all properties of that type set to readonly,
 * meaning the properties of the constructed type cannot be reassigned.
 *
 * Bellow we created a variable with the type "Readonly<string[]>" that
 * will hold an array of strings and then we tried to add and remove items
 * from it, technically it will work, because it's ok to do that in JS, but
 * now TS at least warns us with an error and depending on our tsconfig
 * it wouldn't even transpile.
 */
const names: Readonly<string[]> = ["Clayton", "Bruna", "Jack"];
names.push("Sarah");
names.pop();
console.log(names);
