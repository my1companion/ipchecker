const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

var score = "";
var blacklistData = "";
async function checkIp(ipArray){
    for(let x=0; x< ipArray.length; x++){
        var formData = {
          ip: ipArray[x],
        };

    axios.post('https://ip-score.com/spamjson', formData)
      .then(response => {
//        console.log(response.data);
        blacklistData = response.data;
        if(score>15){
	    console.log(x+1 + ". " +ipArray[x] +" is valid - score is: "+ score, "blacklistdata is: "+ JSON.stringify(blacklistData));
        }else{
	    console.log(x+1 + ". " +ipArray[x] +" is invalid - score is: "+ score, "blacklistdata is: "+ JSON.stringify(blacklistData));
        }
      })
      .catch(error => {
        console.error(error);
      });


//scamalytics
        request('https://scamalytics.com/ip/'+ipArray[x], (error, response, html) => {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            score = $('.score').text().split(": ")[1];
            //console.log("score",score);
        }
        });

    }

}
//call function with ipArray argument
checkIp(["102.91.52.133", "102.91.52.101"]);