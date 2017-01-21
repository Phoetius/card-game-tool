function CodeBox()
{
    this.element;
    
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
    }
    
    this.addmousedown = function(elem,obj)
    {
        elem.addEventListener("mousedown", function(){obj.codeboxmousedown(event);}, false);
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

    this.install();
}