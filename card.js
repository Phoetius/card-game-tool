function Card(x, y, content)
{
    this.element;
    
    this.selected = false;
    this.edit = false;
    this.drag = false;
    this.x = x;
    this.y = y;
    this.content = content;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.install = function()
    {
        this.element = document.createElement("div");
        this.element.setAttribute("class", "card");
        this.element.style = "left:"+this.x+"px; top:"+this.y+"px;";
        
        this.ta = document.createElement("textarea");
        this.ta.value = this.content;
        this.ta.readOnly = true;
        
        this.element.appendChild(this.ta);
        document.body.appendChild(this.element);
        
        this.addmousedown(this.element, this);
        this.adddblclick(this.element, this);
        this.addkeydown(this.element, this);
    }
    
    this.destroy = function()
	{
        this.element.remove();
        
        cards.splice(this.getindex(),1);
	}

    this.getindex = function()
    {
        var i = null;
        for(var _=0; _<=cards.length-1; _++)
        {
            if(cards[_]==this)i = _;
        }

        return i;
    }
    
    this.addmousedown = function(elem,obj)
    {
        elem.addEventListener("mousedown", function(){obj.cardmousedown(event);}, false);
    }
    
    this.adddblclick = function(elem,obj)
    {
        elem.addEventListener("dblclick", function(){obj.carddblclick(event);}, false);
    }
    
    this.addkeydown = function(elem,obj)
    {
        elem.addEventListener("keydown", function(){obj.cardkeydown(event);}, false);
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
        cards.push(cards.splice(this.getindex(), 1)[0]);

        //Update depth of all cards
        for(var _=0; _<=cards.length-1; _++)
        {
            cards[_].element.style.zIndex = cards[_].getindex();
        }
        
        e.stopPropagation();
    }
    
    this.carddblclick = function(e)
    {
        this.ta.readOnly = false;
        this.edit = true;
        this.ta.style.borderStyle = "dashed";
    }
    
    this.cardkeydown = function(e)
    {
        if(e.keyCode == "8" && this.selected == true && this.edit == false)
        {
            this.destroy();
        }
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