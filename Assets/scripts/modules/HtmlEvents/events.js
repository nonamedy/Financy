
export class events{

    constructor(element){

        this.element = element;
            
    };




};

export class InputEvents extends events{


    EditValueEvent(){

        
        this.element.addEventListener('focusout',(e) => {

            this.element.color = 'red';


        });

    };

    FocusIN(){}; 
    FocusOut(){}; // uma vez que enter seja pressiionbado ou o inpit perde o foco os valores voltam a ser o que eram

        
}

