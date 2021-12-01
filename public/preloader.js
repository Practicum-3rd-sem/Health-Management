var preloader = document.createElement('div');
var loader = document.createElement('span');
var loading = document.createElement('i');
var style = document.createElement('style');
var dot = 0;
loader.innerHTML = `
<svg x="0px" y="0px" height="100" viewBox="0 0 298 53.9">
  <style>
    path { stroke-dasharray: 150, 200; stroke-dashoffset: 0; animation: lakat 4s infinite linear; }
    @keyframes lakat { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 1050; } }
  </style>
  <path stroke="#1200d7bd" stroke-width="1px" fill="none" class="st0" d="M297.5,41.2h-76.6c-0.5,0-0.9,0.4-1,0.8l-1.6,11.3l-3.1-32c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.3-1,0.8
                       l-5.3,25.5l-2.3-10.9c-0.1-0.4-0.4-0.7-0.9-0.8c-0.4,0-0.8,0.2-1,0.6l-2.3,4.8h-107c0,0,0,0,0,0H82c-1.6,0-2.2,1.1-2.2,1.6
                       l-1.6,11.3l-3.1-52c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.3-1,0.8l-9.3,45.5l-2.3-10.9c-0.1-0.4-0.4-0.7-0.9-0.8c-0.4,0-0.8,0.2-1,0.6
                       l-2.3,4.8H0.5"/>
</svg>`;

preloader.setAttribute('id', 'preloader');

style.innerHTML = `
#preloader{
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ececec;
  color: #1200d7bd;
  font-style: italic;
}`;
loading.innerHTML = 'loading';
setInterval(() => {
    if(dot > 3){
      dot = 0;
      loading.innerHTML = "Loading";
    } else {
      loading.innerHTML = loading.innerHTML + ".";
    } dot++;
}, 1000);
preloader.appendChild(loader);
preloader.appendChild(loading);
document.body.appendChild(preloader);
document.body.appendChild(style);
let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(stateCheck);
      // document.body.removeChild(preloader);
      // document.body.removeChild(style);
    }
}, 100);