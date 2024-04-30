import express from 'express';
import fs from "fs";
import bodyparser from "body-parser";
const app=express();
app.use(bodyparser.json());
const readData=()=>{
    try{
        const data=fs.readFileSync("./db.json");
    return JSON.parse(data);
    } catch(error){
        console.log(error);
    }
    
};
const writedata= data =>{
    try{
        fs.writeFileSync("./db.JSON",JSON.stringify(data));
    return JSON.parse(data);
    } catch(error){
        console.log(error);
    }
    

};
app.get("/",(req,res)=>{
    res.send('welcom to the jungle jjss')
});
app.get("/books",(req,res)=> {
    const data=readData();
    res.json(data.books);

})
app.get ("/books:id",(res,req)=>{
    const data=readData();
    const id= parseInt (req.parans.id) ;
    const book=data.books.find((book)=> book.id=== id);
    res.json(book);
});
app.post(("/books"),(req,res)=>{
    const data=readData();
    const body = req.body;
    const newbook={
        id:data.books.length +1,
        ... body,

    };
    data.books.push(newbook);
    writedata(data);
    res.json(newbook);

});
app.listen(3000,()=>{
console.log('server listening cn port 3000');
});
