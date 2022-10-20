
//CLASSI

//stelle
class Star {
	constructor(){
		this.x = random(0,width);
		this.y = random(0,height);
		this.r 

		this.hue = 0;
		this.brgt = random(90,100);
		this.sat = random(0,10)
		this.alph = random(0,100);

		this.xSpeed = random(-0.3,0.3);
		this.ySpeed = random(-0.3,0.3);
	}

	createStar() {
		noStroke();
		colorMode(HSB,360,100,100,100);
		fill(this.hue,this.sat,this.brgt,this.alph);
		circle(this.x,this.y,this.r);
	}
  
	moveStar() {
		if (this.x < 0 || this.x > width)
//test per controllare che la stella rimanga entro i bordi della canvas
//se tocca il bordo moltiplica la velocità per -1 e inverte la direzione
			this.xSpeed*=-1;
		if (this.y < 0 || this.y > height)
			this.ySpeed*=-1;

			this.x+=this.xSpeed;
			this.y+=this.ySpeed;
	}
  
// funzione che crea connessioni tra particelle che abbiamo una certa distanza tra di loro (40)
	joinStars(stars) {
//per ciascun elemento dell'array stars chiamo una funzione 
		stars.forEach(element =>{
//definisco una variabile che calcola la distanza tra due punti dell'array
		let dis = dist(this.x,this.y,element.x,element.y);

//la distanza viene sempre calcolata e quando è inferiore a 40 allora viene disegnata una linea
		if (dis < 40) {
				strokeWeight(0.15);
				stroke(100,0,100,100);
				line(this.x,this.y,element.x,element.y)
				}
		});
	}

//funzione che illumina le particelle su cui il mouse fa hover
//la logica con cui viene chiamata è la stessa della funzione che crea la linee
	mouseStars(stars) {
		stars.forEach(element =>{
		let disM = dist(this.x,this.y,mouseX,mouseY);

			if (disM < 30) {
				this.r = random(1,3)+5;
				
				this.brgt = random(0,10)+90;
				
				this.alph = random(90,100);
			} 
			else if (disM < 150) {
				this.r = random(1,3)+2;

				this.hue = random(35,40)
				this.sat = random(0, 50)
			} 
			else {
				this.r = random(1,3)+1;
				}
		});
	}
}


//stelline
class SmallStar {
	constructor(x, y) {
		this.x = random(0,width);
		this.y = random(0,height);
		this.r = random(0.1, 1.5);
		this.xSpeed = random(-0.5, 0.5);
		this.ySpeed = random(-0.5, 0.5);
		}
  
	createSmallStar() {
		noStroke();
		fill("white");
		circle(this.x,this.y,this.r);
		}

	moveSmallStar() {
		if (this.x < 0 || this.x > width)
			this.xSpeed*=-1;
		if (this.y < 0 || this.y > height)
			this.ySpeed*=-1;

			this.x+=this.xSpeed;
			this.y+=this.ySpeed;
		}
	}	



//ARRAY E VARIABILI GLOBALI

let stars = [];
let smallstars = [];
let fallingstars = []

let fallingstar


//FUNZIONI

function setup() {
	createCanvas(windowWidth, windowHeight);

//stelle
	for(let i = 0; i < width/3 ;i++){
		stars.push(new Star());
	}

//stelline
	for(let i = 0; i < width ;i++){
	smallstars.push(new SmallStar());
	}

//stelle cadenti
	fallingstar = new FallingStar(100, 100);
}


function draw() {	
	colorMode(RGB)
	background(2,2,30);

//stelle
	for(let i = 0;i<stars.length;i++) {
		stars[i].createStar();
		stars[i].moveStar();
		stars[i].joinStars(stars.slice(i));
		stars[i].mouseStars(stars.slice(i));
		}
//stelline
	for(let i = 0;i<smallstars.length;i++) {
		smallstars[i].createSmallStar();
		smallstars[i].moveSmallStar();
		}

//falling stars
//per ciascun elemento dell'array stars chiamo una funzione 
	fallingstars.map((element) => element.draw());

//chiamo la funziona che crea una nuova stella cadente solo se quella già creata è uscita dalla window
	if (fallingstar.x > window.innerWidth + 100 || fallingstar.x < -100 || 
		fallingstar.y > window.innerHeight + 100) {
		fallingstar = new FallingStar(100, 100);
   		} else {
	    fallingstar.draw();
		}
}		


//definisco il constructor che crea le stelle cadenti
//this. indica un valore nullo dell'oggetto nel momento in cui viene creato
// man mano che viene eseguita la funzione le sue properties assumono dei valori 
function FallingStar(x, y) {
 
   this.x = round(random(0, window.innerWidth));
   this.xSpeed = round(random([-4,-1,1,4]));

//le stelle vengono create sempre sopra alla window e procedono verso il basso 
   this.y = -10;
   this.ySpeed = random(2, 4);
   
   this.r = round(random(4, 8));

	this.startColor = "#fce1b4";
	this.endColor = "white"

//array contenente i valori di x, y e r dei cerchi che comporranno la coda
//la lunghezza dell'array è di max 50 elementi
   this.tail = [];
   this.tailLength = 50;

   this.draw = function(){
		fill(this.startColor);
		noStroke();
		circle(this.x, this.y, this.r);

		this.move();
		this.history();
		this.drawTail();
   		}
   
//scrivo la funzione che salva i valori x, y e r della falling star nell'array tail per generare la coda
   this.history = function() {
	    this.tail.push({x: this.x, y: this.y, r: this.r});

//se la lunghezza dell'array è più lunga di 50 elementi allora cancella il primo elemento dell'array
//questo è ciò che permette alla coda di scomparire man mano che la stella si muove
		if(this.tail.length > this.tailLength) {
			this.tail.shift(); 
			}
 		}

//disegno la coda
//per la lunghezza della coda disegno un cerchio assumendo i valori di x, y e r salvati nell'array nella posizione i-1
   this.drawTail = function(){
	
//libreria di javascript chroma.js mi permette di attribuire diverse proprietà al colore
		let colorScale = chroma
			.scale([this.endColor, this.startColor])
			.colors(this.tail.length);

	   for(i = this.tail.length - 1; i > 0; i--){
			fill(colorScale[i]);
			noStroke();
			circle(this.tail[i].x, this.tail[i].y, this.tail[i].r);
		   
//variabile corrispondente alla r dei cerchi componenti la coda della stella
//la dimensione è inversamente proporzionale alla posizione nell'array
			const radiusReducer = this.tail[i].r / this.tailLength*2;
			this.tail[i].r -= radiusReducer;
			}
		}
   
   this.move = function(){
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		}
	}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  }