#Basic Tooltip plugin.

##Usage:

###javascript:
<pre>
$(document).ready(function(){
        $('.tooltip').jcctooltip(
            {
                id: "tooltip",
                hintergrund: "#FFFFFF",
                rand: "2px #ABABAB solid",
                eckenradius: 4,
                zeit: 300,
                imagewidth: 200,
                tooltippadding : '7px 10px',
                tooltipfontsize: '12px',
                tooltipfontfamily:"Tahoma, Helvetica, sans-serif",
                dataType: 'GET',
                ajaxType: 'html'
            }
        );
})
</pre>
### HTML:
 tooltip is taken from the rel attribute

* For Basic tooltip 
`<a rel="tooltip" class="tooltip">tooltip</a>`

* For Image tooltip link an image (.jpg, .png, .gif)
`<a rel="image.jpg" class="tooltip">tooltip</a>`

* with http in front, it is an ajax tooltip
`<a rel="http://ajax.html" class="tooltip">tooltip</a>`