import { Table,components,Complements } from "../scripts/modules/CreateElemens/elements.mjs";
let bud = document.querySelector('.budgets-container')
const table = new Table('table',bud,'nãotem')
const Tela = new components('section',bud,'card')
const budgets = ['Gastos Fixos','Investimentos','Metas']
const comp = new Complements('section',document.querySelectorAll('tbody')[0])
document.querySelectorAll('table')[0].insertAdjacentElement('afterend',comp.CreateComplement(false));
function cria_sesao(BudgetName){

    let table1 = table.CreateTable(3,1,['Nome','Valor'],['Academia','80'])
    let component  = Tela.CreateComponent(BudgetName,table1)
    const complemento = new Complements('section',component,'');
    complemento.CreateComplement(true)

}

function Cria_Resumo(x){
    x = budgets.length
    let input = Tela.CreateInput('text','edite o custo','','Edit-Field-input')
    
    let kk = table.CreateTable(x,1,['Budget','Valor Gasto','Deve Gastar','Utilizado','Total'],[budgets[1]],input)
  
    document.querySelectorAll('.card')[1].appendChild(kk)

}
Cria_Resumo(budgets)
cria_sesao('Gastos Fixos')

cria_sesao('Investimentos')

cria_sesao('Metas')