fetch('/currentUser',{
    method:"GET",
    headers:{
        authorization:localStorage.getItem('token')
    }
}).then(result=>{
    if (result.status===401||result.status===403) location.replace('/login')
    else{
        location.replace('/profile')
    }
}).catch(error=>{
    console.log('Hubo un error');
})