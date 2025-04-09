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
      
       
        for(let line=0 ; line < lines; line++){

            tr = this.CreateTR(`${'table'}-${line}`);
            

            for(let tdline in text){

                if(type === 'td'){

                    data = this.CreateTD(text[tdline]);

                } else {

                    data = this.CreateTH(text[tdline]);

                }
                
                tr.appendChild(data);

            }
           

         
            element.appendChild(tr);

        };


    }

    CreateTable(NumberOfbodyLines =1,NumberofHeadLines = 1,HeadData = [],BodyData = []){

        //Crate the main table
        const table = this.CreateElements();

        
        table.appendChild(this.CreateThead(NumberofHeadLines,HeadData));
        table.appendChild(this.CreateTbody(NumberOfbodyLines,BodyData));

        
        this.AddToDOM(table);
        console.log(table)

        return table


    };
  
    // Editing the table


    EditTableRow(TableRowID){





    }

    TransformDataInInputs(){



    }
    

}

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

    CreateInputsLabel(idName,idValue){

        const InputsContainer = document.createElement('section');
        InputsContainer.setAttribute('class','Inputs-Container');

        const InputName = document.createElement('input');
        InputName.setAttribute('type','text');
        InputName.setAttribute('placeholder','Nome do custo');
        InputName.setAttribute('id',idName);
        InputName.setAttribute('class','input-budgets');
        

        const InputValue = document.createElement('input');
        InputValue.setAttribute('type','Number');
        InputValue.setAttribute('placeholder','R$ 0,00');
        InputValue.setAttribute('min','0');
        InputValue.setAttribute('id',idValue);
        InputValue.setAttribute('class','input-budgets');

        const ADDicon = document.createElement('i');
        ADDicon.classList = '.ph-fill','.ph-plus-circle';

        InputsContainer.appendChild(InputName);
        InputsContainer.appendChild(InputValue);
        InputsContainer.appendChild(ADDicon);

        return InputsContainer;

    }

    CreateComponent(h2text = '',table = Object,){

        const sect = this.CreateSection();
        const title = this.CreateH2(h2text);
        const inputs = this.CreateInputsLabel();
        
        sect.appendChild(title);
        sect.appendChild(table);
        sect.appendChild(inputs);

        this.AddToDOM(sect);

        return sect;

    }

}

export class Complements extends HtmlComponents{


    CreateComplement(utilizado = true){

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
