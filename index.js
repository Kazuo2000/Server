const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-Parser")

const app = express();

app.use(bodyParser.json());

// configuracao do cor para aceitar vario protocolos de requisicao
const configCors =  {
    origin:"*",
    optionsSuccessStatus:200
}

// cofiguracao da comunicacao com  o banco de dados 
const url="mongodb+srv://lucas:8Hm9KbrUZxzYGkUm@clusterdb.e461n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});



const tbproduto = mongoose.Schema({
    nomeproduto:String,
    descricao:String,
    quantidade:String,
    preco:String,
    foto:String
});
// construcao do modelo de tabla mongoose
const Produto = mongoose.model("produto",tbproduto);


// criacao aos endpoints para o modelo de produto
// vamos iniciar com a rota para efetuar o cadastro do produtos
// esta rota recebe o verbos Post(postar os dados do produto)
app.post("/produto/cadastro",cors(configCors),(req,res)=>{
    const dados = new Produto(req.body)
    dados.save().then(()=>{
        res.status(201).send({rs:"produto cadastro"});

    }).catch((erro)=>console.error(`ero ao tentar cadastrar ${erro}`));
});

app.put("/produto/atualizar/:id",cors(configCors),(req,res)=>{
    Produto.findByIdAndUpdate(req.params.id,req.body,(erro,dados)=>{
        if(erro) {
            res.status(400).send({rs:`ERRO ao tentar atualizar ${erro}`});
            return;
        }
        res.status(200).send({rs:"Produto atualizado."});
    });
});

app.delete("/produto/deletar/:id",cors(configCors),(req,res)=>{
    Produto.findByIdAndDelete(req.params.id,(erro,dados)=>{
        if(erro) {
            res.status(400).send({rs:`ERRO ao tentar atualizar ${erro}`});
            return;
        }
        res.status(204).send({rs:"Produto deletado."});
    });
});

app.get("/produto/listar",cors(configCors),(req,res)=>{
    Produto.find((erro,dados)=>{
        if(erro){
        res.status(400).send({rs:`ocorreu um erro ${erro}`})
        return;
    }
    res.status(200).send({rs:dados});
});
});

app.get("/produto/codproduto/:id",cors(configCors),(req,res)=>{
    Produto.findById(req.params.id,(erro,dados)=>{
        if(erro){
            res.status(400).send({rs:`ERRO ao tentar consultar oproduto ${erro}`})
            return;
        }
        res.status(200).send({rs:dados});
    });

});

app.get("/produto/nomeproduto/:nome",cors(configCors),(req,res)=>{
    
    Produto.find({nomeproduto:req.params.nome},(erro,dados)=>{
        if(erro){
            res.status(400).send({rs:`ERRO ao tentar consultar o produto ${erro}`})
            return;
        }
        res.status(200).send({rs:dados});
    });
});
// construcao 
app.listen("5000")
