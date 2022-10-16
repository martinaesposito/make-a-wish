
//CLASSI

//stelle
class Star {
	constructor(){
		this.x = random(0,width);
		this.y = random(0,height);
		this.r 
		this.brgt
		this.alph = random(0,100);
		this.xSpeed = random(-0.3,0.3);
		this.ySpeed = random(-0.3,0.3);
	}

	createStar() {
		noStroke();
		colorMode(HSB);
		fill(100,0,this.brgt,this.alph);
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
//per ciascun elemento dell'array stars chiamo una funzione che si attua nel momento in cui la chiamo
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

			if (disM < 40) {
				this.r = random(0,3)+5;
				this.brgt = random(0,1)+100
			} 
			else if (disM < 120) {
				this.r = random(0,2)+2;
			} 
			else {
				this.r = random(1,3)
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
let SmallStars = [];
let fallingstars = []

let fallingstar



//FUNZIONI

function setup() {
	createCanvas(windowWidth, windowHeight);

//stelle
	for(let i = 0; i < width/4 ;i++){
		stars.push(new Star());
	}

//stelline
	for(let i = 0; i < width ;i++){
	SmallStars.push(new SmallStar());
	}

//stelle cadenti
	fallingstar = new FallingStar(100, 100);

	for(let i = 0; i < width/50; i++){
		const randX = round(random(0, window.innerWidth));
		const randY = round(random(0, window.innerHeight));
		const randR = random(0.2, 2);
		fallingstars.push(new StarField(randX, randY, randR));
		}
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
//pianeti
	for(let i = 0;i<SmallStars.length;i++) {
		SmallStars[i].createSmallStar();
		SmallStars[i].moveSmallStar();
		}

//falling stars
//applico a tutti gli elementi dell'array la funzione draw e creo un altro array che li contiene
	fallingstars.map((element) => element.draw());

//chiamo la funziona che crea una nuova stella solo se quella già creata è uscita dalla window
	if(fallingstar.x > window.innerWidth + 100 || fallingstar.x < -100 || 
		fallingstar.y > window.innerHeight + 100) {
		fallingstar = new FallingStar(100, 100);
   		} else {
	    fallingstar.draw();
		}
}

function FallingStar(x, y) {
 
   this.x = round(random(0, window.innerWidth));
   this.xSpeed = round(random([-3,-8,3,8]));

//le stelle vengono create sempre sopra alla window e procedono verso il basso 
   this.y = -10;
   this.ySpeed = random(1, 2);
   
   this.r = round(random(3, 5));

//array contenente i valori di x, y e r dei cerchi che comporranno la coda
//la lunghezza dell'array è di max 50 elementi
   this.tail = [];
   this.tailLength = 50;

   this.draw = function(){
		fill("white");
		noStroke();
		circle(this.x, this.y, this.r);

		this.move();
		this.history();
		this.drawTail();
   		}
   
//scrivo la funzione che salva i valori x, y e r della falling star nell'array tail per generare la coda
   this.history = function() {
	    this.tail.push({x: this.x, y: this.y, r: this.r});

//se la lunghezza dell'array è più lunga di 60 elementi allora cancella il primo elemento dell'array
//questo è ciò che permette alla coda di scomparire man mano che la stella si muove
		if(this.tail.length > this.tailLength) {
			this.tail.shift(); 
			}
 		}

//disegno la coda
//per la lunghezza della coda disegno un cerchio assumendo i valori di x, y e r salvati nell'array 
   this.drawTail = function(){
	   for(i = this.tail.length - 1; i > 0; i--){
			fill("white");
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

function StarField(x, y, r) {
   this.x = x;
   this.y = y;
   this.r = r;
   
   this.draw = function(){
		circle(this.x, this.y, this.r)
		fill(255);	
		}
	}



function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  }
