const { default: axios } = require('axios');
const express = require('express')
const app = express()
const port = 5000
const request = require("request");


/*app.get('/', (req, res) => {
  res.send('Hello World!')
})*/



app.get('/getchat', async (req,res) => {
    let {q}= req.query;
    const response = await axios.get("http://localhost:5001/data.json");
    const data = response.data;
    let ans = "";
    let n = 0;
    //Counts total no.of index
    data.intent.forEach((value,index) => {
        n += 1;
    });
    let count = Array(n);
    let i=0;
    
    //counts the no.of matchs per index
    q.toString().split(" ").forEach(element => {
        count[i] = 0;
        data.intent.forEach((value,index) => {
            value.pattern.forEach(key => {
                if(element.toLowerCase() == key.toLowerCase())
                    count[i] += 1;
            });
            i++;
        });
    });

    let max = count[0];
    
    // Finds the maximum no.of matches
    for(let i=0;i<n;i++)
    {
        if(count[i] <= count[i+1])
            max = i+1;
    }
    console.log(max);
    // Assigns the response to the ans variable
    data.intent.forEach((value,index) => {
        //if(max == index)
            
    });  
    // Sends the response to the webpage
    
    res.send(ans);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});