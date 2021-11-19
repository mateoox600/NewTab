(()=>{"use strict";const t=function(t){this.ctx=t},e=function(){function t(t,e){this.x=t,this.y=e}return t.prototype.equal=function(t){return t.x===this.x&&t.y===this.y},t.prototype.rotate=function(t){t=-t*(Math.PI/180);var e=Math.cos(t),n=Math.sin(t),i=this.x;return this.x=this.x*e-this.y*n,this.y=i*n+this.y*e,this},t.prototype.distance=function(t){return Math.sqrt(Math.pow(this.y-t.y,2)+Math.pow(this.x-t.x,2))},t.prototype.copy=function(){return new t(this.x,this.y)},t}();var n,i=(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});const r=function(t){function e(e,n,i,r){var o=t.call(this,e,n)||this;return o.x=e,o.y=n,o.rotationSpeed=i,o.cell=r,o}return i(e,t),e}(e),o=function(){function t(t,e){this.from=t,this.to=e}return t.isIntersecting=function(t,e){function n(t,e,n){return(n.y-t.y)*(e.x-t.x)>(e.y-t.y)*(n.x-t.x)}return n(t.from,e.from,e.to)!=n(t.to,e.from,e.to)&&n(t.from,t.to,e.from)!=n(t.from,t.to,e.to)},t}(),l=function(){function t(){}return t.lerp=function(t,e,n){return(1-n)*t+n*e},t.clamp=function(t,e,n){return Math.min(Math.max(t,e),n)},t}();var s=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),c=function(t){function n(n){var i=t.call(this,n)||this;i.ctx=n,i.name="Moving Segments",i.points=[],i.segments=[],i.lastSegments=[],i.cellSize=100,i.fade=0,i.borders=i.getBorderFormated(),i.size=new e(Math.floor(innerWidth/i.cellSize)+2,Math.floor(innerHeight/i.cellSize)+2);for(var o=0;o<i.size.x;o++)for(var l=0;l<i.size.y;l++){var s=o*i.cellSize+Math.floor(Math.random()*i.cellSize),c=l*i.cellSize+Math.floor(Math.random()*i.cellSize);i.points.push(new r(s,c,1,new e(o,l)))}return setInterval((function(){i.updatePoints()}),1e3/60),setInterval((function(){i.calculateSegments()}),1e4),i.calculateSegments(),i}return s(n,t),n.prototype.getBorderFormated=function(){var t=this;return[new o(new e(0,0),new e(0,innerHeight)),new o(new e(0,innerHeight),new e(innerWidth,innerHeight)),new o(new e(innerWidth,innerHeight),new e(innerWidth,0)),new o(new e(0,0),new e(innerWidth,0)),new o(new e(innerWidth/5*4,0),new e(innerWidth/5*4,innerHeight/5)),new o(new e(innerWidth/5*4,innerHeight/5),new e(innerWidth,innerHeight/5))].map((function(e){return e.from.x+=t.cellSize,e.from.y+=t.cellSize,e.to.x+=t.cellSize,e.to.y+=t.cellSize,e}))},n.prototype.draw=function(){var t=this;if(Math.floor(innerWidth/this.cellSize)+2!=this.size.x||Math.floor(innerHeight/this.cellSize)+2!=this.size.y){this.size=new e(Math.floor(innerWidth/this.cellSize)+2,Math.floor(innerHeight/this.cellSize)+2),this.points=this.points.filter((function(e){return e.cell.x<=t.size.x&&e.cell.y<=t.size.y})),console.log(this.points);for(var n=0;n<this.size.x;n++)for(var i=0;i<this.size.y;i++)if(null==this.getPointByCell(new e(n,i))){var l=Math.floor(Math.random()*this.cellSize),s=Math.floor(Math.random()*this.cellSize),c=n*this.cellSize+l,a=i*this.cellSize+s;this.points.push(new r(c,a,1,new e(n,i)))}this.calculateSegments(),this.borders=this.getBorderFormated()}this.ctx.save(),this.ctx.translate(-this.cellSize,-this.cellSize),this.ctx.strokeStyle="rgb(237, 239, 255, "+Math.min(this.fade,255)/256+")",this.ctx.lineWidth=.75,this.ctx.beginPath(),this.segments.filter((function(e){return!t.segments.find((function(t){return o.isIntersecting(e,t)&&t.from!==e.from&&t.to!==e.to&&t.from!==e.to&&t.to!==e.from}))})).forEach((function(e){t.borders.map((function(t){return o.isIntersecting(t,e)})).find((function(t){return t}))||e.from.x>innerWidth-innerWidth/5+t.cellSize&&e.from.y<innerHeight/5+t.cellSize||e.to.x>innerWidth-innerWidth/5+t.cellSize&&e.to.y<innerHeight/5+t.cellSize||(t.ctx.moveTo(e.from.x,e.from.y),t.ctx.lineTo(e.to.x,e.to.y))})),this.ctx.stroke(),this.fade<256&&(this.fade+=5,this.ctx.strokeStyle="rgba(237, 239, 255, "+Math.max(256-this.fade,0)/256+")",this.ctx.beginPath(),this.lastSegments.filter((function(e){return!t.lastSegments.find((function(t){return o.isIntersecting(e,t)&&t.from!==e.from&&t.to!==e.to&&t.from!==e.to&&t.to!==e.from}))})).forEach((function(e){t.borders.map((function(t){return o.isIntersecting(t,e)})).find((function(t){return t}))||e.from.x>innerWidth-innerWidth/5&&e.from.y<innerHeight/5||e.to.x>innerWidth-innerWidth/5&&e.to.y<innerHeight/5||(t.ctx.moveTo(e.from.x,e.from.y),t.ctx.lineTo(e.to.x,e.to.y))})),this.ctx.stroke()),this.ctx.restore()},n.prototype.getPointByCell=function(t){return this.points.find((function(e){return e.cell.equal(t)}))},n.prototype.calculateSegments=function(){var t=this,n=this.points.map((function(t){return new r(t.x,t.y,t.rotationSpeed,t.cell)}));this.lastSegments=this.segments.map((function(t){var e=n.find((function(e){return e.equal(t.from)})),i=n.find((function(e){return e.equal(t.to)}));if(null!=e&&null!=i)return new o(e,i)})).filter((function(t){return null!=t})),this.fade=0,this.segments.length=0,this.points.forEach((function(n){var i=[];i.push(t.getPointByCell(new e(n.cell.x-1,n.cell.y))),i.push(t.getPointByCell(new e(n.cell.x,n.cell.y-1))),i.push(t.getPointByCell(new e(n.cell.x+1,n.cell.y))),i.push(t.getPointByCell(new e(n.cell.x,n.cell.y+1))),i.push(t.getPointByCell(new e(n.cell.x-1,n.cell.y-1))),i.push(t.getPointByCell(new e(n.cell.x+1,n.cell.y-1))),i.push(t.getPointByCell(new e(n.cell.x+1,n.cell.y+1))),i.push(t.getPointByCell(new e(n.cell.x-1,n.cell.y+1))),i.forEach((function(e){null!=e&&(t.segments.find((function(t){return t.from.equal(n)&&t.to.equal(e)||t.from.equal(e)&&t.to.equal(n)}))||Math.random()<.4&&t.segments.push(new o(n,e)))}))}))},n.prototype.updatePoints=function(){var t=this;this.points=this.points.map((function(n){n.rotationSpeed=l.clamp(n.rotationSpeed+(Math.random()/10-.05),.5,1.25);var i=new e(n.cell.x*t.cellSize+t.cellSize/2,n.cell.y*t.cellSize+t.cellSize/2),r=new e(i.x-n.x,i.y-n.y),o=r.copy().rotate(n.rotationSpeed),s=new e(r.x-o.x,r.y-o.y);return n.x+=s.x,n.y+=s.y,n}))},n}(t);const a=c;var h=document.getElementById("canvas"),u=document.getElementById("search-bar"),f=document.getElementById("time"),y=document.getElementById("settings"),m=document.getElementById("settings-page"),p=document.getElementById("search-link-input");y.addEventListener("click",(function(){"visible"===m.style.visibility?m.style.visibility="hidden":m.style.visibility="visible"})),p.value=window.localStorage.getItem("search")||"https://www.google.com/search?q=%s",p.addEventListener("input",(function(){window.localStorage.setItem("search",p.value)})),u.addEventListener("keypress",(function(t){if("Enter"===t.key){if(u.value.length<1)return;var e=u.value.replace(" ","+");window.location.href=p.value.replace("%s",e)}}));var d=h.getContext("2d"),g=new{movingSegments:a}.movingSegments(d),w=Date.now(),x=Date.now(),v="";requestAnimationFrame((function t(){requestAnimationFrame(t);var e=Date.now(),n=e-x;if(!(n<=100)){x=e-n%1e3/10;var i=new Date,r=(i.getHours()<10?"0"+i.getHours():i.getHours())+":"+(i.getMinutes()<10?"0"+i.getMinutes():i.getMinutes());r!==v&&(v=r,f.innerText=r)}})),requestAnimationFrame((function t(){requestAnimationFrame(t);var e=Date.now(),n=e-w;n<=1e3/60||(w=e-n%1e3/60,h.width=innerWidth,h.height=innerHeight,d.clearRect(0,0,innerWidth,innerHeight),g.draw())}))})();