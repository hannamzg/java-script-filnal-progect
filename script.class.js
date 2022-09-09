class theTodo{
    courantId = 0;

    TheTodoArr =[
        /* id : this.courantId++,
        isFinch : false,
        text,
        data : new Date, */
    ];

    getTodo(){
        return this.TheTodoArr;
    }

    constructor(){
        this.load();
    }

    save(){
        localStorage.setItem("TheTodoArr" , JSON.stringify(this.TheTodoArr));
        localStorage.setItem("currentId", this.courantId);
    }

    load(){
        if(localStorage.getItem("TheTodoArr")){
            this.TheTodoArr = JSON.parse(localStorage.getItem("TheTodoArr"));
            this.courantId = Number(localStorage.getItem("courantId"));
        }
    }

    
    add(text){
        if(typeof text !== "string" || text.length < 2){
            throw new Error("text shod be more than 2");
        }
        
        let TheTodos = {
            id : this.courantId++,
            isFinch : false,
            text,
            data : new Date, 
            isCheck:false,
        }
        
        this.TheTodoArr.push(TheTodos);
        
        return TheTodos;
    }

    getId(id){
      let found = this.TheTodoArr.find((element) => element.id === id);
        if(found){
            return found;
        }
    }

    removeFroMTodo(id){
        let theID = this.getId(id);
        this.TheTodoArr = this.TheTodoArr.filter((element) => element.id !== id);
        this.save();
        return theID;
    }

    edit(id,text){
        let theID = this.getId(id);
        let changeText = this.TheTodoArr.map((element) => {
            if(element.id===id){
                element.text = text
            }
        })

        if (changeText) {
        return theID            
        }  
    }

    checkIsChange(id){
        let theID = this.getId(id);
        let checkIsChange = this.TheTodoArr.map((element) => {
            if(element.id===id){
                element.isCheck = true;
            }
        })
        if (checkIsChange) {
        return theID            
        } 

    }   
    changeIsFinch(id,isFinch=null){
        let theID = this.getId(id);
        theID.isFinch = typeof isFinch === "boolean" ? isFinch : !theID.isFinch;
        
        /* if(typeof isFinch === "boolean"){
            theID.isFinch = isFinch;
        }
        else if(typeof isFinch !== "boolean"){
           theID.isFinch = !theID.isFinch;
        } */
        this.save();
        
        return theID;
    }

}

let  mangerTodoTest  = new theTodo();
console.log(mangerTodoTest.add("hanna"));
console.log(mangerTodoTest.add("hanna"));
console.log(mangerTodoTest.add("hanna"));
console.log(mangerTodoTest.checkIsChange(0));
