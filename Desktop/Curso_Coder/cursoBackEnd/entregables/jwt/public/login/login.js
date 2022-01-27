let loginButton = document.getElementById('login-button')
loginButton.addEventListener('click',(evt)=>{
    evt.preventDefault();
    let sendObj = {};
    let form = document.getElementById('loginForm');
    let data = new FormData(form);
    data.forEach((value,key)=>sendObj[key]=value);
    fetch('/login',{
        method:'POST',
        body:JSON.stringify(sendObj),
        headers:{
            'Content-Type':"application/json"
        }
    }).then(result=>result.json()).then(json=>{
        if(json.status==="error"){
            console.log(json.error);
        }else{
            localStorage.setItem('token',`Bearer ${json.token}`);
            console.log(json);
            console.log(localStorage.getItem('token'));
            location.replace("../")
        }
    })
})