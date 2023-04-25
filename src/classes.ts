/**
 * We had to add the "abstract" modifier in this class later in the course
 * to implement an abstract function as part of the exercises.
 *
 * Abstract classes cannot be directly instantiated, only inherited or
 * extended.
 *
 * We also use abstract methods and properties when we want to enforce
 * that a child class must implement them, we shouldn't implement them 
 * on the parent class though, the implementation is the job of the child
 * classes (see line 42).
 */
abstract class Department {
  /**
   * static properties and methods are NOT "passed" to instances of a
   * class, they are usually used for utility porpuses and we can access
   * them without the need of instantiating the class itself.
   *
   * Two important thing to keep in mind about static properties and
   * methods are that we cannot access them insite the "non static parts"
   * of or class with the "this" keyword (see line 27) and the constructor
   * method cannot be static.
   */
  static fiscalYear = 2023;

  /**
   * The properties "id" and "name" bellow were commented out because we
   * used TS shortcut later directly on the construtor (see line 17).
   */

  // private readonly id: string;

  /**
   * The public "access modifier" is the default in TS, therefore there is
   * no need to explicitly add it here.
   */
  //   public name: string;

  /**
   * Differently from JS, TS uses the "private" keyword instead of "#" for
   * private fields/properties.
   */
  // private employees: string[] = [];

  // protected modifier changed later, see comment on line 92.
  protected employees: string[] = [];

  /**
   * To avoid the inconveniance of having to create a property, then pass
   * it to the constructor as argument and then to create and assign the
   * value of the argument to a variable inside the constructor, we can
   * just use the "access modifier" in front of the parameters in TS and
   * it will automatically do it for us, it's like a shortcut (but in this
   * case we MUST be explicit about the public fields).
   */

  /**
   * The "readonly" is a TS keyword that when used, it ensures that the
   * property cannot be modified after inicialization.
   */
  constructor(protected readonly id: string, public name: string) {
    /**
     * Using the "access modifier" in front of the parameter we can
     * also get rid of the 2 lines bellow since TS will create them
     * for us.
     */
    // this.id = id;
    // this.name = name;

    /**
     * Here we get an error, because fiscalYear is a static property,
     * therefore it's not passed on to the instances of this class,
     * therefore we cannot use the "this" keyword on it, because the
     * "this" keyword refers to the object that is calling it and that
     * instance object will not have access to this static property (or
     * method if that's the case), because well it's static and belongs
     * only to this class.
     */
    console.log(this.fiscalYear);

    /**
     * If we really want to access static properties (or methods)
     * inside this class where they were created or from an instance
     * of this class, we could fix the code above by dropping the
     * "this" keyword and accessing it directly from the class name.
     */
    console.log(Department.fiscalYear);
  }

  /**
   * In TS we can use a "pseudo parameter" with the "this" keyword and 
   * assign a type to it (in this case the name of the class)...
  // describe(this: Department) {
  //   console.log(`Department (${this.id}): ${this.name}`);
  // }

  /**
   * Here we just initialized the method, but it doesn't even have
   * a body"{}" and that's because it should be implemented by the
   * child classes.
  */
  abstract describe(this: Department): void;

  static createEmployee(name: string) {
    return { name: name };
  }

