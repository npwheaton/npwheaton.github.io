export default class FileHolder{
    #attachments;
    constructor(parentnode){
        this.parent = parentnode;
        this.#attachments = [];
        this.individualFileDivClass = "";
        this.buttonclass = "";
        this.iconclass = "";
        this.progressbarvalueclass = "";
        this.fullbarclass = "";
    }
    addFile(file){
        let reader = new FileReader();
        let piece = document.createElement("span");
        piece.className = this.individualFileDivClass;
        let button = document.createElement("span");
        let icon = document.createElement("i");
        icon.className= this.iconclass;
        button.appendChild(icon);
        button.className = this.buttonclass;


        let fullbar = document.createElement("div");
        fullbar.className = this.fullbarclass;
        let progress = document.createElement("div");
        progress.className = this.progressbarvalueclass;
        fullbar.appendChild(progress);
        piece.appendChild(fullbar);
        

        reader.addEventListener("load",()=>{

        let obj = {
            filename: file.name,
            path: reader.result
        }
        this.#attachments.push(obj);
        piece.textContent = " " + file.name + " ";
        button.addEventListener("click",()=>{
            this.removeFile(obj); 
            this.parent.removeChild(piece);
        });
        piece.appendChild(button);
        })
        reader.addEventListener("progress",e=>{
            progress.style.width = `${(e.loaded/e.total*100)}%`;
        })
        reader.readAsDataURL(file);
        return piece;
    }
    removeFile(elem){
        let index = this.#attachments.indexOf(elem);
        if(index>-1){
            this.#attachments.splice(index, 1);
            return index;
        }
        
        
    }
    getList(){
        return JSON.parse(JSON.stringify(this.#attachments));
    }
    setClasses(fileclass, btnclass, iclass, fullbarclass, progressbarclass){
        this.individualFileDivClass = fileclass;
        this.buttonclass = btnclass;
        this.iconclass = iclass;
        this.progressbarvalueclass = progressbarclass;
        this.fullbarclass = fullbarclass;

    }
}