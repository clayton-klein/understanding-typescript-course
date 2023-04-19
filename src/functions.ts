// by inference TS already defines the type of the returned value of functions, in this case if we hover over the function's name we'll see that it's 'number'.
function add(n1: number, n2: number) {
  return n1 + n2;
}

// bellow we're just making the type of the return of the function clearer by setting the type after the closing parenthesis ('void', because it doesn't return anything).
function printResult(num: number): void {
  console.log("Result: " + num);
}

printResult(add(5, 12));

// In JS if a func doesn't return anything, it'll return undefined by default, but 'undefined' is also a type in TS (but rarely used), so if we need to explicitly return the type 'undefined' by a function we should also explicitly return nothing at the end of it, otherwise we're gonna get an error that the func should return a value.
function printResult2(num: number): undefined {
  console.log("Result: " + num);
  return; // if we comment this line we'll get an error.
}

// bellow there is a very generic example of saying that we want a variable to hold a function, that's not ideal, because we would be able to receive any kind of function in that variable.
let combineValuesExample: Function;

// now here we're being explicit about the 'signature' of the type of the function we expect to receive in this variable (the sintax is similar to an arrow func).
let combineValues: (a: number, b: number) => number;

// here the assignment works...
combineValues = add;

console.log(combineValues(30, 12));

// but here it doesn't, because the 'printResult()' func doesn't receive 2 numbers as arguments and it also doens't return a number, so we get an error.
combineValues = printResult;

// bellow we're defining a function type for the callback parameter of the function.
function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
  const result = n1 + n2;
  callback(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);

  // the signature of the callback function in the definition of the function above says that the type of the return is 'void', so even we're being able to return a value here and it doesn't pop an error, the value itself will just be ignored and it wouldn't be possible to manipulate it inside the function definition.
  return result;
});

// bellow we're explicitly defining a function type (the structure/signature the function should have).
type sayHello = (greeting: string, name: string) => void;

// here we're creating a variable (without initializing it) and attributing to it the function type we created above.
let hello: sayHello;

// now here we're defining a function with the same signature of the type "sayHello".
hello = (greeting: string, name: string) => {
  console.log(`${greeting} ${name}! 🤜🤛`);
};

// and here we're finally calling the function :)
hello("Wassup", "Clayton");
