

export class DataBase{

    constructor(DBName='',Version=1,teste){

        this.DBName = DBName;
        this.Version = Version;
      
 
        
     };

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
                        d.createObjectStore('budgets',{keyPath:'data'});
                        d.createObjectStore('renda',{keyPath:'data'});
                        d.createObjectStore('months',{keyPath:'data'});
    
                    break
    
    
                }
    
    
            }
    
        })

    }

    OpenTransaction(objectstorename='',type='readonly',data){

        return new Promise((resolve) =>{


            this.CreateDB.then((reponse) => {

                const transaction = Response.transaction(objectstorename,type);
                transaction.objectStore(objectstorename);
                if(type === 'readonly'){

                  resolve(this.ReadOnly(transaction))

                } else {

                    resolve(this.ReadWrite(transaction,data))

                        
                }
              
                


            })


        })

    }

    ReadOnly(request){

        const cursor = transaction.openCursor();
        console.log(cursor)

        return cursor

    }

    ReadWrite(request,data){

         return request.add(data)

    }

};