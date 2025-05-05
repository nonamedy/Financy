import { Table,components,AdicionalInfo} from "../scripts/modules/CreateElemens/elements.mjs";
import {  DataBase } from "../scripts/modules/database/db.mjs";
import { InputEvents } from "../scripts/modules/HtmlEvents/events.mjs";
import { MathOperations } from "../scripts/modules/MathOperations/Math.mjs";
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
        this.mathoperations = new  MathOperations();
        this.fixedbudgets = ['Gastos Fixos','Investimentos','Metas','prazeres'];

        
    };

    CreateOverview(){

    const budgets = ['Gastos Fixos','Investimentos','Metas','prazeres'];
  
    let tabelaresumo = this.tabela.CreateTable(budgets.length,1,['Budget','Valor Gasto','Deve Gastar','Utilizado','Total'],[budgets])

    let totgasto = this.mathoperations.CalcTotalGasto(this.dbrequest,'overview')

    let sla = this.database.OpenTransaction('budgets','readonly')
    let addinfo = this.infoadicional.CreateComplement(true,totgasto)



    document.querySelectorAll('.card')[1].appendChild(tabelaresumo)
    document.querySelectorAll('.card')[1].appendChild(addinfo)

    };

    CreateBudgets(BudgetName,tableData,data = {}){

        let totgasto = this.mathoperations.CalcTotalGasto(tableData,'budget')
        


        let table1 = table.CreateTable(3,1,['Nome','Valor'],tableData,true);

        let component  = Tela.CreateComponent(BudgetName,table1)

        let addinfo = this.infoadicional.CreateComplement(false,totgasto)
        
        component.appendChild(addinfo)

        return component;
    };

    CreateGoals(){

        const container = document.querySelectorAll('.card')[2];
    
        let table =this.tabela.CreateTable(this.fixedbudgets.length,1,[],[this.fixedbudgets] )

        let editbutton = this.CreateGoalsModal();
        eventos.EventosModal(editbutton,this.fixedbudgets,this.dbrequest);
       
        

        container.appendChild(table);
        container.appendChild(editbutton);


    };

    CreateGoalsModal(){

        
        let porcentagens = this.database.OpenTransaction('porcentagens','readonly')

        //Botão para abrir o Modal
        let editbutton = document.createElement('button');
        
        //Botão de submit do formulário
        let submitbutton = document.createElement('button');
        submitbutton.setAttribute('class','submitbutton')
        submitbutton.setAttribute('type','submit');
        submitbutton.textContent = 'Confirmar'
        

        editbutton.setAttribute('id','edit-porcent');
        editbutton.textContent = 'editar';
        
        

        const formdialog = document.querySelector('#dialog-form')

            //Cria um input::range para cada budget
            this.fixedbudgets.forEach((value) => {

                // Label
                const label = document.createElement('label');  
                label.setAttribute('for',`${value}-range`);
                label.setAttribute('class','labelmodal')
                label.textContent = value;

                //Input Range
                const input = document.createElement('input');
                input.setAttribute('type','range');
                input.setAttribute('id',`${value}-range`)
                input.setAttribute('class','inputmodal')
                input.setAttribute('max','100')

                //seta o valor do input com o banco de dados
                porcentagens.then((response)=>{


                    input.setAttribute('value',response[value])

                })
                

                //Adiciona [label/input] como filhos no formulário
                formdialog.appendChild(label)
                formdialog.appendChild(input)


            });

        formdialog.appendChild(submitbutton)
        return editbutton

    }

    TDtest(){

        this.dbrequest = this.database.CreateDB(1)
        return this
    };

}

const sla = new teste()
const dbrequest = sla.TDtest()
sla.CreateOverview()
sla.CreateGoals()
// cria os budgets
sla.fixedbudgets.forEach((e) => {

    let valor = eventos.EventosCarregarTabelas(sla.dbrequest,e);

    // carrega todos os budgets [nme,valor ] dentro da
    valor.then((response) => {
        // response -> array com os objetos [{},{},{}] || []
        
        let container = sla.CreateBudgets(e,response);
        eventos.EventosParaBotoes(container,dbrequest);


    })
   
    
    
  

})

console.log(sla)
eventos.EventosCarregarTabelas(sla.dbrequest,sla.fixedbudgets)

