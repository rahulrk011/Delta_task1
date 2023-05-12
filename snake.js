const grid=document.querySelector('.Area');
let speed=7;
let dir=1;
var wrongFood=0;
var time=15;
var seq_arr=[];
localStorage.setItem('score',0);
var sequence=document.querySelectorAll('.color');
document.querySelector('#score').innerHTML=`SCORE : 0`;
document.querySelector('#timer').innerHTML=`Timer : 25`;

const colour=['red','black','blue','green'];
var gamestatus=1;

if(!localStorage.getItem('hs')){
    localStorage.setItem('hs',0);
}
var hs=localStorage.getItem('hs')
document.querySelector('#Hiscore').innerHTML=`Highscore : ${hs}`;

setInterval(() => {
    if(gamestatus==1)
        time--;
    console.log(time);
    document.querySelector('#timer').innerHTML=`Timer : ${time}`;
},1000);

for(let i=0;i<20;i++){
    for(let j=0;j<20;j++){
        const cell=document.createElement('div');
        cell.dataset.x=j;
        cell.dataset.y=i;
        cell.classList.add('cell');
        grid.appendChild(cell);

    }
}    
//varibles
let head={'x':2,'y':0};
let body={'x':1,'y':0};
let tail={'x':0,'y':0};
let segment=[head,body,tail];

let lastframetime=0;

// fps
function fps(ctime){
    
    if((head.x<0 || head.x>19)||(head.y<0 || head.y>19)){

       if(!alert(`OhhOhh You HIT the WALL !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
        
    }
    return;
}if(wrongFood==1){

    if(!alert(`OhhOhh You have picked the WRONG FOOD !! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
     window.location.reload();
 }
 return;
}
if(time==0){

    if(!alert(`OhhOhh You have RUN OUT of TIME!! \nYOUR SCORE IS ${localStorage.getItem('score')}`)){
     window.location.reload();
 }
 return;
}
    

    window.requestAnimationFrame(fps);
    
    if ((ctime-lastframetime)/1000 > 1/speed){
        lastframetime=ctime;
        if(gamestatus==1)
            main_logic();
    }
}






var arr=[];

function main_logic(){
    if(arr.length==0){
        time=time+10;
        generateFood();
        var foods=document.querySelectorAll('.food');
        for(let i=foods.length;i--;arr.unshift(foods[i]));
        let k=Math.floor(Math.random()*4);
        for(let j=0;j<4;j++){
            sequence[j].style.backgroundColor=colour[(j+k)%4];
            sequence[j].style.margin=0;
            sequence[j].style.borderColor='black'
        }
        for(let i=sequence.length;i--;seq_arr.unshift(sequence[i]));
    }
    
    let it=grid.querySelector(`[data-x="${tail.x}"][data-y="${tail.y}"]`);
    it.classList.remove('snake');
    let a=head.x;
    let b=head.y;

    tail.x=body.x;tail.y=body.y
    body.x=a;body.y=b;
    switch(dir){
        case 1:
            head.x++;
            break;
        case -1:
            head.x--;
            break;
        case 2:
            head.y--;
            break;
        case -2:
            head.y++;
            break;
    }
    
    segment.forEach(s=>{
        let item=grid.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
        item.classList.add('snake');
    }
    )
    checkScore();   
}

        segment.forEach(s=>{
            let item=grid.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
            item.classList.add('snake');
        }
        )
        fps()


updatingPosition();

function updatingPosition(){
    document.addEventListener("keydown", function(event) {
        if (event.key == "ArrowLeft" && dir!=1){
           dir=-1;
        } else if (event.key == "ArrowUp" && dir!=-2){
           dir=2;
        } else if (event.key == "ArrowRight" && dir!=-1){
           dir=1;
        } else if (event.key == "ArrowDown" && dir!=2){
           dir=-2;
        }
})
}


// For Food
function generateFood(){

for(let i = 0; i < 4; i++){
    let x1 = Math.floor(Math.random() * 20);
    let y1 = Math.floor(2+Math.random() * 17);
    let food = grid.querySelector(`[data-x="${x1}"][data-y="${y1}"]`);
    food.style.backgroundColor = colour[i];
    food.classList.add('food');     
}
}

//Score Update
function checkScore(){

arr.forEach(s=>{
    if(s.dataset.x==head.x && s.dataset.y==head.y){
        if(seq_arr[0].style.backgroundColor==s.style.backgroundColor){
        s.classList.remove('food');
        s.removeAttribute('style');
        let index=arr.indexOf(s);
        console.log(seq_arr);
        seq_arr[0].style.margin='0.8vmin';
        seq_arr[0].style.borderColor='white';
        seq_arr.splice(0,1);
        if(index>-1){
            arr.splice(index,1);
        }
        let sc=localStorage.getItem('score');
        sc++;
        document.querySelector('#score').innerHTML=`SCORE : ${sc}`;
        localStorage.setItem('score',sc); 
        
        if(sc>hs){
            localStorage.setItem('hs',sc);
            document.querySelector('#Hiscore').innerHTML=`Highscore : ${sc}`
        }else{
            localStorage.setItem('hs',hs);
        }
    }
    else{
        wrongFood=1;
    }

}
})
}
window.addEventListener('keydown',function(event){
    let key=event.key;
    if(key=='Escape'){
        if(gamestatus==1){
            gamestatus=0
        }else{
            gamestatus=1;
        }
    }

}
)
//On-screen keyboard
document.querySelector('.up').onclick = function(){
    if(dir!=2 && dir!=-2){
        dir=2;
    }
}
document.querySelector('.right').onclick = function(){
    if(dir!=1 && dir!=-1){
        dir=1;
    }
}
document.querySelector('.down').onclick = function(){
    if(dir!=-2 && dir!=2){
        dir=-2;
    }
}
document.querySelector('.left').onclick = function(){
    if(dir!=-1 && dir!=1){
        dir=-1;
    }
}