  addEmployee(employee: string) {
    /**
     * It's not possible to change the "id" bellow, because it's a
     * read-only property (see line 13).
     */
    this.id = "456";
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

/**
 * Bellow we were able to access the "static" method and property
 * directly on the class, without the need of instantiating it.
 */
const testStaticEmployeeMethod = Department.createEmployee("Xinotrufia");
console.log(testStaticEmployeeMethod, Department.fiscalYear);

// Creating an acconting class directly from the Department class.
// const accounting = new Department("123", "Accounting");
/**
 * it stopped working later in the course, because we added the
 * "abstract" modifier in this class, so I had to comment all of 
 * it out.
 */
// accounting.addEmployee("Clayton");
// accounting.addEmployee("Sarah");

/**
 * Here we get an error for trying to access a private property, apart
 * from that we should also avoid having more than 1 way of adding
 * employees adn we shouldn't manipulate the "employees" array
 * directly.
 */
// accounting.employees[2];

// console.log(accounting);
// accounting.describe();
// accounting.printEmployeeInfo();

// const accountingCopy = { describe: accounting.describe };

/**
 * Here we get an error because TS detects that the "this" keyword of
 * the copy is of the type "Department" and it lacks the some 
 * fields/propertys and methods (it doesn't have the same signature
 * so to speak), without doing what we did above with the "pseudo 
 * parameter" TS wouldn't show an error. To fix the error we would 
 * just need to add all the properties and methods of the Department
 * class to this copy.
 */
// accountingCopy.describe();

/** 
 * We can only inherit/extend from 1 class, it's not possible to 
 * inherit from multiple classes.
 */
class ITDepartment extends Department {
  /**
   * Here we could also have used the shortcut cited in line 10, but
   * for the sake of the example we'll keep it this way.
   */

  admins: string[];
  constructor(id: string, admins: string[]) {
    /**
     * Whenever we add a constructor in a class that inherit from
     * another class we have to use the "super()" function, this 
     * function calls the constructor of the "base/parent" class.
     *
     * If we hover over "super" we'll see that it requires an id and a
     * name, like the constructor of the "Department" class, in this
     * case we passed the "id", but hard-coded the department name,
     * since it will always be the same.
     */
    super(id, "IT");

    /**
     * "super" must come first in the constructor if we intend to do
     * anything related to the "this" keyword later.
     */
    this.admins = admins;
  }

  /**
   * We had to implement this method later in the course, because added
   * the "abstract" modifier on the Department class.
   */
  describe() {
    console.log(`IT Department - ID: ${this.id}`);
  }
}

const itDpt = new ITDepartment("123", ["Clayton"]);
itDpt.addEmployee("João");
itDpt.addEmployee("Maria");

console.log(itDpt);
console.log(itDpt.describe());

// Sales class
class SalesDepartment extends Department {
  private lastReport: string;

  /**
   * Here basically what we're doing is storing a SalesDepartment
   * instance in this variable, so we can use it later to create 
   * only one instance of this class (OOP singleton pattern, see 
   * line 143).
   */
  private static instance: SalesDepartment;

  /**
   * Why use getters and setters instead of regular functions in our
   * classes?
   *
   * Accessor methods (getters and setters) encapsulate our classes,
   * keeping them safe by hiding unnecessary implementation details
   * (adding extra logic) and only modifying certain values.
   *
   * They have a slight simpler sintax than regular functions and they
   * help to make our code clearer, because at a glance we can tell
   * what is a getter, what is a setter and what is a regular method
   * that do something else in our class.
   *
   * They also secure better data quality, because they provide
   * centralized control of how a certain field/property is initialized
   * and provided to the user, thus making it easier to verify and
   * debug.
   *
   * Getter methods must NOT have any parameters, this syntax binds an
   * object property to a function that will be called when that 
   * property is looked up.
   */
  get mostRecentReport() {
    if (this.lastReport) {
      /**
       * Getter methods have to return something and are used to access
       * the properties of an object.
       *
       * The object's property's value does not get calculated until
       * it is accessed.
       */

      return this.lastReport;
    }

    throw new Error("No report found!");
  }

  /**
   * Setter methods must have 1 parameter and are used to set/change
   * the property of an object.
   */
  set mostRecentReport(report: string) {
    if (!report) {
      throw new Error("Please pass in a report.");
    }

    this.addReport(report);
  }

  /**
   * Here we turned the constructor private so we could make an OOP
   * singleton pattern, that is a class that can ONLY be instantiated
   * once (see lines 113, 149).
   */
  private constructor(id: string, private reports: string[]) {
    super(id, "Sales");
    this.lastReport = reports[0];
  }

  // Here we created a method to instantiate this class only once.
  static getInstance() {
    // If instance already exists we return it...
    if (this.instance) {
      return this.instance;
    }

    /**
     * If not we create one with the necessary arguments.
     *
     * Inside the class we can use the "new" keyword to instatiate
     * itself, even the constructor being private (see line 143 and
     * 188).
     */
    this.instance = new SalesDepartment("789", []);
    return this.instance;
  }

  describe() {
    console.log(`Sales Department - ID: ${this.id}`);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  // Here we're overwriting the Department's class method (polymorphism).
  addEmployee(name: string) {
    if (name === "Zé ninguém") {
      return;
    }

    /**
     * Here we had an error, because the "employees" property on the
     * parent class was "private" (line 8) and even a child class
     * cannot access a private property, so we had to change it to
     * "protected" and now this class can also have access to that
     * property.
     */
    this.employees.push(name);
  }
}

/**
 * The instantiation bellow stopped working when we turned the
 * constructor of the SalesDepartment class private to make a
 * singleton pattern.
 */
// const salesDpt = new SalesDepartment("789", []);

/**
 * And finally here, differently from the code above, is how we should
 * instantiate a SalesDepartment class.
 */
const salesDpt = SalesDepartment.getInstance();
console.log(salesDpt);

/**
 * And here if we try to make another instance of SalesDepartment, we
 * don't necessarily get an error, but it'll just be the exact same
 * instance as above. The singleton pattern is not something we use
 * all the time, but it's useful to know that it's possible to create
 * it in TS thanks to the private constructor.
 */
const salesDpt2 = SalesDepartment.getInstance();
console.log(salesDpt2);

salesDpt.addEmployee("Zé ninguém"); // won't add it.
salesDpt.addEmployee("Manoel");
salesDpt.addReport("Big sale today!");

// Here we "call" the setter function as a regular property.
salesDpt.mostRecentReport = "Sales increased 5% this year";
salesDpt.printReports();
salesDpt.printEmployeeInfo();
salesDpt.describe();

/**
 * We must access getters/setters methods as regular properties, no
 * parenthesis required.
 */
console.log(salesDpt.mostRecentReport);
