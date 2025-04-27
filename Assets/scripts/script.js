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








function cria_database(){

    
   let dbrequest = banco.CreateDB(1)
   console.log(dbrequest)


   



}






class teste{

    constructor(){

        this.database = new DataBase('Teste',1);
        this.tabela =  new Table('table',bud,'tabela-estilos');
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
        
        let table1 = table.CreateTable(3,1,['Nome','Valor'],[],inputName,inputValue);
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

    TDtest(){

        this.dbrequest = this.database.CreateDB(1)
        return this
    };

}

const sla = new teste()
const dbrequest = sla.TDtest()
sla.CreateOverview()
sla.CreateGoals()

sla.fixedbudgets.forEach((e) => {

    let container = sla.CreateBudgets(e)
    eventos.EventosParaBotoes(container,dbrequest)
    
  

})

console.log(sla)
eventos.EventosCarregarTabelas(sla.dbrequest,sla.fixedbudgets)
