import express from 'express';
import jwt from 'jsonwebtoken';
import {key} from './keys.js';

const app = express();
const server = app.listen(8080,()=>{
    console.log('Server listening');
})

const users = [{username:"test",email:"test@test.com",password:"123"}] // simula la base de datos

app.use(express.json());
app.use(express.static('public'));

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader||authHeader==='null') return res.status(401).send({status:"error",error:"no autenticado"})
    const token = authHeader.split(' ')[1];
    jwt.verify(token,key,(err,decoded)=>{
        if(err) return res.status(403).send({error:"no autorizado"})
        req.user = decoded.user
        next();
    })
}

app.get('/currentUser',authMiddleware,(req,res)=>{
    res.send(req.user);
})

app.post('/login',(req,res)=>{    
    let user = users.find(user=>user.username===req.body.username);
    if(!user)return res.status(400).send({status:"error",error:"usuario inexistente"})
    if(user.password!=req.body.password) return res.status(400).send({status:'error',error:'password incorrecta'})
    const payload = {
        user:{
            username:user.username,
            email:user.email,
        }
    }
    let token = jwt.sign(payload,key,{
        expiresIn:'24h'
    });
    res.send({
        message:'logueado',
        token:token
    })
})