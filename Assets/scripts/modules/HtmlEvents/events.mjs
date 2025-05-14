
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

        console.log('?')
        this.element.addEventListener('change',(e) => {

            database.OpenTransaction('renda','readwrite',{renda:this.element.value,data:database.GetDate()});
            console.log('la renda')


        });

        this.element.addEventListener('focusout',(e) => {

            console.log(e.target);


        });

         document.addEventListener('DOMContentLoaded',(e)=> {


            const  importrendaofdb = database.OpenTransaction('renda','readonly','','key');

            importrendaofdb.then((response) => {


                this.element.value = Number(response.renda)
             


            })
        
            

           


        })



    };

   EventosParaMetas(){

    // Carregar as porcentagens do banco de dados

    let porcentagens = database.OpenTransaction('porcentagens','readonly')
 
    porcentagens.then((response) =>{


        for(let porcent in response){


            console.log(porcent)

        }

    })


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

    EventosCarregarTabelas(dbrequest,bud){

        return new Promise((resolve) =>{


            dbrequest.then((response) => {

                let transaction = response.transaction("budgets"); 
                let budgets = transaction.objectStore("budgets");
                let budgetindex = budgets.index("budget_idx");
            
            
                let request =  budgetindex.getAll(bud);
            
            
                request.onsuccess = () => {

                    if(request.result !== undefined){

                      
                        
                        resolve(request.result)

                    } else {window.alert('aabou')}
                    
                
                }


            })

        })
    
    
    }
    

    EventosModal(element,buds,dbrequest){
       
        const dialog = document.querySelector('dialog');
        const form = document.querySelector('#dialog-form');

        dialog.setAttribute('id','modal')
        
        element.addEventListener('click',()=> {

           
            dialog.showModal()

        })
        

        // Evento para a tabela

        form.addEventListener('submit',(e) => {

            let input;
            let valores = {};
            valores.data = database.GetDate();
          
            console.log(e)
        
            //improta o valor do bando e dados para os elementos
            buds.forEach(element => {
                
                console.log(e.target.elements[`${element}-range`])
                input = e.target.elements[`${element}-range`]
                console.log(input.value)
                valores[element] = input.value;
                

               
               console.log(valores)

            });

            database.OpenTransaction('porcentagens','readwrite',valores)
           

        })
        


    }

        
} // endclass

