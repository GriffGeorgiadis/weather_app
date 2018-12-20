//learing async basics

console.log('Starting app');

//async callback that fires after 2 seconds
//non-blocking since Finishing up is called before
//callback function = a fucntion that gets passed as an argument to another fucntion and
//is executed after some of that happens, ()fucntion gets passed to setTimeout
setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(() => {
    console.log('Second timeout works');
}, 0);

console.log('Finishing up');
