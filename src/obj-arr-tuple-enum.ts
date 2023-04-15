// in this case TS automatically (by inference) creates an object type with the propety 'name' as the type of string and the property 'age' as the type of number and if we try to change it later to another kind of type, we'll get an error.
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // this is the declaration of a tuple (a fixed-length and fixed-type array with the types of each index declared inside of it), this data structure doesn't exist in regular JS.
} = {
  name: "Clayton",
  age: 36,
  hobbies: ["Surfing the web", "Reading", "Watching movies/series"], // automatically infers that this is an array of the type string, if we try to add an item of any other type later, we'll get an error.
  role: [7, "web developer"], // let's say that role number 7 is 'web developer'... without declaring the tuple above, TS would (by inference) create a regular array with the types number OR string and that would be too generic, because we would be able to mess with with the types, like passing just one value or two values of the same type (string or number) or to invert the order of the types and it would be acceptable by the program, but WRONG.
};
console.log(person);

// .push() is an exception and in this case TS won't catch an error, but if we try to manually add 3 items on the tuple like bellow we'll get an error.
// person.role.push("web ninja");

// error, can't add 3 values into a tuple predefined with 2.
// person.role = [0, 'user', 'vip'];

// error, because it expects an string at index 1.
// person.role[1] = 10;

// error, number instead of string.
// console.log(person.name = 007);

// error, the property doesn't exist in the original object.
// console.log(person.address);

// we could also create a 'type object' like the one bellow, but it would get redundant and unnecessary in this case since TS already does that under the hood:
// const person2: {
//     name: string;
//     age: number;
// } = {
//   name: "Maria",
//   age: 40,
// };

// since TS already knows that hobby is an item of an array of strings, it already makes it available the string mathods to us.
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());

  // here we get an error, because TS already knows that hobby is an string and not an array so we can't use the array method '.map()'.
  // console.log(hobby.map());
}

// enums basically allows us to assign labels to numbers for better legibility (use names instead of code numbers, a more 'human readable way'), by convention the name of the enum starts with a capital letter and the values inside of it are all uppercase, the values are like named placeholders for indexes in an array (ADMIN = 0 and soon...). That's the default behavior of enums, but we could also set default values for them like ADMIN = 123 or enum Size {SMALL = 'S', MEDIUM = 'M', LARGE = 'L'}. 
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person2 = {
  name: "Mary",
  age: 40,
  hobbies: ["Cooking", "Dancing"],
  role: Role.ADMIN, // this is how we use an enum.
};

if (person2.role === Role.ADMIN) {
  console.log(person2.role); // equals 0
}
