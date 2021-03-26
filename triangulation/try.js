var cords=[];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var n;
canvas.addEventListener("click",function(event){
    console.log(event.x,event.y)
    var cord={"x":event.x,y:event.y};
    console.log(cord);
    cords.push(cord);
    var max = cords.length - 1;
    if (typeof cords[max - 1] !== "undefined") {
        var curr = cords[max], prev = cords[max - 1];
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y-80);
        console.log(prev.x,prev.y-80);
        console.log(curr.x,curr.y-80);
        ctx.lineTo(curr.x, curr.y-80);
		ctx.lineWidth=3.0;
        ctx.stroke();
    }
	n=cords.length;
})

class node {
    constructor(x,y,index) {
      this.x = x;
	  this.y=y;
	  this.index=index;
      this.prev = null;
      this.next = null;
    }
}
class nodel {
    constructor(indexl) {
      this.indexl = indexl;
      this.nextl = null;
    }
  }
  
class points{
	     //Class for Updating Elements on Ear list
	constructor(){
		this.length=0;
		this.headl = null;
	}
	additeml(val){
		var newnodel = new nodel(val);
		if(this.headl==null)  //if the list is empty
		{
			newnodel.nextl=null;
			this.headl=newnodel;
			this.length++;
			return;
		}
		var t=this.headl;
		while(t.nextl!=null)//if it is not then transversing to the last element and adding new newnodel
		{
			t=t.nextl;
		}
		t.nextl=newnodel;
		newnodel.nextl=null;
		this.length++;
	}
	deliteml(t)//member function to delete a node passed from the list
	{
		var te=this.headl;
		if(te==t)	//if the the node to delete is head
		{
			this.headl=te.nextl;
			// delete(t);
			this.length--;
			return;
		}
		var pre=new node;
		while(te!=t)//otherwise transversing to the previous and deleting the node
		{
			pre=te;
			te=te.nextl;
		}
		this.length--;
		pre.nextl=te.nextl;
		// delete(t);
	}
	display()//member function to display the list
	{
		var t=this.headl;
		while(t!=null){
			console.log(t.indexl+" ");
			t=t.nextl;
		}
	}
};
Ear=new points;//defining the list Ear globally as it will get updated in many functions
var trgl=new Object();
function formtrgl(temp){
	trgl={};
	trgl.x1=(temp.prev).x;
	trgl.y1=(temp.prev).y;
	trgl.x2=temp.x;
	trgl.y2=temp.y;
	trgl.x3=(temp.next).x;
	trgl.y3=(temp.next).y;
}
function chckrflx(temp)//Function for finding whether a coordinate given in form of node forms 
{						 //reflex angle wrt the other two coordintes beside it
	var dtpr=(trgl.x1-trgl.x2)*(trgl.x3-trgl.x2)+(trgl.y1-trgl.y2)*(trgl.y3-trgl.y2);
	//finding dot product of vectors 
	var det=(trgl.x1-trgl.x2)*(trgl.y3-trgl.y2)-(trgl.y1-trgl.y2)*(trgl.x3-trgl.x2);
	//finding determinant wrt the x and y components of vector
	var angl=Math.atan2(det,dtpr);//as atan2 has range from -PI to +PI 
											 // and converting the angle to degrees
	if(angl<0)// if atan2<0 so angle> so reflex angle
		return 0;
	else
		return 1;

}
function area(c)//function for finding area formed by three triangle with their coordinates
{
	// var a=0;
	if(c==0)
   		return Math.abs((trgl.x1*(trgl.y2-trgl.y3) + trgl.x2*(trgl.y3-trgl.y1)+ trgl.x3*(trgl.y1-trgl.y2))/2.0);
	else if(c==1)
		return Math.abs((trgl.x4*(trgl.y2-trgl.y3) + trgl.x2*(trgl.y3-trgl.y4)+ trgl.x3*(trgl.y4-trgl.y2))/2.0);
	else if(c==2)
		return Math.abs((trgl.x1*(trgl.y4-trgl.y3) + trgl.x4*(trgl.y3-trgl.y1)+ trgl.x3*(trgl.y1-trgl.y4))/2.0);
	else
		return Math.abs((trgl.x1*(trgl.y2-trgl.y4) + trgl.x2*(trgl.y4-trgl.y1)+ trgl.x4*(trgl.y1-trgl.y2))/2.0);
}
function chcktrgl(temp)//function for checking that if we form a triangle by three points does any other point of
						 // polygon come inside it
{
	var A = area (0);//finding area of orignal triangle
    var t=(temp.next).next;//checking every other point of the polygon if atleast one such point exists
    while(temp.prev!=t)
    {
		trgl.x4=t.x;
		trgl.y4=t.y;
    	// pair<float,float> p4;
    	// p4.first=t.x;
    	// y4=t.y;
    	if((trgl.x4 != trgl.x1 || trgl.y4 != trgl.y1) && (trgl.x4 != trgl.x2 || trgl.y4!=trgl.y2) && (trgl.x4 != trgl.x3 || trgl.y4 != trgl.y3))
  		{
  			var A1=area(1);	//finding area of the triangles formed by the other coordinate and other 2 from 3   
  			var A2=area(2);//and checking if the sum is equal to area of orignal triangle which
  			var A3=area(3);//is only true if point lies in or on the orignal triangle
  			if(A==(A1+A2+A3))
  				return false;//if atleast one inside point is found return false
		}
		// if(t.next==null)
		// t=this.head;
		// else
		t=t.next;
	}
	return true;
}
// var n=cords.length;
let ans=[];
class graph//Defining class for storing the coordinates of polygon
{			
	constructor(){
		this.length=0;
		this.head=null;
		this.tail=null;
	}
	display()//member function to display double link list
	{
		var t=this.head;
		console.log("{")
		while(1)
		{
			console.log('{'+t.x+","+t.y+'}');
			t=t.next; 
			if(t==this.head||t==null)
			break;
		}
		console.log("}")
	}
	delitem(t)//member function to delete a given node from 
	{									//circular double linked list
		var p=t.prev;
		var n=t.next;
		p.next=n;
		n.prev=p;
		if(t==this.head)//checking if the node to delete is head and updating head accordingly
			this.head=n;
		this.length--;
		// delete(t);
	}
	additem(a,b,i){
		var newnode = new node(a,b,i);
		var t=this.head;
		if(this.head==null)//if double linked list is empty 
		{
			newnode.next=null;
			newnode.prev=null;
			this.head=newnode;
			this.tail=newnode;
			this.length++;
			return;
		}
		while(t.next!=null)//otherwise transversing to the last element and adding node
		{
			t=t.next;	
		}
		// delete(t.next);
		t.next=newnode;
		newnode.prev=t;
		if(this.length==n-1){
			newnode.next=this.head;
			this.head.prev=newnode;
		}
		else
		newnode.next=null;
		this.tail=newnode;
		this.length++;
		this.display();
		if(this.length==n){
			this.findears();
			Ear.display();
			this.earclip();
			console.log("{");
			for(var i=0;i<ans.length;i++)
			console.log("["+ans[i][0]+", "+ans[i][1]+"]");
			console.log("}");
		}
	}
	findears(){
		a=new points;
		Ear=a;
		var temp=this.head;
		var count=0;//maintaining index by by count variable
		while(1)//looping till we reach the initial node
		{
			formtrgl(temp);
			var a=chckrflx(temp);//checking if the coordinate form reflex angle
			console.log("a:"+a);
			if(a===1)
			{
				console.log("b:"+b);
				var b=chcktrgl(temp);//checking if any other point comes inside the triangle formed
				if(b==1)
				{
					console.log("count:"+count);
					Ear.additeml(count);//adding the index to Ear list 
				}
			}
			temp=temp.next;
			count++;
			if(temp==this.head)
				break;
		}
	}
	earclip()//member function for transversing through the Ears and deleting 											// coordinates and indexes from ear until only a triangle is left
	{
		var temp=this.head;
		var t=Ear.headl;//as we used friend function we may acess points class private variables here
		var count=0;//for maintaining count of number of coordinates removed
		var m=this.length-3;
		while(count<m)//looping till n-3 coordinates are removed from the double linked list
		{
			if(temp.index==t.indexl)//finding the node whose index is element of ear
			{
				var p=temp.prev;
				var n=temp.next;
				ans[count][0]=(temp.prev).index;//storing the index of prev and next coordinate
				ans[count][1]=(temp.next).index;//in the ans array
				this.delitem(temp);//deleting the coordinate and index from graph and ear respectively
				console.log("coords:");
				this.display();
				Ear.deliteml(t);
				console.log("Ear:");
				Ear.display();
				formtrgl(p);
				// this.findears();
				if(chckrflx(p)&&chcktrgl(p))//checking if the removal of a coordinate made a new Ear at previous node
				{
					// if()//checking if both necessary conditions follow
					// {
						var ch=Ear.headl;
						var c=1;
						while(ch!=null)
						{
							if(ch.indexl==p.index)//checking if the prrevious node index is already present in Ear list
							{
								c=0;
								break;
							}
							ch=ch.nextl;
						}
						if(c==1){
							console.log("added");
							Ear.additeml(p.index);//updating ear list
							Ear.display();
						}
					// }
				
				}
				else{
					var ch=Ear.headl;
					while(ch!=null)
					{
						if(ch.indexl==p.index)//checking if the prrevious node index is already present in Ear list
						{
							Ear.deliteml(ch)
							break;
						}
						ch=ch.nextl;
					}
				}
				formtrgl(n);
				if(chckrflx(n)&&chcktrgl(n))//checking if the removal of a coordinate made a new Ear at next node
				{
					// if(chcktrgl(n))
					// {
						var ch=Ear.headl;
						var c=1;
						while(ch!=null)
						{
							if(ch.indexl==n.index)//checking if the next node index is already present in Ear list
							{
								c=0;
								break;
							}
							ch=ch.nextl;
						}
						if(c==1){
							console.log("added");
							Ear.additeml(n.index);//updating ear list
							Ear.display();
						}
					// }
				}
				else{
					var ch=Ear.headl;
					while(ch!=null)
					{
						if(ch.indexl==n.index)//checking if the prrevious node index is already present in Ear list
						{
							Ear.deliteml(ch);
							break;
						}
						ch=ch.nextl;
					}
				}
				t=Ear.headl;//after removing element again starting from the first node of Ear list
				temp=n.next;//making the checker equal to next node address
				count++;
			}
			else
			{
				temp=temp.next;
				continue;
			}
			t=Ear.headl;
		}
	}// void earclip(var ans[][2],int m,points Ear);
};
function start(){
	polygon=new graph;
	for(var i=0;i<n-3;i++)
	ans[i]=[];
	for(var i=0;i<cords.length;i++){
		polygon.additem(cords[i].x,cords[i].y,i);
	}
}
$("button").on("click",function(){
	const ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(cords[cords.length-1].x,cords[cords.length-1].y-80);
	ctx.lineTo(cords[0].x,cords[0].y-80);
	ctx.lineWidth=3.0;
    ctx.stroke();
    start();
	
	for(var i=0;i<ans.length;i++){
		var curr = cords[ans[i][0]]; 
		var prev = cords[ans[i][1]];
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y-80);
        // console.log(prev[0],prev[1]);
        // console.log(curr[0],curr[1]);
        ctx.lineTo(curr.x, curr.y-80);
		ctx.strokeStyle = '#ff0000';
		ctx.lineWidth=0.5;
        ctx.stroke();
	}
})