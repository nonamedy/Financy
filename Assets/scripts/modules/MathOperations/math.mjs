
import {  DataBase} from "../database/db.mjs";
export class MathOperation{


    constructor(){

        this.db = new DataBase('Teste')
        this.renda = this.db.OpenTransaction('renda','readonly','','key');
        this.porcentagens = this.db.OpenTransaction('porcentagens','readonly')
        
    };


    async CalcTotalGasto(budname){

        //recebe um objecto e opera sorbe ele.
        let soma = 0;

        await this.db.Index(budname).then((response) =>{



            response.forEach((obj) =>{
       
                

                soma +=   Number(obj.valor);

                
               

            })

        })
        
     
      
        return  soma;


    };


    async CalcPorcentagem(budname){
        //o maximo que posos receber e UMA STRING COM O NME DO BUDGET

        let porcentagem;
        let renda;
        
        await this.renda.then((response) => {

          renda = Number(response.renda);
        

        });

        await this.porcentagens.then((response) =>{
            //respons - objeto com as porentagens e a data
            
            porcentagem = Number(response[budname])
         

        });

        let valor = ( renda * porcentagem) /100;

        return  valor;

    };

    async CalcDeveGastar(budname){

        // par acalcualr a quantidade que dee ser gasta
        //devo primeiro calcular a procentagem do bud em relação ao salário
        //depois subtrair isso do valor total somado

        let porcentthis = await this.CalcPorcentagem(budname);
        let total = await this.CalcTotalGasto(budname);

        let devegastar = porcentthis - total;

        return devegastar;

    };
    async CalPorcentual(budname){

        let percentual;

        let total = await this.CalcPorcentagem(budname);
        let totalgasto = await this.CalcTotalGasto(budname);
        percentual = (totalgasto/total) * 100

        return percentual;

    };

};