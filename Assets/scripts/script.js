import { Table,components,AdicionalInfo} from "../scripts/modules/CreateElemens/elements.mjs";
import {  DataBase } from "../scripts/modules/database/db.mjs";
import { InputEvents } from "../scripts/modules/HtmlEvents/events.mjs";
let bud = document.querySelector('.budgets-container');



const table = new Table('table',bud,'nãotem');
const Tela = new components('section',bud,'card');

const comp = new AdicionalInfo('section',document.querySelectorAll('tbody')[0]);
const banco = new DataBase('Teste')

const renda = document.querySelector('#renda')
const eventos = new InputEvents(renda)
eventos.EventosParaARenda()


function cria_sesao(BudgetName){

    let inputName = Tela.CreateInput('text','edite o custo','','Edit-Field-input');
    let inputValue = Tela.CreateInput('number','edite o custo','','Edit-Field-input');

    let table1 = table.CreateTable(3,1,['Nome','Valor'],['Academia','80'],inputName,inputValue);
    let component  = Tela.CreateComponent(BudgetName,table1);
    const complemento = new AdicionalInfo('section',component,'');
    complemento.CreateComplement(true);

}



cria_sesao('Gastos Fixos')

cria_sesao('Investimentos')

cria_sesao('Metas')
cria_sesao('Prazeres')

function cria_database(){

    
   let dbrequest = banco.CreateDB(1)
   console.log(dbrequest)


   



}

cria_database();




class teste{

    constructor(){

        this.database = new DataBase('Teste');
        this.tabela =  new Table('table',bud,'nãotem');
        this.componentes = new components('section',document.querySelector('.budgets-container'),'card');
        this.infoadicional = new AdicionalInfo('section',document.querySelector('.budgets-container'));

        this.fixedbudgets = ['Gastos Fixos','Investimentos','Metas','prazeres'];
    };

    CreateOverview(){

    const budgets = ['Gastos Fixos','Investimentos','Metas','prazeres'];
  
    let tabelaresumo = this.tabela.CreateTable(budgets.length,1,['Budget','Valor Gasto','Deve Gastar','Utilizado','Total'],[budgets])
    let addinfo = this.infoadicional.CreateComplement(true)
    document.querySelectorAll('.card')[1].appendChild(tabelaresumo)
    document.querySelectorAll('.card')[1].appendChild(addinfo)

    };

    CreateBudgets(BudgetName){

        let inputName = this.componentes.CreateInput('text','Nome do custo','','Edit-Field-input')
        let inputValue = Tela.CreateInput('number','R$ 0,00','','Edit-Field-input')
    
        let table1 = table.CreateTable(3,1,['Nome','Valor'],['Academia','80'],inputName,inputValue);
        let component  = Tela.CreateComponent(BudgetName,table1)
        const complemento = new AdicionalInfo('section',component,'');
        complemento.CreateComplement(false)

        return component
    };

    CreateGoals(){

        const container = document.querySelectorAll('.card')[2];
    
        let table =this.tabela.CreateTable(this.fixedbudgets.length,1,[],[this.fixedbudgets] )
        let editbutton = document.createElement('button');
        editbutton.setAttribute('id','edit-porcent');
        editbutton.textContent = 'editar';
        editbutton.addEventListener('click', (e) =>{

            const dialog = document.querySelector('dialog');

            const formdialog = document.querySelector('#dialog-form')

            this.fixedbudgets.forEach((value) => {

                
                const label = document.createElement('label');
                label.setAttribute('for',`${value}-range`);
                label.textContent = value;

                const input = document.createElement('input');
                input.setAttribute('type','range');

                formdialog.appendChild(label)
                formdialog.appendChild(input)


            });

            dialog.setAttribute('id','modal')
            dialog.setAttribute('open','')
            

        })

        container.appendChild(table);
        container.appendChild(editbutton);

    };


}

const sla = new teste()
sla.CreateOverview()
sla.CreateGoals()

console.log(sla)