
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
   


        });

        this.element.addEventListener('focusout',(e) => {

      


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

            //Formulário pai dos elementos
            const  form = e.target.parentElement;

            //Campos dos inputs
            const nome =form.elements.nome;
            const valor = form.elements.valor;

            
            const tbody = form.parentElement.children[1].lastChild;
            const budgetname = form.parentElement.children[0].textContent
            
            //Verifica se nenhum dos campos está vazio.
            if( nome.value !== '' && valor.value !== ''){

                //Cria a TableLine  e os Td's para a inserção.
                const tr = this.tabela.CreateTR()
                const  dadonome = this.tabela.CreateTD(nome.value)
                const dadovalor = this.tabela.CreateTD(valor.value)
    
                tr.appendChild(dadonome)
                tr.appendChild(dadovalor)
    
              
                tbody.appendChild(tr);

                //Adiciona ao banco de dados o budget adicinado.
                database.OpenTransaction('budgets','readwrite',{budget:budgetname,nome:nome.value,valor:valor.value,data:database.GetDate()})

                // reseta os valores dos campos.
                nome.value = ''
                valor.value = ''


            } else{


                window.alert('Os dois campos devem ser prenchidos.')

            }



           


        };
        


    })


   };

    EventosCarregarTabelas(dbrequest,bud){

        return new Promise((resolve) =>{


            dbrequest.then((response) => {

                // Cria uma requsição de um index do banco de dados.
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

           // Abre o modal
            dialog.showModal()

        })
        
        form.addEventListener('change',(e) => {
            let total= 0;
            // alterar a capacidade maxima dos inputs, na soma de todos,les não
            //devem ultrapassar 100%

            // na alteração destes valores o total deve ser mudado
            let tot = document.querySelector('#totporcents')
        
           
            buds.forEach(element => {
                
              
                // Localiza o campo do input
                let input = form.elements[`${element}-range`];
             

                
                total += Number(input.value);
               
                

               
                //  Valor do banco de dados é insirido no elemento.
               
                

            });

            tot.textContent =`Total:${total}%`

            console.log(e)

        })

        // Evento para a tabela

        form.addEventListener('submit',(e) => {

            let input;
            //Objeto que contêm os budgets com suas devidas porcentagens. [ex:45]
            let valores = {};
            valores.data = database.GetDate();
          
            
        
            //improta o valor do bando e dados para os elementos
            buds.forEach(element => {
                
                console.log(e.target.elements[`${element}-range`])
                // Localiza o campo do input
                input = e.target.elements[`${element}-range`]
               
                //  Valor do banco de dados é insirido no elemento.
                valores[element] = input.value;
                

               
          

            });

            database.OpenTransaction('porcentagens','readwrite',valores)
            this.porcentagens = valores;

   

        })
        


    }

        
} // endclass

