
export class MathOperations{

    constructor(){

       

    }

    CalcPorcentagem(valor,porcentagem){

        let renda = (valor / 100) * porcentagem
        
        return renda;



    };

    CalcTotalGasto(array,type){

    let soma = 0;

    switch (type) {
        case 'budget':


            array.forEach((object) => {
    
                soma += Number(object.valor);
                
    
            })

            this.budgetcustos += soma
            
            break;

        case 'overview':

            soma = this.budgetcustos
            
            break;
    
        default:
            break;
    }



    return soma


    };

    CalcDeveGastar(renda,array){
        //total gasto -  o resultadod a porcentagem de tanto que deve ser agsto
        return renda - this.CalcTotalGasto(array)


    };

    CalcPercentual(valor,porcentagem){


        switch (key) {
            case value:
                
                break;
        
            default:
                break;
        }


    }



}


