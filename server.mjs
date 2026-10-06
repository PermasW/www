import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./public/',import.meta.url));
const port=Number(process.env.PORT || 3000);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const site=(process.env.SITE_URL || 'https://www.permas.com.tr').replace(/\/$/,'');
const server=http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
 res.setHeader('X-Frame-Options','DENY');res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 res.setHeader('Content-Security-Policy',"default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'");
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end('Method not allowed');}
 try{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(pathname==='/health'){res.writeHead(200,{'Content-Type':'application/json'});return res.end(req.method==='HEAD'?undefined:'{"status":"ok"}');}
 if(pathname==='/robots.txt'){res.writeHead(200,{'Content-Type':mime['.txt']});return res.end(req.method==='HEAD'?undefined:`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);}
 if(pathname==='/sitemap.xml'){const escaped=site.replace(/&/g,'&amp;').replace(/</g,'&lt;');res.writeHead(200,{'Content-Type':mime['.xml']});return res.end(req.method==='HEAD'?undefined:`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escaped}/</loc></url></urlset>`);}
 const name=pathname==='/'?'index.html':pathname==='/gizlilik'?'privacy.html':pathname.slice(1);
 const target=resolve(root,name);
 if(!target.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403);return res.end('Forbidden');}
 const info=await stat(target);if(!info.isFile())throw new Error('not file');
 const data=await readFile(target);res.writeHead(200,{'Content-Type':mime[extname(target)]||'application/octet-stream','Content-Length':data.length,'Cache-Control':extname(target)==='.html'?'no-cache':'public, max-age=3600'});res.end(req.method==='HEAD'?undefined:data);
 }catch(e){res.writeHead(e instanceof URIError?400:404,{'Content-Type':'text/plain; charset=utf-8'});res.end(req.method==='HEAD'?undefined:'Sayfa bulunamadı. Ana sayfa: /');}
});
server.listen(port,'0.0.0.0',()=>console.log(`PERMAS ready on port ${port}`));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>server.close(()=>process.exit(0)));
