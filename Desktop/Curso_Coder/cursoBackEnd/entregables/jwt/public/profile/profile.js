let user;
fetch('/currentUser',{
    method:"GET",
    headers:{
        authorization:localStorage.getItem('token')
    }
}).then(result=>result.json())
.then(json=>console.log(json))
.catch(error=>{
    console.log('Hubo un error');
})

let btn = document.getElementById('logout');
btn.addEventListener('click',(evt)=>{
    evt.preventDefault()
    localStorage.removeItem('token');
    location.replace('../')
})