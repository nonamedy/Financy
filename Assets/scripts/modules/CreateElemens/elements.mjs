// Control the creation of HTML ELEMENTS
import { MathOperation } from "../MathOperations/math.mjs";
// superclaas 
class HtmlComponents {

    constructor(ElementName,father,ElementClass){

        this.ElementName = ElementName;
        this.ElementClass = ElementClass;
        this.father = father;

        this.mathcalc = new MathOperation()


    };


     CreateElements() {

        const element = document.createElement(this.ElementName);

        

        if( this.ElementClass !== ''  || this.ElementClass !== undefined){

            element.setAttribute('class',this.ElementClass)

        }
       


        

        return element

        


    };

    AddToDOM(element) {

        if(this.father !== undefined){

            this.father.appendChild(element)

        }

        

    };

    FormatToMonetary(value){

        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    }


};

export class Table extends HtmlComponents {

    constructor(ElementName,father,ElementClass){


        super()
        
    };

    //Creating the table

    CreateThead(TrLines = 1,text =['']){

        const head = document.createElement('thead');

        this.OrganizeDataANDRows('th',head,TrLines,text)

        return head;


    };

    CreateTbody(TrLines = 1,text = [' body text not defined'],bud){

        const  body = document.createElement('tbody');


        this.OrganizeDataANDRows('td',body,TrLines,text,bud);


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

    OrganizeDataANDRows(type,element,lines,text,bud=false){
         

        switch(type){


            case 'td':

            text.forEach((elemento)=> {

                let tr =this.CreateTR('');

                //organiza de acordo com o tipo específico de tabela
                switch (bud) {

                    case true:
                        

                    let tdnome = this.CreateTD(elemento.nome);
                    let tdvalor = this.CreateTD(elemento.valor);
    
    
                    tr.appendChild(tdnome);
                    tr.appendChild(tdvalor);

                        break;

                    case 'metas':


                        elemento.forEach((e) => {

                            this.mathcalc.porcentagens.then((response) => {

                                tr = this.CreateTR('')
                                
                                let td = this.CreateTD(e)
                                let tdp = this.CreateTD(`${response[e]}%`)
                                tr.appendChild(td)
                                tr.appendChild(tdp)
                                element.appendChild(tr);

                            })
                     
        
                            })


                        break

                    case 'overview':

                    elemento.forEach((e) => {
                        // e = bugname
                        let tr = this.CreateTR('')
                            
                        let budname = this.CreateTD(e);
                        let totgasto;
                        let devegastar;
                        let percentual;

                        this.mathcalc.CalcTotalGasto(e).then((response)=>{

                            totgasto = this.CreateTD(this.FormatToMonetary(response))
                            tr.appendChild(totgasto)
                        })

                        this.mathcalc.CalcDeveGastar(e).then((response)=>{

                            devegastar = this.CreateTD(this.FormatToMonetary(response))
                            tr.appendChild(devegastar)
                        })


                        this.mathcalc.CalPorcentual(e).then((response)=>{

                            percentual = this.CreateTD(`${response}%`);
                            tr.appendChild(percentual);
                        })
                     

                        tr.appendChild(budname)
                  
                        element.appendChild(tr);
    
                        })

                        break
                
                    default:


                    elemento.forEach((e) => {

                        tr = this.CreateTR('')
                            
                        let td = this.CreateTD(e)
                        tr.appendChild(td)
                        element.appendChild(tr);
    
                        })

                        break;
                }



                element.appendChild(tr);



            })


            break

            case 'th':

            const tr =this.CreateTR('')

            text.forEach(dadocolletion => {
                
                let th = this.CreateTH(dadocolletion)

                tr.appendChild(th)
                

            });

           
            element.appendChild(tr);
            break

        }

           




    }

    CreateTable(NumberOfbodyLines =1,NumberofHeadLines = 1,HeadData = [],BodyData = [],type){

        //Crate the main table
        const table = this.CreateElements();

        table.appendChild(this.CreateThead(NumberofHeadLines,HeadData));
        table.appendChild(this.CreateTbody(NumberOfbodyLines,BodyData,type));

        this.AddToDOM(table);
        
      

        return table;
        
    
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
        InputName.setAttribute('name','nome')
        //input for  the value
        const InputValue = this.CreateInput('number','R$ 0,00',idValue,FieldsClass);
        InputValue.setAttribute('name','valor')

        // add-inputs information icon
        const ADDicon = document.createElement('i');
        ADDicon.setAttribute('class','ph-fill ph-plus-circle')
        ADDicon.setAttribute('tabindex','0')
        
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

  


    CreateComplement(utilizado = true,budname,overview){

        const section = this.CreateElements();

        section.setAttribute('class',this.ElementClass = 'complements-container');
        
        // warning: death scope
        if(overview ){

            let total = 0;
            
   
            
            overview.forEach((buds,index,array)=>{


 
                 this.mathcalc.CalcTotalGasto(buds).then((response) =>{
                  
               
                    total += response;
                   
                    if(index +1 === array.length){

                        const Total_Gasto  = this.complement(total,'Total Gasto','red',true);
                        section.appendChild(Total_Gasto);


                        this.mathcalc.CalcDeveGastar('overview').then((response) =>{

                            let valor = response.renda - total;
                            const Deve_Gastar = this.complement(valor,'Deve Gastar','green',true);
                            
                            section.appendChild(Deve_Gastar);


                        });

                        this.mathcalc.renda.then((renda) =>{

                            let percent = Math.ceil((total / renda.renda) * 100);
                            const percentual = this.complement(percent,utilizado == true ?'Utilizado' : 'Percentual','',false)
                            section.appendChild(percentual);


                        })
                    }
                    
                })

    

                

            })

           
        
            
     
          

        } else{

            this.mathcalc.CalcTotalGasto(budname).then((response) =>{
        
                const Total_Gasto  = this.complement(response,'Total Gasto','red',true)
                section.appendChild(Total_Gasto);
            })
            
            this.mathcalc.CalcDeveGastar(budname).then((response)=>{
    
    
                const Deve_Gastar = this.complement(response,'Deve Gastar','green',true)
                section.appendChild(Deve_Gastar);
            })
    
            this.mathcalc.CalPorcentual(budname).then((response) =>{
    
                const percentual = this.complement(response,utilizado == true ?'Utilizado' : 'Percentual','',false)
                section.appendChild(percentual);
            })
          


        }

     

        this.AddToDOM(section);

        return section;


    }

    complement(data = 0,text,id,monetary){

        const container = document.createElement('div');

        const PrincipalValue = document.createElement('p');

        if(monetary ===true){

            PrincipalValue.textContent = this.FormatToMonetary(data);

        } else{

            PrincipalValue.textContent = `${data}%`

        }
        
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
