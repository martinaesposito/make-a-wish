//definisco una classe per la singola particella
class Particle {
	constructor(){
	this.x = random(0,width);
	this.y = random(0,height);
	this.r = random(0.1,2);
	this.xSpeed = random(-1,1);
	this.ySpeed = random(-1,1);
	}
  
  // scrivo la funzione che crea la particella
	createParticle() {
	noStroke();
	colorMode(HSB);

	let brgt = random(1,100)
	fill(100,0,brgt*frameRate);

	circle(this.x,this.y,this.r);
	}
  
  // scrivo la funziona che muove la particella
	moveParticle() {
	if(this.x < 0 || this.x > width)
	//se la posizione della particella è dentro la canvas
	  this.xSpeed*=-1;
	if(this.y < 0 || this.y > height)
	  this.ySpeed*=-1;
  
	this.x+=this.xSpeed;
	this.y+=this.ySpeed;
	}
  
  // funzione che crea connessioni tra particelle che abbiamo una certa distanza tra di loro (85)
	joinParticles(particles) {
		//per ciascun elemento dell'array particles
	particles.forEach(element =>{
	  let dis = dist(this.x,this.y,element.x,element.y);
	  if(dis< 40) {
	  stroke('rgba(255,255,255,0.08)');
	  line(this.x,this.y,element.x,element.y);
	  }
	});
	}
  }

  // creo l'array delle particelle
  let particles = [];
  
  function setup() {
	createCanvas(windowWidth, windowHeight);
	  
	for(let i = 0; i<width/2 ;i++){
	particles.push(new Particle());
	}
	
  }
  
  function draw() {
	push()
	colorMode(RGB)
	background(2,2,30);
	pop()

	for(let i = 0;i<particles.length;i++) {
	particles[i].createParticle();
	particles[i].moveParticle();
	particles[i].joinParticles(particles.slice(i));
	}
	
  }

  function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
  print(" windowinfo width: " + width + " height: " + height + " windowWidth " + windowWidth + " windowHeight " + windowHeight);
}