/**
 * In the function bellow we are using 'union types' on the function's 
 * params (number OR string) and they are separated by a pipe sign '|' and 
 * it's possible to add more than 2 types.
*/ 

/**
 * This is the sintax of 'type-alias', this is used to compose more 
 * complex type definitions (including complex objects for example) so we 
 * can write cleaner and less repetitive code.
*/ 
type Combinable = number | string;

function combine(
  input1: Combinable,
  input2: Combinable,

  /**
   * These are called 'literal-types', they are strings we created with
   * specific values for our params, anything different than those literal
   * types will result in an error (including typos ofc).
   */
  resultConversiton: "as-number" | "as-text"
) {
  let result;

  /**
   * Tere we had to make this check, otherwise TS would complain about the
   * '+' sign being used for numbers and strings, this is not always
   * necessary, but it's common to do this kind of check in cases like
   * this since we're working with more than one type of value.
   */
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  if (resultConversiton === "as-number") {
    /**
     * The '+' sign in front of an string is a simple way of converting it
     * to a number, the alternative would be to use 'parseInt()' or
     * 'parseFloat()' for example.
     */
    return +result;
  } else {
    return result.toString();
  }
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Tom", "Jerry", "as-text");
console.log(combinedNames);
