import {access,readFile,readdir} from "node:fs/promises";
import {dirname,join,resolve} from "node:path";
import {fileURLToPath} from "node:url";

const root=join(dirname(fileURLToPath(import.meta.url)),".."),out=join(root,"dist"),files=[],fail=[];
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())await walk(p);else if(e.name.endsWith(".html"))files.push(p)}}await walk(out);
for(const file of files){const html=await readFile(file,"utf8");for(const required of ["<title>",'name="description"','rel="canonical"','lang="','id="main"'])if(!html.includes(required))fail.push(`${file}: missing ${required}`);for(const m of html.matchAll(/(?:src|href)="(\/gateway-qualifications-entry-level-award-in-esol-skills-for-life-reading-web\/[^"?#]+)"/g)){const rel=m[1].replace("/gateway-qualifications-entry-level-award-in-esol-skills-for-life-reading-web/","");if(/^(en|assets)\//.test(rel)){let target=resolve(out,rel);if(!target.includes("."))target=join(target,"index.html");try{await access(target)}catch{fail.push(`${file}: broken ${m[1]}`)}}}}
for(const p of ["index.html","404.html","sitemap.xml","robots.txt",".nojekyll","en/index.html"])try{await access(join(out,p))}catch{fail.push(`missing ${p}`)}
if(files.length!==21)fail.push(`expected 21 HTML, found ${files.length}`);
const combined=(await Promise.all(files.map(f=>readFile(f,"utf8")))).join("\n");
for(const required of ["app.mcyj.examprep.glb2464","id6801917236","601/5416/0","M/506/8491","4 reading tasks","One hour · supervised","6 credits · 60 GLH","Google Play · Coming soon","not affiliated with, approved by or endorsed by Gateway Qualifications"])if(!combined.toLowerCase().includes(required.toLowerCase()))fail.push(`missing ${required}`);
for(const forbidden of ["play.google.com/store/apps/details?id=app.mcyj.examprep.glb2464","Series 63","NASAA","Ordningsvakt","Google Play is public"])if(combined.includes(forbidden))fail.push(`stale or unverified content found: ${forbidden}`);
const sitemap=await readFile(join(out,"sitemap.xml"),"utf8");if((sitemap.match(/<url>/g)||[]).length!==19)fail.push("sitemap must contain 19 routes");
const css=await readFile(join(out,"assets","styles.css"),"utf8");if(!css.includes("word-break:keep-all"))fail.push("keep-all rule missing");if(!css.includes("store-badge-frame-sync"))fail.push("Store badge frame rule missing");if(!css.includes("width:194px")||!css.includes("height:75px"))fail.push("194x75 Store frame missing");
if(fail.length){console.error(fail.join("\n"));process.exit(1)}console.log(`Checked ${files.length} HTML files; metadata, links, official facts, Store identity, keep-all and equal badge frames passed.`);
