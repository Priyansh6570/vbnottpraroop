// helper used by run_script batches
export async function extract(pdfjs, readFileBinary, createCanvas, saveFile, log, file, pages, outFn, maxW, maxH, quality=0.84, imgIndex=0) {
  const blob = await readFileBinary(file);
  const doc = await pdfjs.getDocument({data: new Uint8Array(await blob.arrayBuffer()), disableFontFace:true, isOffscreenCanvasSupported:false, isImageDecoderSupported:false, useSystemFonts:false}).promise;
  for (const n of pages) {
    const page = await doc.getPage(n);
    const ops = await page.getOperatorList();
    const imgs=[]; ops.fnArray.forEach((fn,i)=>{ if (fn===pdfjs.OPS.paintImageXObject) imgs.push(ops.argsArray[i][0]); });
    const objs = [];
    for (const nm of imgs) objs.push(await new Promise(res=>page.objs.get(nm, res)));
    objs.sort((a,b)=>b.width*b.height - a.width*a.height);
    const obj = objs[imgIndex] || objs[0];
    const {width:w,height:h,data,kind} = obj;
    const c = createCanvas(w,h); const ctx=c.getContext('2d');
    const id = ctx.createImageData(w,h); const d=id.data;
    if (kind===2){ for(let i=0,j=0;i<w*h;i++){ d[j]=data[i*3]; d[j+1]=data[i*3+1]; d[j+2]=data[i*3+2]; d[j+3]=255; j+=4; } }
    else if (kind===3){ d.set(data); }
    else { for(let i=0,j=0;i<w*h;i++){ d[j]=d[j+1]=d[j+2]=data[i]; d[j+3]=255; j+=4; } }
    ctx.putImageData(id,0,0);
    const s = Math.min(1, maxW/w, maxH/h);
    let out = c;
    if (s < 1) { out = createCanvas(Math.round(w*s), Math.round(h*s)); const o=out.getContext('2d'); o.imageSmoothingQuality='high'; o.drawImage(c,0,0,out.width,out.height); }
    const jb = await out.convertToBlob({type:'image/jpeg', quality});
    const name = outFn(n);
    await saveFile(name, jb);
    log(n, name, out.width+'x'+out.height, jb.size);
  }
}
