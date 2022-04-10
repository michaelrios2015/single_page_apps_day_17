// so this is the famous ES6 syntex that we use with the front end...
// it does not look like I imported anything so I guess you don't have to... and apperently you 
// can just use the same sytex as the backend.... should explore more but we will go with it for now
import axios from 'axios';

// once we get into react we stop using these for the most part should probably know them better 
const studentList = document.querySelector('#student-list');
const courseList = document.querySelector('#course-list');
const enrolledList = document.querySelector('#enrolled-list');

let students, enrollement;
//  you see the html
// console.log( studentList, courseList, enrolledList);

const renderStudents = (students) => {
    // so the slightly odd anchor reference seens to be a way 
    const studentId = window.location.hash.slice(1);
    const html = students.map( student => `
    <li class='${ student.id === studentId ? 'selected' : ''} '>
        <a href='#${student.id}'>
        ${ student.name }
        </a>
    </li>
    `).join('');
    // console.log(html)
    studentList.innerHTML = html;
}

// more cool stuff
courseList.addEventListener('click', async(ev)=> {
    // this is the course ID I think
    const target = ev.target;
    const studentId = window.location.hash.slice(1);
    if (target.tagName === 'BUTTON') {
        // Ok so this is all really celever we push up the new course
        const _enrolled = {
            courseId: target.getAttribute('data-id'),
            // !! turns null into fals and 'true' into true
            cherries: !!target.getAttribute('data-cherries')
        };
        // console.log(enrolled);
        // we get it back
        const response = await axios.post(`/api/students/${studentId}/enrolled`, _enrolled); 
        const enrolled = response.data;
        // we put it in our array
        enrollement.push(enrolled)
        // and re render cool!! Later on we will pretty much just switch to just fetching all teh 
        // courses again bu this is nifty
        renderEnrollment(enrollement); 
        console.log(response.data);
    }

})


const renderCourses = (courses) => {
    // so the slightly odd anchor reference seens to be a way 
    const html = courses.map( course => `
    <li>
        ${ course.name }
        <br />
        <button data-id='${ course.id }' data-cherries='true'> Add wth cherries</button>
        <button data-id='${ course.id }' > Add wthout cherries</button>
    </li>
    `).join('');
    // console.log(html)
    courseList.innerHTML = html;
}


// cool
const renderEnrollment = (enrollment) => {
    // so the slightly odd anchor reference seens to be a way 
    console.log(enrollment);
    const html = enrollment.map( enrolled => `
    <li>
        ${ enrolled.course.name }
        ${ enrolled.cherries ? ' with cherries ' : '' }
    </li>
    `).join('');
    // console.log(html)
    enrolledList.innerHTML = html;
}

// neat so before axios is ftech and I can see the reponse in the network :)
const init = async() => {
    try {
        // so axios makes fetchig slighlty easier 
        students = (await axios.get('/api/students')).data;
        const coures = (await axios.get('/api/courses')).data;
        // console.log(students, coures);
        renderStudents(students);
        renderCourses(coures);
        // this just means that when we refresh it's still there 
        const studentId = window.location.hash.slice(1);
        // so anytime we have a student id render their course??
        if(studentId){
            const url = `/api/students/${studentId}/enrolled`;
            enrollement = (await axios(url)).data;
            // console.log(enrollement);
            renderEnrollment(enrollement);
        };


    }
    catch(ex){
        console.log(ex)
    }
}

// clever
window.addEventListener('hashchange', async()=> {
    // console.log(window.location.hash.slice(1));
    const studentId = window.location.hash.slice(1);
    const url = `/api/students/${studentId}/enrolled`;
    enrollement = (await axios(url)).data;
    // console.log(enrollement);
    renderEnrollment(enrollement);
    // so to send the hash change students need to be re rendered 
    renderStudents(students);
})


init();



// not entirely sure why the webpack -cli or why it is save dev npm i webpack webpack-cli --save-dev
// is it just for when we are messing with data or does it need to for the run npm run build:dev??

// so this did work  ./node_modules/.bin/webpack

// "build:dev": "npm run build -- --mode=devlopment", don't really understand this... wish I did should 
// try to dig a bit deeper at soem point 