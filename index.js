const UpstoxApi = require('upstox');
const axios = require('axios');


let config = {
  method: 'get',
  url: 'https://api.upstox.com/v2/login/authorization/dialog',
  headers: { 
  },
  params: {
    client_id: 'your api key',
    redirect_uri: 'http://127.0.0.1/',
    response_type: 'code',
    state: 'fkkshfkshkf' 
  }
};


const upstox = new UpstoxApi(config.params.client_id);


const loginUrl = upstox.getLoginUri(config.params.redirect_uri);

console.log(loginUrl)




// Generating new access token
console.log("Generating new access token");

let config2 = {
  method: 'post',
  url: 'https://api.upstox.com/v2/login/authorization/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Accept': 'application/json'
  },
  data: {
    "code": "logincode",
    "client_id": 'Your api key',
    "client_secret": "your secret key", 
    "redirect_uri": 'http://127.0.0.1/',
   " grant_type": "authorization_code"
  }
};

upstox.getAccessToken(config2).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err)
});


// 

console.log("Socket connection")

var config3 = {
    client_id:"Your Api key",
    accessToken:"Your Access Token",
}

var upstox3=new UpstoxApi(config3.client_id);
upstox3.setToken(config3.accessToken);

upstox3.connectSocket().then(function () {
    console.log("Socket connected  successfully")
    upstox3.on("liveFeed",function(update){
        console.log('LTP updated arrived: ', update[0])
    });

    let parameter = {
        "exchange" :"mcx_fo",
        "symbol":"crudeoil24marchfut",
        "type":"ltp"
    }

    upstox3.subscribeFeed(parameter).then(function (response){
        console.log("Subscribe Success: ", response);
    }).catch(function (error){
        console.log("Subscribe Success: ", error)
    })
}).catch(function (error) {
    console.log('Error connecting to socket server',error);
})


setTimeout(function(){
    upstox3.unsubscribeFeed(parameter)
    .then(function(res){
        console.log("Unsubscribe Success: ", res)
    })
    .catch(function(err){
        console.log("Unsubscribe Failed: ", err)
    })

    upstox3.closeSoket();
},10000)



// fetch current holdings


let config4 = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://api.upstox.com/v2/portfolio/long-term-holdings',
  headers: { 
    'Accept': 'application/json'
  },
  data:{
    accessToken:"your accesss token"
  }
};

axios(config4)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});



//place order
let config5 = {
    method: 'post',
  maxBodyLength: Infinity,
    url: 'https://api.upstox.com/v2/order/place',
    headers: { 
      'Accept': 'application/json'
    },
    data:{
        "accessToken":"Your Access Token",
    }
  };
  
  axios(config5)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });



