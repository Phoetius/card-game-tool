function CodeBox()
{
    this.element;
    this.ctrldown = false;
    this.enterdown = false;
    
    this.install = function()
    {
        this.element = document.createElement("div");
        this.element.setAttribute("class", "codebox");
        this.element.style = "left:75px; top:75px;";
        
        this.ta = document.createElement("textarea");
        this.ta.style.borderColor = "rgba(0,0,0,.3)";
        this.ta.style.width = "490px";
        this.ta.style.height = "510px";
        
        this.element.appendChild(this.ta);
        document.body.appendChild(this.element);
        
        this.element.style.zIndex="999999";
        this.addmousedown(this.element, this);
        this.addkeydown(this.element, this);
        this.addkeyup(this.element, this);
    }
    
    this.addmousedown = function(elem,obj)
    {
        elem.addEventListener("mousedown", function(){obj.codeboxmousedown(event);}, false);
    }
    
    this.addkeydown = function(elem,obj)
    {
        elem.addEventListener("keydown", function(){obj.codeboxkeydown(event);}, false);
    }
    
    this.addkeyup = function(elem,obj)
    {
        elem.addEventListener("keyup", function(){obj.codeboxkeyup(event);}, false);
    }
    
    this.codeboxmousedown = function(e)
    {
        e.stopPropagation();
    }
    
    this.destroy = function()
	{
	    this.element.remove();
		codebox = null;
	}
    
    this.docmousedown = function()
    {
        this.destroy();
    }
    
    // Activates build of cards CTRL Enter   
    this.codeboxkeydown = function(e)
    {        
        if(e.keyCode == "13") this.enterdown = true;
        if(e.keyCode == "17") this.ctrldown = true;
        
        if(this.enterdown == true && this.ctrldown == true)
        {
            this.buildcards();
            this.destroy();
        }
    }
    
    this.codeboxkeyup = function(e)
    {
        if(e.keyCode == "13") this.enterdown = false;
        if(e.keyCode == "17") this.ctrldown = false;
    }
    
    this.buildcode = function()
    {
        var code = "";
        for(var _=0; _<=cards.length-1; _++)
        {
            code += cards[_].x.toString() +";"+ cards[_].y.toString() +";";
            if(cards[_].ta.value=="") code += "NULL" +";;"
            else code += cards[_].ta.value +";;";
        }
        this.ta.value=code;
    }
        
    this.buildcards = function()
    {
        if(this.ta.value!="")
        {
            //Clear cards
            var cl = cards.length;
            for(var _=0; _<cl; _++)
            {
                cards[0].destroy()
            }

            cards = [];

            //Import
            var data = this.ta.value.split(";;");
            data.pop();
        
            //Create cards
            for(var _=0; _<=data.length-1; _++)
            {
                var cdata = data[_].split(";");
                
                if(cdata[2]=="NULL")cdata[2] = "";
                cards.push(new Card(cdata[0], cdata[1], cdata[2]));
            }
        }
    }

    this.install();
    this.buildcode();
}