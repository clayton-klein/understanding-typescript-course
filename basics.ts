// TypeScript is used for development ONLY, browsers don't run TS so we should always compile it to regular JavaScript for production.

// never keep both app.ts and app.js opened at the same time, otherwise you'll get errors that are related to the duplicity of code.

// the core primitive types in TS are ALL written in lowercase and they are: number, string, boolean, object, array, tuple, enum and any ('any' is very flexible, but avoid it whenever you can, otherwise you'd be just going back to the regular JS behavior and losing the advantages of TS types), some other types like 'Function' are written with the first letter capitalized.

function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  //  with TS this kind of manual type check bellow is not necessary in most cases, because we already specify the type of the variable at the beginning.

  //   if (typeof n1 !== "number" || typeof n2 !== "number") {
  //     throw new Error("Invalid input!");
  //   }
  const result = n1 + n2;

  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

// TS automatically adds types to variables by inference (the type of the value we initialze a variable will be the "fixed" type of that variable), we only need to explicitly add a type in this case if we initialize a variable without a value, like the example bellow.
let number1: number;
number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result is: ";

add(number1, number2, printResult, resultPhrase);
