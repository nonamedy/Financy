
import { DataBase } from "../database/db.mjs";

const database = new DataBase('Teste',1)

export class events{

    constructor(element){

        this.element = element;
            
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

   EventosParaBotoes(elemento){

    
    // insirir os valores no banco de dados e na tabela

    elemento.addEventListener('click',(e) =>{

        if( e.target.nodeName === 'I'){

            console.log(e.target.parentElement);
            console.log(e.target.parentElement[0]);

            const nome = e.target.parentElement[0]
            const valor = e.target.parentElement[1]

            nome.value= 'deu certo kkk'
            valor.value = '666'

        };
        


    })


   };
        
}

