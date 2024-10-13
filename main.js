const http=require('http');
const fs=require('fs')
http.createServer((req,res)=>{
    console.log(req.url,req.method);

    //set header content type
    res.setHeader('Content-Type','text/html')
  
  let path='./views/';

  switch(req.url){
    case '/':path+='index.html'
            res.statusCode=200
            break;
    case '/about':path+='about.html';
                  res.statusCode=200
                  break;
    case '/about':
                  res.statusCode=301;
                  res.setHeader('Location','/about')
                  res.end();
                  break;
    default: path+='404.html';
             res.statusCode=404
             break;
  }
  
    fs.readFile(path,(err,data)=>{
    if(err){
        console.log(err)
        res.end()
    }
    else{
       //res.write(data);
        res.end(data);
    }
   })
  

}).listen(3000,()=>{
    console.log("local host is running on port 3000")
})