// so this is the famous ES6 syntex that we use with the front end...
// it does not look like I imported anything so I guess you don't have to... and apperently you 
// can just use the same sytex as the backend.... should explore more but we will go with it for now
import axios from 'axios';


// neat so before axios is ftech and I can see the reponse in the network :)
const init = async() => {
    try {
        // so axios makes fetchig slighlty easier 
        const students = (await axios.get('/api/students')).data;
        const coures = (await axios.get('/api/courses')).data;
        console.log(students);
        // fetch('/api/courses');
    }
    catch(ex){
        console.log(ex)
    }
}

init();



// not entirely sure why the webpack -cli or why it is save dev npm i webpack webpack-cli --save-dev
// is it just for when we are messing with data or does it need to for the run npm run build:dev??

// so this did work  ./node_modules/.bin/webpack

// "build:dev": "npm run build -- --mode=devlopment", don't really understand this... wish I did should 
// try to dig a bit deeper at soem point 