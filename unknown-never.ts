// the type 'unknown' is stricter than 'any', in general it's not very used, but it's better than the 'any' type, because it at least has some kind of check...
let userInput: unknown;
let userName: string;

userInput = 7;
userInput = 'Clayton';

// so bellow I couldn't just assign userInput to userName, because I don't know for sure if the type of userInput will be an string and that's why I need the extra step of checking for it before assigning the value, otherwise I would get an error (which wouldn't happen if I was using the type 'any').
if( typeof userInput === 'string') {
    userName = userInput;
}

// the 'return' type of this function is 'void' by default, but we could also assign the type 'never', because in this case (throwing something) it never returns anything, not even undefined.
function generateError(msg: string, code: number): never {
    throw {
        message: msg,
        errorCode: code
    }
}

const result = generateError('Something went wrong!', 190);

// if we check the console we'll see that not even 'undefined' is returned in this case.
console.log(result);
