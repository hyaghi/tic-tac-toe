(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))u(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&u(f)}).observe(document,{childList:!0,subtree:!0});function s(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function u(n){if(n.ep)return;n.ep=!0;const c=s(n);fetch(n.href,c)}})();document.querySelector(".board");const a=document.querySelectorAll(".cell"),l=document.querySelector(".status"),y=document.querySelector(".reset");let r="X",o=["","","","","","","","",""],i=!0;const d=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];function p(){for(let e=0;e<d.length;e++){const[t,s,u]=d[e];if(o[t]&&o[t]===o[s]&&o[t]===o[u])return o[t]}return null}function g(){return!o.includes("")}function x(e){const t=e.target.dataset.index;o[t]!==""||!i||r!=="X"||(o[t]=r,e.target.textContent=r,e.target.classList.add(r),h(),i&&(m(),C()))}function C(){if(!i||r!=="O")return;let e=[];for(let t=0;t<o.length;t++)o[t]===""&&e.push(t);if(e.length>0){const t=Math.floor(Math.random()*e.length),s=e[t];o[s]=r,a[s].textContent=r,a[s].classList.add(r),h(),i&&m()}}function m(){r=r==="X"?"O":"X",l.textContent=`Player ${r}'s turn`}function h(){const e=p();e?(l.textContent=`Player ${e} wins!`,i=!1):g()&&(l.textContent="It's a draw!",i=!1)}function L(){r="X",o=["","","","","","","","",""],i=!0,l.textContent=`Player ${r}'s turn`,a.forEach(e=>{e.textContent="",e.classList.remove("X","O")})}a.forEach(e=>e.addEventListener("click",x));y.addEventListener("click",L);l.textContent=`Player ${r}'s turn`;
