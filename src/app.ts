/** In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is "generics" types, that is, being able to create a component that can work over a variety of types rather than a single one.
 *
 * This allows users to consume these components and use their own types.
 *
 * While using the type "any" is certainly generic in that it will cause a function for example to accept any and all types for the type of the parameter, we actually are losing the information about what that type was when the function returns. If we passed in a number, the only information we would have is that any type could be returned and it would prevent us from using "type-specific methods", like ".map()" on arrays for example.
 */

/** to create a generic type we need to use angle brackets "<...>" right after the function's name and pass the "variable" name of the type into it.
 *
 * we could name the variable inside the brackets by any name, but by convention we start it with the capital letter "T" and if we need more types we follow the sequence of the alphabet (U, V, W...).
 *
 * we can (and usually should) add "constraints" to our generic types to make sure we get the type of the data we need, without it we could receive any type of data as arguments in our function (like a simple number or string), not specifically the objects we need in this case. We can add a constraint by "extending" the generic type, in the case of the mergeObj function it should be "object" on both parameters (but it could even be a custom type and on just one parameter for example) and if we try to pass anything different we should get an error. Without the constraint the app would "fail silently".
 *
 * so basically what we're saying in the function bellow is that instead of the parameters of this function be of the "object" type and return an "unknown" object or instead of trying to be even more specific saying that it would literally receive an object with the property "name" of the type "string" for example, we're just saying that the parameters can (and probably will) be different objects with probably different types of properties in them and the return should just be the intersection of those types.
 */
function mergeObj<T extends object, U extends object>(obj1: T, obj2: U) {
  return Object.assign({}, obj1, obj2);
}

/**
 * here we passed to the function objects with different properties and data types and TS infers the return value automatically (hover over the name of the function to see).
 */
const mergedObj = mergeObj({ name: "Clayton" }, { age: 36 });
console.log(mergedObj);

/** here, without the generic types, we wouldn't be able to access the properties of the newly created object, because TS wouldn't know them, it would just know that "mergedObj" is of type "object" and the property "name" doesn't exist on type object, so we would get an error.
 */
console.log(mergedObj.name);

// example 2:
// creating an interface (object) with the property "length".
interface Lengthy {
  length: number;
}

/** bellow we created a function where we don't care about the argument it receives (generic type) as long as it has the "length" property in it. We're also extending our generic "T" type to inherit from the "Lengthy" interface and we're constraining the returned value of the function to be a "tuple" with 2 values, where the first one must match the type "Lengthy" and the second one must be a "string".
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

// it doesn't have the "length" property, so it won't work.
console.log(countAndShowLength(true));
