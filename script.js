// Services
const services = [
  { icon: 'fas fa-laptop-code', name: "Website Development", description: "Responsive websites tailored to your business." },
  { icon: 'fas fa-palette', name: "UI/UX Design", description: "Modern and user-friendly interface design." },
  { icon: 'fas fa-search', name: "SEO Optimization", description: "Improve your website visibility on search engines." },
  { icon: 'fas fa-tools', name: "Maintenance & Support", description: "Keep your website secure and up-to-date." }
];
const servicesContainer = document.getElementById('services-container');
services.forEach(service => {
  const card = document.createElement('div');
  card.classList.add('service-card');
  card.innerHTML = `<i class="${service.icon}"></i><h3>${service.name}</h3><p>${service.description}</p>`;
  servicesContainer.appendChild(card);
});

// Contact Form
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formMessage.textContent = "Thank you! Your message has been sent.";
  contactForm.reset();
});

// Scroll fade-in
window.addEventListener('scroll', () => {
  document.querySelectorAll('.glass-section').forEach(section => {
    const top = section.getBoundingClientRect().top;
    const height = window.innerHeight;
    if (top < height - 100) section.classList.add('fade-in');
  });
});

// Nav highlight
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 100;
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) link.classList.add('active');
    else link.classList.remove('active');
  });
});

// Particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
for(let i=0;i<100;i++){
  particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r: Math.random()*3+1, dx:(Math.random()-0.5)*0.5, dy:(Math.random()-0.5)*0.5});
}
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(85,107,47,0.2)";
    ctx.fill();
    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});

// Blobs mouse-follow & float
const blobs = document.querySelectorAll('.blob');
document.addEventListener('mousemove', (e)=>{
  const mouseX=e.clientX, mouseY=e.clientY;
  blobs.forEach((blob,index)=>{
    const speed=(index+1)*0.02;
    const offsetX=(mouseX-window.innerWidth/2)*speed;
    const offsetY=(mouseY-window.innerHeight/2)*speed;
    blob.style.transform=`translate(${offsetX}px,${offsetY}px)`;
  });
});
function floatBlobs(){
  blobs.forEach((blob,index)=>{
    const t=Date.now()*0.0003*(index+1);
    const x=50*Math.sin(t), y=50*Math.cos(t);
    const current=blob.style.transform||'';
    blob.style.transform=`${current} translate(${x}px,${y}px)`;
  });
  requestAnimationFrame(floatBlobs);
}
floatBlobs();

// SVG Waves dynamic
const waves=[
  { path: document.querySelector("#wave1 path"), amplitude:20, frequency:0.002, phase:0 },
  { path: document.querySelector("#wave2 path"), amplitude:25, frequency:0.0015, phase:100 }
];
function animateWaves(){
  const width=window.innerWidth;
  const time=Date.now();
  waves.forEach(wave=>{
    const {path, amplitude, frequency, phase}=wave;
    const yOffset=(i)=>Math.sin(i*frequency*100+time*0.002+phase)*amplitude+50;
    let d=`M0,${yOffset(0)}`;
    for(let i=0;i<=width;i+=10){
      d+=` L${i},${yOffset(i)}`;
    }
    d+=` L${width},100 L0,100 Z`;
    path.setAttribute("d",d);
  });
  requestAnimationFrame(animateWaves);
}
animateWaves();

// Parallax waves on scroll
window.addEventListener("scroll",()=>{
  const scrollY=window.scrollY;
  waves.forEach((wave,index)=>{
    wave.path.parentElement.style.transform=`translateY(${scrollY*(0.02+index*0.01)}px)`;
  });
});
// script.js placeholder
