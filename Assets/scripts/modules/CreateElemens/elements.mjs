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

            tr = this.CreateTR();
            

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


    };
  
    // Editing the table


    EditTableRow(TableRowID){





    }

    TransformDataInInputs(){



    }
    

}

export class components extends HtmlComponents {

    CreateSection(){

        const sect = this.CreateElements()
        const title = this.CreateH2('the best ass of the year')
        sect.appendChild(this.CreateH2('the best test of the year'))

        this.AddToDOM(sect)

    }

    CreateH2(text){

        const h2 = document.createElement('h2')
        h2.textContent = text
        h2.setAttribute('class','budget-title')
        return h2

    }

    CreateInputsLabel(){}

}

