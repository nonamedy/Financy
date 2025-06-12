
import {  DataBase} from "../database/db.mjs";
export class MathOperation{


    constructor(){

        this.db = new DataBase('Teste')
        this.renda = this.db.OpenTransaction('renda','readonly','','key');

        this.renda.then((rendaa) =>{

            if(rendaa === undefined){


                this.renda = 0;

            }

        })
        this.porcentagens = this.db.OpenTransaction('porcentagens','readonly','','key')

        this.porcentagens.then((response) =>{
        
            if(response === undefined){

                this.porcentagens = 0;

            }

        })
        
    };


    async CalcTotalGasto(budname){

        //recebe um objecto e opera sorbe ele.
        let soma = 0;
      

        await this.db.Index(budname).then((response) =>{

            response = this.FiltraBuds(response);

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
        let valor =0;
        
        await this.renda.then((response) => {

          renda = Number(response.renda);


        

        });

        await this.porcentagens.then((response) =>{
            //respons - objeto com as porentagens e a data
            if(response !== 0 || response === undefined){

                porcentagem = Number(response[budname])

            } else {porcentagem = 0}
          
         

        });

        if(porcentagem !== 0){

            valor = ( renda * porcentagem) /100;

        }
       
            return valor;
       

    };

    async CalcDeveGastar(budname){

        // par acalcualr a quantidade que dee ser gasta
        //devo primeiro calcular a procentagem do bud em relação ao salário
        //depois subtrair isso do valor total somado

        let devegastar;
        if(budname === 'overview'){

            devegastar =  this.renda;


        } else{



            let porcentthis = await this.CalcPorcentagem(budname);
            let total = await this.CalcTotalGasto(budname);

            if(porcentthis === 0 ){

                devegastar = 0;

            } else { devegastar = porcentthis - total;}
          


        }
      

      

        return devegastar;

    };
    async CalPorcentual(budname){

            let percentual;

   
            let total = await this.CalcPorcentagem(budname);
            let totalgasto = await this.CalcTotalGasto(budname);

            if(total === 0 || totalgasto === 0){
                percentual = 0;

            } else { percentual = (totalgasto/total) * 100 }
    
            return Math.ceil(percentual);



  

    };

    FiltraBuds(array){

                  
        if( array !== undefined ){

            let filtro = array.filter((e) => e.data == this.db.GetDate());
            
            return(filtro)
            


        } else {window.alert('aabou')}

    };
};