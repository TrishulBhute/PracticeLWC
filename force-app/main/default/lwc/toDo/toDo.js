import { LightningElement, track } from 'lwc';

export default class ToDo extends LightningElement {
     @track todoList=[];
     NewTask = '';
    updateList(event){
        this.NewTask=event.target.value;
       console.log(event.target.value);
    }
    addTaskList(event){
        this.todoList.push({
            id: this.todoList.lentgh + 1,
            name: this.NewTask
        })
        this.NewTask = '';
    }
    deleteList(event){
        
        let deleteId=event.target.name;
        let todoList=this.todoList;
        let todoTaskIndex;
        for(let i=0;i<todoList.length; i++){
            if(deleteId===todoList[i].id) {
                todoTaskIndex=i;   
            }
        }
        this.todoList.splice(todoTaskIndex,1);
    }
}