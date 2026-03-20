let localvar = "I am global";

function myfunction() {
    let localvar = "I am local";
    console.log(localvar);
    console
}   
myfunction();
console.log(globalvar);
console.log(localvar);

const x = 1;
function outer() {
    const x = 10;
    const inner = function() {
        console.log(x);
    };
    return inner;
}
const innerFunction = outer();
innerFunction();