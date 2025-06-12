import { Table,components,AdicionalInfo} from "../scripts/modules/CreateElemens/elements.mjs";
import {  DataBase } from "../scripts/modules/database/db.mjs";
import { InputEvents } from "../scripts/modules/HtmlEvents/events.mjs";
import { MathOperation } from "../scripts/modules/MathOperations/math.mjs";

let bud = document.querySelector('.budgets-container');

const renda = document.querySelector('#renda');

class main{

    constructor(){

        this.database = new DataBase('Teste',1);
        this.tabela =  new Table('table',bud,'tabela-estilos');
        this.componentes = new components('section',document.querySelector('.budgets-container'),'card');
        this.infoadicional = new AdicionalInfo('section',document.querySelector('.budgets-container'));
        this.eventoss = new InputEvents(renda);
        this.MathCalcs = new MathOperation();
        this.fixedbudgets = ['Gastos Fixos','Investimentos','Metas','prazeres'];
        this.rendaevento = this.eventoss.EventosParaARenda();
        
    };

    CreateOverview(){

    const budgets = ['Gastos Fixos','Investimentos','Metas','prazeres'];
  
    let tabelaresumo = this.tabela.CreateTable(budgets.length,1,['Budget','Valor Gasto','Deve Gastar','Utilizado','Total'],[budgets],'overview')
        let addinfo = this.infoadicional.CreateComplement(true, 'overview', this.fixedbudgets);
        
    document.querySelectorAll('.card')[1].appendChild(tabelaresumo);
    document.querySelectorAll('.card')[1].appendChild(addinfo);

    };

    CreateBudgets(BudgetName,tableData){

        let table1 = this.tabela.CreateTable(3,1,['Nome','Valor'],tableData,true);
  
        let component  = this.componentes.CreateComponent(BudgetName,table1);
        let addinfo = this.infoadicional.CreateComplement(false,BudgetName);

        component.appendChild(addinfo);
    
        return component
    };

    CreateGoals(){

        const container = document.querySelectorAll('.card')[2];
    
        let table =this.tabela.CreateTable(this.fixedbudgets.length,1,[],[this.fixedbudgets],'metas'  )

        let editbutton = this.CreateGoalsModal();
        this.eventoss.EventosModal(editbutton,this.fixedbudgets,this.dbrequest);
       
        
        container.appendChild(table);
        container.appendChild(editbutton);

    };

    CreateGoalsModal(){

        let total = 0;

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

        const totporcent = document.createElement('p')
        totporcent.setAttribute('id','totporcents')
      
        formdialog.appendChild(totporcent)
        
        
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
                input.setAttribute('id',`${value}-range`);
                input.setAttribute('class','inputmodal');
                input.setAttribute('max','100');

                porcentagens.then((response)=>{

                    
                    input.setAttribute('value',response[value]);
                    total += Number(response[value]);
                    
                    

                    totporcent.textContent = `total:${total}`
                })
                
                
                //Adiciona [label/input] como filhos no formulário
                formdialog.appendChild(label)
                formdialog.appendChild(input)


            });

        formdialog.appendChild(submitbutton)
        return editbutton

    }

    async DBtest(){

        this.dbrequest = await this.database.CreateDB(1)
        return this.dbrequest;
    };

    PrintBudgets(){

        this.fixedbudgets.forEach((e) => {

        let valor = this.eventoss.EventosCarregarTabelas(this.DBtest(),e)
  
        valor.then((response) => {
        // response -> array com os objetos [{},{},{}] || []
        
            let container = this.CreateBudgets(e, response);
            this.eventoss.EventosParaBotoes(container, dbrequest);


            })
   

        })

    }

};

const app = new main();

app.CreateOverview();
app.CreateGoals();
app.PrintBudgets();

