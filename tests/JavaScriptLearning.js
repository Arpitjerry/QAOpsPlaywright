class Student 

{
    constructor(name,marks)
    {
        this.name=name;
        this.marks=marks;
    }

getResult()
{
    if(this.marks>40)
    {
        console.log("Pass")
    }
    else
    {
        console.log("Fail")
    }
}

getGrade()
{
    if(this.marks>=80)
    {
        console.log("A")
    }
    else if(this.marks>=60)
    {
        console.log("B")
    }
    else{
        console.log("C")
    }
}
}
const s1= new Student("Arpit", 75);
s1.getResult();
s1.getGrade();
