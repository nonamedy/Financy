import { Table,components,AdicionalInfo} from "../scripts/modules/CreateElemens/elements.mjs";
import {  DataBase } from "../scripts/modules/database/db.mjs";
import { DataBase} from "../scripts/modules/database/db.mjs";
let bud = document.querySelector('.budgets-container');

const table = new Table('table',bud,'nãotem');
const Tela = new components('section',bud,'card');
const budgets = ['Gastos Fixos','Investimentos','Metas'];
const comp = new AdicionalInfo('section',document.querySelectorAll('tbody')[0]);
const banco = new DataBase('Teste')

document.querySelectorAll('table')[0].insertAdjacentElement('afterend',comp.CreateComplement(false));
function cria_sesao(BudgetName){

    let inputName = Tela.CreateInput('text','edite o custo','','Edit-Field-input')
    let inputValue = Tela.CreateInput('number','edite o custo','','Edit-Field-input')

    let table1 = table.CreateTable(3,1,['Nome','Valor'],['Academia','80'],inputName,inputValue);
    let component  = Tela.CreateComponent(BudgetName,table1)
    const complemento = new AdicionalInfo('section',component,'');
    complemento.CreateComplement(true)

}

function Cria_Resumo(x){
    x = budgets.length
  
    let kk = table.CreateTable(x,1,['Budget','Valor Gasto','Deve Gastar','Utilizado','Total'],[budgets[1]])
  
    document.querySelectorAll('.card')[1].appendChild(kk)

}

Cria_Resumo(budgets)
cria_sesao('Gastos Fixos')

cria_sesao('Investimentos')

cria_sesao('Metas')

function cria_database(){

    
   let dbrequest = banco.CreateDB(1)
   console.log(dbrequest)


   



}

cria_database()