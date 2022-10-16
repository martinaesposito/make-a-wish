//definisco una classe per la singola particella
class Particle {
	constructor(){
		this.x = random(0,width);
		this.y = random(0,height);
		this.r 
		this.brgt
		this.alph = random(0,100);
		this.xSpeed = random(-0.5,0.5);
		this.ySpeed = random(-0.5,0.5);
	}
  
//scrivo il metodo che crea la particella
	createParticle() {
		noStroke();
		colorMode(HSB);

		fill(100,0,this.brgt,this.alph);
		circle(this.x,this.y,this.r);
	}
  
// scrivo la funziona che muove la particella
	moveParticle() {
		if (this.x < 0 || this.x > width)
//test per controllare che la particella rimanga entro i bordi della canvas
//se tocca il bordo moltiplica la velocità per -1 e inverte la direzione
			this.xSpeed*=-1;
		if (this.y < 0 || this.y > height)
			this.ySpeed*=-1;

			this.x+=this.xSpeed;
			this.y+=this.ySpeed;
	}
  
// funzione che crea connessioni tra particelle che abbiamo una certa distanza tra di loro (40)
	joinParticles(particles) {
//per ciascun elemento dell'array particles chiamo una funzione che si attua nel momento in cui la chiamo
		particles.forEach(element =>{
//definisco una variabile che calcola la distanza tra due punti dell'array
		let dis = dist(this.x,this.y,element.x,element.y);

//la distanza viene sempre calcolata e quando è inferiore a 40 allora viene disegnata una linea
		if (dis < 40) {
				strokeWeight(0.1);
				stroke(100,0,100,100);
				line(this.x,this.y,element.x,element.y)
				}
		});
	}

//funzione che illumina le particelle su cui il mouse fa hover
//la logica con cui viene chiamata è la stessa della funzione che crea la linee
	mouseParticles(particles) {
		particles.forEach(element =>{
		let disM = dist(this.x,this.y,mouseX,mouseY);

			if (disM < 40) {
				this.r = random(0,3)+4;
				this.brgt = random(0,1)+100;
			} 
			else if (disM < 80) {
				this.r = random(0,2)+2;
			} 
			else {
				this.r = random(1,2)
				}
		});
	}
}

// creo l'array delle particelle
let particles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

//numero degli elementi dell'array delle particelle cambia in base alla dimensione della canvas
	for(let i = 0; i < width/3 ;i++){
		particles.push(new Particle());
	}
}

function draw() {
	colorMode(RGB)
	background(2,2,30);

// elementi dell'array = numero di particelle definito in base alla dimensione della canvas
// per tante volte quante sono le particelle chiamo le funzioni definite nella classe
	for(let i = 0;i<particles.length;i++) {
		particles[i].createParticle();
		particles[i].moveParticle();
		particles[i].joinParticles(particles.slice(i));

		particles[i].mouseParticles(particles.slice(i));
		}
  }

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  }