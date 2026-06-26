const mapa=document.querySelector('.mapa');
for(let rua=70;rua<=106;rua++){
 if(rua===89||rua===90)continue;
 const div=document.createElement('div');
 div.className='rua';
 div.innerHTML=`<h3>${rua}</h3><div class="enderecos"></div>`;
 const end=div.querySelector('.enderecos');
 for(let i=0;i<180;i++){
  const p=document.createElement('div');
  p.className='posicao';
  const cores=['#43d854','#ffffff','#ffc107','#ff3030','#2979ff'];
  p.style.background=cores[Math.floor(Math.random()*cores.length)];
  p.onclick=()=>document.querySelector('.detalhes h1').innerText=`${rua}.${100+i}.1.1`;
  end.appendChild(p);
 }
 mapa.appendChild(div);
}