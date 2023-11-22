const express=require('express');
const app=express();

app.use(express.json());

const courses=[
    {id:1,name:"AI",count:32},
    {id:2,name:"CSE",count:22},
    {id:3,name:"MECH",count:52},
    {id:4,name:"DATA",count:72},
    {id:5,name:"ETC",count:72},

]

app.get('/',(req,res)=> {
    res.send("Hello smkcoolllll...");
});

app.get('/course',(req,res) => {
    res.send(courses);
});
app.get('/course/:id',(req,res) => {
    const csr=courses.find(c => c.id === parseInt(req.params.id));
    if(!csr) res.status(404).send('the course with given id is not valid... ');
    res.send(csr);
});

app.post('/course/save',(req,res) => {
    

    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send("There name is missing or enter name should be greater than 3 characters...");
        return;
    }
    const course={
        id: courses.length+1,
        name:req.body.name,
        count:req.body.count
     }
    courses.push(course);
    res.send(course);
});

app.put('/course/update/:id',(req,res) => {
    const csr=courses.find(c => c.id === parseInt(req.params.id));
    if(!csr) return res.status(404).send('the course with given id is not valid... ');
    csr.name=req.body.name;
    res.send(csr);

});

app.delete('/course/delete/:id',(req,res) => {
    const csr=courses.find(c => c.find === parseInt(req.params.id));
    if(!csr)
        res.status(404).send("course with given id is not found...");
    
    const index=courses.indexOf(csr);
    courses.splice(index,1);
    res.send(csr);
});

require('dotenv').config();
const port=process.env.PORT|| 5000;
app.listen(port,() => console.log(`Listening on prt ${port}...`));
