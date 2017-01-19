function Card()
{
    this.element;
    
    this.selected = false;
    this.edit = false;
    this.drag = false;
    this.x = 50;
    this.y = 50;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.install = function()
    {
        this.element = document.createElement("div");
        this.element.setAttribute("class", "card");
        this.element.style = "left:50px; top:50px;";
        
        this.ta = document.createElement("textarea");
        this.ta.readOnly = true;
        
        this.element.appendChild(this.ta);
        document.body.appendChild(this.element);
        
        this.addmousedown(this.element, this);
        this.adddblclick(this.element, this);
    }
    
    this.addmousedown = function(elem,obj)
    {
        elem.addEventListener("mousedown", function(){obj.cardmousedown(event);}, false);
    }
    
    this.adddblclick = function(elem,obj)
    {
        elem.addEventListener("dblclick", function(){obj.carddblclick(event);}, false);
    }
    
    this.cardmousedown = function(e)
    {
        this.selected = true;
        this.ta.style.borderColor = "rgba(0,0,0,.3)";
        
        if(this.edit==false)
        {
            this.drag = true;
            this.offsetX = this.x - e.clientX;
            this.offsetY = this.y - e.clientY;
        }
        
        //Setting Depth
        for(var _=0; _<=cards.length-1; _++)
        {
            if(cards[_]!=this)
            {
                cards[_].element.style.zIndex = "1";
            }
        }
        this.element.style.zIndex="2";
        
        e.stopPropagation();
    }
    
    this.carddblclick = function(e)
    {
        this.ta.readOnly = false;
        this.edit = true;
        this.ta.style.borderStyle = "dashed";
    }
    
    this.docmousedown = function()
    {
        this.ta.readOnly = true;
        this.edit = false;
        this.ta.style.borderStyle = "solid";
        this.selected = false;
        this.ta.style.borderColor = "rgba(0,0,0,0)";
    }
    
    this.docmousemove = function(e)
    {
        if(this.drag)
        {
            this.x = e.clientX + this.offsetX;
            this.y = e.clientY + this.offsetY;
            
            this.element.style.left = this.x;
            this.element.style.top = this.y;
        }
    }
    
    this.docmouseup = function()
    {
        this.drag = false;
    }
    
    this.install();
}