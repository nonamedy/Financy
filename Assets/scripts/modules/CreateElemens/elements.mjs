// Control the creation of HTML ELEMENTS

// superclaas 
class HtmlComponents {

    constructor(ElementName,father,ElementClass){

        this.ElementName = ElementName;
        this.ElementClass = ElementClass;
        this.father = father;


    };


     CreateElements() {

        const element = document.createElement(this.ElementName);

        

        if( this.ElementClass !== ''  || this.ElementClass !== undefined){

            element.setAttribute('class',this.ElementClass)

        }
       


        

        return element

        


    };

    AddToDOM(element) {

        this.father.appendChild(element)

    };

    FormatToMonetary(value){

        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    }


};

export class Table extends HtmlComponents {

    constructor(ElementName,father,ElementClass){


        super(ElementName,father,ElementClass);

    };

    //Creating the table

    CreateThead(TrLines = 1,text =['']){

        const head = document.createElement('thead');

        this.OrganizeDataANDRows('th',head,TrLines,text)

        return head;


    };

    CreateTbody(TrLines = 1,text = [' body text not defined']){

        const  body = document.createElement('tbody');

        this.OrganizeDataANDRows('td',body,TrLines,text)
    
        return  body


    };

    CreateTR(id = ''){
        
       const tablerow =  document.createElement('tr');

       if(id !== undefined || id !== ''){

            tablerow.setAttribute('LineID',id);
            

       };

    
       return tablerow;

    };
    CreateTD(text){

        const td = document.createElement('td');
        td.textContent = text;
        return td;

    };
    CreateTH(text){

        const th =  document.createElement('th');
        th.textContent = text;
        return th;

        
    };

    OrganizeDataANDRows(type,element,lines,text){

        
        let tr;
        let data;
        console.log(text)
       //quantidade de linhas
        for(let line=0 ; line < lines; line++){

            tr = this.CreateTR(`${text}-${line}`);
           
      
            //cria TDS em relaçãoa o tammanho do objeto
            for(let tdline in text){

                if(type === 'td'){

                    if(text.length === 1){


                    

                        data = this.CreateTD(text[0][line]);
                }else{data = this.CreateTD(text[tdline]);}

                   

                } else {

                    data = this.CreateTH(text[tdline]);

                }
                
                tr.appendChild(data);

            }
           

         
            element.appendChild(tr);

        };


    }

    CreateTable(NumberOfbodyLines =1,NumberofHeadLines = 1,HeadData = [],BodyData = [],InputNameForEdit,InputValueForEdit){

        //Crate the main table
        const table = this.CreateElements();

        table.appendChild(this.CreateThead(NumberofHeadLines,HeadData));
        table.appendChild(this.CreateTbody(NumberOfbodyLines,BodyData));

        this.AddToDOM(table);
        
        this.EditTableRow(table,InputNameForEdit,InputValueForEdit);

        return table;
        

    };
  
    // Editing the table

    EditTableRow(table,inputName,inputValue){


        table.addEventListener('mousedown',(e) => {

            console.log(e.target)
            let target = e.target

            if(target.nodeName == 'TD'){
                
                //acessa a linha pai e seus filhos
                let trline = target.parentNode;
                let name = trline.cells[0];
                let value = trline.cells[1];
        
          
                
                //transforma os th em inputs
       
                
            }

            
        });


    };




    

};

export class components extends HtmlComponents {

    CreateSection(){

        const sect = this.CreateElements();
        sect.setAttribute('class',this.ElementClass);

        return sect

      
    };

    CreateH2(text){

        const h2 = document.createElement('h2');
        h2.textContent = text;
        h2.setAttribute('class','budget-title');
        return h2;

    }

    CreateInput(type,placeholder='',id='',classes=''){

        const input = document.createElement('input');

        input.setAttribute('type',type);
        input.setAttribute('placeholder',placeholder);

        if(classes !== ''|| id !== ''){

            input.setAttribute('id',id);
            input.setAttribute('class',classes);

        }
        
        
        switch(type){

            case 'number':

                input.setAttribute('min','0');
                

            break;
            
            case 'text':

               

            break;

        }

        return input;


    }

    CreateInputsLabel(idName,idValue,classe ='Inputs-Container',FieldsClass ='input-budgets' ){

        const InputsContainer = document.createElement('form');
        InputsContainer.setAttribute('class',classe);

        //input for the name of budget
        const InputName = this.CreateInput('text','Nome do custo',idName,FieldsClass)

        //input for  the value
        const InputValue = this.CreateInput('number','R$ 0,00',idValue,FieldsClass);


        // add-inputs information icon
        const ADDicon = document.createElement('i');
        ADDicon.setAttribute('class','ph-fill ph-plus-circle')

        //Add all inputs to your container
        InputsContainer.appendChild(InputName);
        InputsContainer.appendChild(InputValue);
        InputsContainer.appendChild(ADDicon);

        return InputsContainer;

    }

    CreateComponent(h2text = '',table = Object){

        const sect = this.CreateSection();
        const title = this.CreateH2(h2text);
        const inputs = this.CreateInputsLabel(`${h2text}-Name`,`${h2text}-Value`);
        
        sect.appendChild(title);
        sect.appendChild(table);
        sect.appendChild(inputs);

        this.AddToDOM(sect);

        return sect;

    }

}

export class AdicionalInfo extends HtmlComponents{


    CreateComplement(utilizado = true,father){

        const section = this.CreateElements();
        section.setAttribute('class',this.ElementClass = 'complements-container');

        const Total_Gasto  = this.complement(0,'Total Gasto','red')
        const Deve_Gastar = this.complement(0,'Deve Gastar','green')
        const percentual = this.complement(0,utilizado == true ?'Utilizado' : 'Percentual')
    
        section.appendChild(Total_Gasto);
        section.appendChild(Deve_Gastar);
        section.appendChild(percentual);

        this.AddToDOM(section);

        return section;


    }

    complement(data = 0,text,id){

        const container = document.createElement('div');

        const PrincipalValue = document.createElement('p');
        PrincipalValue.textContent = this.FormatToMonetary(data);
        PrincipalValue.setAttribute('class','data-complement');
    
        if( PrincipalValue !== undefined){

            PrincipalValue.setAttribute('id',id);

        };

        const details = document.createElement('p');
        details.textContent = text;
        details.setAttribute('class','details-complement');

        container.appendChild(PrincipalValue);
        container.appendChild(details);

        return container;

    }

}
