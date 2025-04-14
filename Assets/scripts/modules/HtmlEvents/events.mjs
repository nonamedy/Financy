
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

            database.OpenTransaction('renda','readwrite',{renda:this.element.value,data:database.GetDate()})



        });

        this.element.addEventListener('focusout',(e) => {

            console.log(e.target)


        });

         document.addEventListener('DOMContentLoaded',(e)=> {


            const  importrendaofdb = database.OpenTransaction('renda','readonly');
            importrendaofdb.then((response) => {
;

                this.element.value = Number(response.renda)
             


            })
        
            

           


        })



    };

   eventosParaMetas(){

    

   }
        
}

