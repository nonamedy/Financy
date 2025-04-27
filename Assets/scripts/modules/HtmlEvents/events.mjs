
import { DataBase } from "../database/db.mjs";
import { Table } from "../CreateElemens/elements.mjs";
const database = new DataBase('Teste',1)

export class events{

    constructor(element){

        this.element = element;
        this.tabela = new Table('table',element,'')
    };




};

export class InputEvents extends events{


    EventosParaARenda(){

        console.log(this.element)
        this.element.addEventListener('change',(e) => {

            database.OpenTransaction('renda','readwrite',{renda:this.element.value,data:database.GetDate()});



        });

        this.element.addEventListener('focusout',(e) => {

            console.log(e.target);


        });

         document.addEventListener('DOMContentLoaded',(e)=> {


            const  importrendaofdb = database.OpenTransaction('renda','readonly');
            importrendaofdb.then((response) => {
;

                this.element.value = Number(response.renda)
             


            })
        
            

           


        })



    };

   EventosParaMetas(){

    

   };

   EventosParaBotoes(elemento,dbrequest){

    
    // insirir os valores no banco de dados e na tabela

    elemento.addEventListener('click',(e) =>{

        if( e.target.nodeName === 'I'){

            console.log(e.target.parentElement);
            console.log(e.target.parentElement[0]);
            const  form = e.target.parentElement;
            const nome =form.elements.nome;
            const valor = form.elements.valor;

      

        

            
            const tbody = form.parentElement.children[1].lastChild;
            const budgetname = form.parentElement.children[0].textContent
            
            if( nome.value !== '' || valor.value !== ''){


                const tr = this.tabela.CreateTR()
                const  dadonome = this.tabela.CreateTD(nome.value)
                const dadovalor = this.tabela.CreateTD(valor.value)
    
                tr.appendChild(dadonome)
                tr.appendChild(dadovalor)
    
              
                tbody.appendChild(tr);

                database.OpenTransaction('budgets','readwrite',{budget:budgetname,nome:nome.value,valor:valor.value,data:database.GetDate()})

                nome.value = ''
                valor.value = ''


            } else{


                window.alert('algo deue rrado!')

            }



           


        };
        


    })


   };

    EventosCarregarTabelas(dbrequest,budgetlist){

    dbrequest.then(async(resolve) => {

    let transaction = resolve.transaction("budgets"); 
    let budgets = transaction.objectStore("budgets");
    let budgetindex = budgets.index("budget_idx");

    for(let bud in budgetlist){

    let request =  budgetindex.getAll(budgetlist[bud]);


    request.onsuccess = () => {
        console.log(bud)
        console.log(request.result);
    
    }

    console.log(request);
        


    }


        
  

    

   


    })

   };
        
}

