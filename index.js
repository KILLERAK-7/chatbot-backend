const { default: axios } = require('axios');
const express = require('express')
const app = express()
const port = 5000
const request = require("request");
//const cors = require("cors")
//const bodyParser = require("body-parser")

/*app.get('/', (req, res) => {
  res.send('Hello World!')
})*/

//app.use(cors())
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

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
    //counts the no.of matchs of to pattern per index
    data.intent.forEach((value,index) => {
        count[index] = 0;
        q.toString().split(" ").forEach(element => {
            value.pattern.forEach(key => {
                if(element.toLowerCase() == key.toLowerCase())
                    count[index] += 1;        
            });
        });
    });

    //counts the no.of matchs of to pattern per index
    data.intent.forEach((value,index) => {
        q.toString().split(" ").forEach(element => {
            value.response.forEach(key => {
                if(element.toLowerCase() == key.toLowerCase())
                    count[index] += 1;        
            });
        });
    });

    let max = 0;
    let inx = 0;
    
    // Finds the maximum no.of matches
    for(let i=0;i<n;i++)
    {
        console.log(count[i]);
        if(max <= count[i])
        {
            max = count[i];
            inx = i;
        }
    }

    // Assigns the response to the ans variable
    data.intent.forEach((value,index) => {
        if(inx == index)
            ans = value.response[0];            
    });  

    // Sends the response to the webpage
    console.log(ans);
    res.send(ans);

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});