
import { DataBase } from "../database/db.mjs";

const database = new DataBase('teste',1)

export class events{

    constructor(element){

        this.element = element;
            
    };




};

export class InputEvents extends events{


    EditValueEvent(){

        console.log(this.element)
        this.element.addEventListener('change',(e) => {

            database.OpenTransaction('renda','readwrite',{renda:this.element.value,})



        });

        this.element.addEventListener('focusout',(e) => {

            console.log(e)


        });



    };

    FocusIN(){}; 
    FocusOut(){}; // uma vez que enter seja pressiionbado ou o inpit perde o foco os valores voltam a ser o que eram

        
}

