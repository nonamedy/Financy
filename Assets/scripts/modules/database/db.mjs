

export class DataBase{

    constructor(DBName='',Version=1,teste){

        this.DBName = DBName;
        this.Version = Version;
      
 
        
     };

     
    GetDate(){

        const date = new Date()
        const month = date.getMonth() + 1
        const year = date.getFullYear().toString().slice(-2)

        const fmes = month < 10 ? `0${month}` : month;

        const formated_date = `${fmes.toString()}/${year.toString()}`


        return formated_date


}

    CreateDB(version){

        if(version){

            this.Version = version

        }

         return new Promise((resolve,reject) =>{

            const data =indexedDB.open(this.DBName,this.Version)
    
            data.onsuccess = () =>resolve(data.result);
            data.onerror = () => reject(data.error);
    
            data.onupgradeneeded = (event) => {
                console.log(event);
                const d = data.result;
    
    
                switch(event.newVersion){
    
    
                    case 1:
    
                        d.createObjectStore('porcentagens',{keyPath:'data'});
                        let buds = d.createObjectStore('budgets',{});
                        d.createObjectStore('renda',{keyPath:'data'});
                        d.createObjectStore('months',{keyPath:'data'});

                        let index = buds.createIndex('budget_idx','budget')
                    
    
                    break
    
    
                }
    
    
            }
    
        });

    };

    OpenTransaction(objectstorename='',type='readonly',data,readtype){

        return new Promise((resolve) =>{

            const dd = this.CreateDB(1)

            dd.then((response) => {
                
                const transaction = response.transaction(objectstorename,type).objectStore(objectstorename);
                

                switch (type) {

                    case 'readonly':

                        resolve(this.ReadOnly(transaction,readtype));

                    break

                  
              
                
                    default:

                        resolve(this.ReadWrite(transaction,data,'put'));    

                    break
                }

              
                


            });


        });

    }

    ReadOnly(request,type = 'cursor'){

        return new Promise((resolve) => {

            switch(type){

                case 'key':
                   
                    let key = request.get(this.GetDate());
                    console.log(key);
                    
                    key.onsuccess = () => {

                        try {

                            resolve(key.result)

                            
                        } catch (error) {
                            
                            console.log('erro')

                        }


                    }
                  

                    break;

                case 'cursor':

                    const cursorrequest = request.openCursor();
        
                    cursorrequest.onsuccess = () => {
            
            
                        try {
                            
                            const cursor = cursorrequest.result.value
                            
                            resolve(cursor)
            
                        } catch (error) {
                            
                            window.alert('um erro ocorreu',error);
                            
                        };
            
            
                    };


                    break;
            };


  


        })

        

    };

    ReadWrite(request,data={},type='put'){

         return request[type](data,data.nome);

    }

    Index(budname){

        return new Promise((resolve) =>{

            let dbresquest = this.CreateDB()

            dbresquest.then((response) => {

                // Cria uma requsição de um index do banco de dados.
                let transaction = response.transaction("budgets"); 
                let budgets = transaction.objectStore("budgets");
                let budgetindex = budgets.index("budget_idx");
            
            
                let request =  budgetindex.getAll(budname);
            
            
                request.onsuccess = () => {

                    if(request.result !== undefined){

                      
                        
                        resolve(request.result)

                    } else {window.alert('aabou')}
                    
                
                }


            })

        })
     

    };

};