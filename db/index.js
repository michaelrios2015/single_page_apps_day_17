const Sequelize = require('sequelize');

const { STRING, BOOLEAN, UUID, UUIDV4 } = Sequelize;

// our connection
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/fordham_courses' );

// the tables
const Student = conn.define('student', {
    // so instead of the default 1,2.. primary we know have that crazy long string
    // UUIDV4 makes them for us, and we need to declare it a primary key
    // by doing this we are less likely to accidently join our tables on an incorrect manner
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: STRING,
});

const Course = conn.define('course', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: STRING
});

// this is our through table??
const Enrolled = conn.define('enrolled', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    cherries: {
        type: BOOLEAN,
        defaultValue: false
    }
});

// how the tables are related 
// we are constructin a many to many with Enrolled as the through
// table I believe , enrolled will have a student id and a course id so a student can be enrolled in many
// courses and a couse can have many students
Enrolled.belongsTo(Student);
Enrolled.belongsTo(Course);

// clean the database and add some new data
const syncAndSeed = async() => {
    // clears the database
    await conn.sync({ force: true});
    // this creates three users and puts them in an array
    const [moe, curly, larry ] = await Promise.all(
        ['moe', 'curly', 'larry' ].map( name => Student.create({ name }))
    );
    // creating some courses
    const [C, javaScript, java] = await Promise.all(
        ['C', 'javaScript', 'java'].map(name => Course.create({ name }))
    );
    // ohh so here we are using some of our varibles
    // enrolling students in courses 
    const enrollement = await Promise.all([ 
        Enrolled.create({ studentId: moe.id, courseId: C.id}),
        Enrolled.create({ studentId: curly.id, courseId: javaScript.id, cherries: true })
    ])
} 

// export what we need
module.exports = {
    models: {
        Student,
        Course,
        Enrolled
    },
    conn,
    syncAndSeed
};