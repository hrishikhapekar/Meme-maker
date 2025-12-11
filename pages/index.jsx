import { useRef, useState, useEffect } from 'react'

// Helper: draw rounded rect path on canvas context
function roundRectPath(ctx, x, y, w, h, r){
  const radius = Math.min(r, w/2, h/2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

export default function Home(){
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const fileInputRef = useRef(null)
  const stickerFileRef = useRef(null)

  const [image, setImage] = useState(null)
  const [topText, setTopText] = useState('WHEN YOU...')
  const [bottomText, setBottomText] = useState('...REALIZE')
  const [fontSize, setFontSize] = useState(48)
  const [fontFamily, setFontFamily] = useState('Impact')
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [strokeColor, setStrokeColor] = useState('#000000')
  const [strokeWidth, setStrokeWidth] = useState(6)
  const [scaleMode, setScaleMode] = useState('contain')
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(800)

  // position state for texts and stickers
  const [topPos, setTopPos] = useState({x: 200, y: 60})
  const [bottomPos, setBottomPos] = useState({x: 200, y: 740})
  const [stickers, setStickers] = useState([]) // {id, type:'emoji'|'image', content, x,y, size}

  // rounded corners / mask
  const [rounded, setRounded] = useState(false)
  const [radius, setRadius] = useState(24)
  const [circleMask, setCircleMask] = useState(false)

  // export
  const [exportType, setExportType] = useState('png')

  // refs for bounding boxes and dragging
  const topBoxRef = useRef(null)
  const bottomBoxRef = useRef(null)
  const stickerBoxesRef = useRef({})
  const draggingRef = useRef({ active: false, which: null, id:null, offsetX:0, offsetY:0 })

  useEffect(()=>{
    draw()
    const canvas = canvasRef.current
    if(!canvas) return
    canvas.style.touchAction = 'none'
    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointermove', onPointerMove)
    return ()=>{
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointermove', onPointerMove)
    }
  },[image, topText, bottomText, fontSize, fontFamily, textColor, strokeColor, strokeWidth, width, height, topPos, bottomPos, scaleMode, stickers, rounded, radius, circleMask])

  function handleFile(e){
    const f = e.target.files?.[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = ()=>{
      imageRef.current = img
      const max = 1000
      let w = img.width
      let h = img.height
      if(Math.max(w,h) > max){
        const ratio = max / Math.max(w,h)
        w = Math.round(w * ratio)
        h = Math.round(h * ratio)
      }
      setWidth(w)
      setHeight(h)
      setTopPos({x: w/2, y: Math.max(40, fontSize + 12)})
      setBottomPos({x: w/2, y: Math.min(h - 20, h - fontSize)})
      setImage(url)
    }
    img.onerror = ()=>{ alert('Could not read image') }
    img.src = url
  }

  function handleStickerFile(e){
    const f = e.target.files?.[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = ()=>{
      const id = Date.now().toString()
      setStickers(s=>[...s,{ id, type:'image', content:img, x: width/2, y: height/2, size: Math.min(200, Math.max(64, img.width/4)) }])
    }
    img.src = url
  }

  function addEmoji(emoji){
    const id = Date.now().toString()
    setStickers(s=>[...s,{ id, type:'emoji', content:emoji, x: width/2, y: height/2, size: 72 }])
  }

  function toCanvasCoords(e){
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  function onPointerDown(e){
    const p = toCanvasCoords(e)
    // check stickers from topmost (end) to start
    for(let i = stickers.length -1; i >=0; i--){
      const s = stickers[i]
      const box = stickerBoxesRef.current[s.id]
      if(box && p.x >= box.x && p.x <= box.x + box.w && p.y >= box.y && p.y <= box.y + box.h){
        draggingRef.current = { active:true, which:'sticker', id: s.id, offsetX: p.x - box.x, offsetY: p.y - box.y }
        e.target.setPointerCapture(e.pointerId)
        return
      }
    }
    // check top box
    const tb = topBoxRef.current
    if(tb && p.x >= tb.x && p.x <= tb.x + tb.w && p.y >= tb.y && p.y <= tb.y + tb.h){
      draggingRef.current = { active: true, which: 'top', offsetX: p.x - tb.x, offsetY: p.y - tb.y }
      e.target.setPointerCapture(e.pointerId)
      return
    }
    const bb = bottomBoxRef.current
    if(bb && p.x >= bb.x && p.x <= bb.x + bb.w && p.y >= bb.y && p.y <= bb.y + bb.h){
      draggingRef.current = { active: true, which: 'bottom', offsetX: p.x - bb.x, offsetY: p.y - bb.y }
      e.target.setPointerCapture(e.pointerId)
      return
    }
  }

  function onPointerMove(e){
    if(!draggingRef.current.active) return
    const p = toCanvasCoords(e)
    const { which, id, offsetX, offsetY } = draggingRef.current
    if(which === 'top'){
      setTopPos({ x: p.x - offsetX + topBoxRef.current.w/2, y: p.y - offsetY + topBoxRef.current.h/2 })
    } else if(which === 'bottom'){
      setBottomPos({ x: p.x - offsetX + bottomBoxRef.current.w/2, y: p.y - offsetY + bottomBoxRef.current.h/2 })
    } else if(which === 'sticker'){
      setStickers(s=>s.map(st=> st.id === id ? {...st, x: p.x - offsetX + (stickerBoxesRef.current[id]?.w||0)/2, y: p.y - offsetY + (stickerBoxesRef.current[id]?.h||0)/2 } : st))
    }
  }

  function onPointerUp(e){
    if(draggingRef.current.active){
      draggingRef.current = { active:false, which:null, id:null, offsetX:0, offsetY:0 }
      try{ canvasRef.current.releasePointerCapture(e.pointerId) }catch(_){}
    }
  }

  function getTextLines(text, ctx, fontSize, fontFamily, maxWidth){
    if(!text) return []
    ctx.font = `bold ${fontSize}px ${fontFamily}, Impact, sans-serif`
    const words = text.split(' ')
    const lines = []
    let cur = ''
    for(const w of words){
      const test = cur ? cur + ' ' + w : w
      const measure = ctx.measureText(test).width
      if(measure > maxWidth && cur){
        lines.push(cur)
        cur = w
      } else cur = test
    }
    if(cur) lines.push(cur)
    return lines
  }

  function getTextBoxWidth(text, fontSize, fontFamily, maxWidth){
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = `bold ${fontSize}px ${fontFamily}, Impact, sans-serif`
    const lines = getTextLines(text, ctx, fontSize, fontFamily, maxWidth)
    let w = 0
    for(const l of lines) w = Math.max(w, ctx.measureText(l).width)
    return Math.min(maxWidth, w) + 20
  }

  function draw(){
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    ctx.clearRect(0,0,canvas.width,canvas.height)

    // draw background
    ctx.fillStyle = '#0b1220'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    // draw image with optional rounded/circle mask
    if(imageRef.current){
      const img = imageRef.current
      // compute draw region (contain or cover)
      let drawX, drawY, drawW, drawH
      if(scaleMode === 'cover'){
        const r = Math.max(canvas.width / img.width, canvas.height / img.height)
        drawW = img.width * r
        drawH = img.height * r
        drawX = (canvas.width - drawW)/2
        drawY = (canvas.height - drawH)/2
      } else {
        const r = Math.min(canvas.width / img.width, canvas.height / img.height)
        drawW = img.width * r
        drawH = img.height * r
        drawX = (canvas.width - drawW)/2
        drawY = (canvas.height - drawH)/2
      }

      ctx.save()
      if(circleMask){
        const cx = canvas.width/2, cy = canvas.height/2
        const rad = Math.min(drawW, drawH)/2
        ctx.beginPath()
        ctx.arc(cx, cy, rad, 0, Math.PI*2)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(img, drawX, drawY, drawW, drawH)
      } else if(rounded){
        roundRectPath(ctx, drawX, drawY, drawW, drawH, radius)
        ctx.clip()
        ctx.drawImage(img, drawX, drawY, drawW, drawH)
      } else {
        ctx.drawImage(img, drawX, drawY, drawW, drawH)
      }
      ctx.restore()
    }

    // draw stickers (track bounding boxes)
    stickerBoxesRef.current = {}
    for(const st of stickers){
      if(st.type === 'emoji'){
        ctx.font = `${st.size}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(st.content, st.x, st.y)
        const w = ctx.measureText(st.content).width
        const h = st.size
        stickerBoxesRef.current[st.id] = { x: st.x - w/2, y: st.y - h/2, w: w, h: h }
      } else if(st.type === 'image'){
        const img = st.content
        const s = st.size
        ctx.drawImage(img, st.x - s/2, st.y - s/2, s, s)
        stickerBoxesRef.current[st.id] = { x: st.x - s/2, y: st.y - s/2, w: s, h: s }
      }
    }

    // draw texts and compute bounding boxes
    ctx.textAlign = 'center'
    ctx.lineJoin = 'round'
    ctx.miterLimit = 2

    const drawMemeText = (text, pos, saveBoxRef)=>{
      if(!text) return
      const maxWidth = canvas.width - 40
      ctx.font = `bold ${fontSize}px ${fontFamily}, Impact, sans-serif`
      ctx.fillStyle = textColor
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = Math.max(1, strokeWidth * (fontSize/48))

      const lines = getTextLines(text, ctx, fontSize, fontFamily, maxWidth)
      const lineHeight = fontSize * 1.05
      const totalH = lines.length * lineHeight
      let startY = pos.y - totalH/2 + lineHeight/2
      for(let i=0;i<lines.length;i++){
        const y = startY + i*lineHeight
        ctx.strokeText(lines[i].toUpperCase(), pos.x + 0.5, y + 0.5)
        ctx.fillText(lines[i].toUpperCase(), pos.x, y)
      }
      const w = getTextBoxWidth(text, fontSize, fontFamily, maxWidth)
      const h = totalH
      const boxX = pos.x - w/2
      const boxY = startY - lineHeight/2
      saveBoxRef.current = { x: boxX, y: boxY, w, h }
    }

    drawMemeText(topText, topPos, topBoxRef)
    drawMemeText(bottomText, bottomPos, bottomBoxRef)
  }

  async function download(){
    const canvas = canvasRef.current
    if(!canvas) return
    if(exportType === 'png'){
      const link = document.createElement('a')
      link.download = 'meme.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } else {
      // jpeg
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
      const link = document.createElement('a')
      link.download = 'meme.jpg'
      link.href = dataUrl
      link.click()
    }
  }

  async function share(){
    if(!navigator.canShare || !navigator.canShare()){
      // some browsers do not support canShare with files; try fallback to blob URL open
    }
    const canvas = canvasRef.current
    if(!canvas) return
    const blob = await new Promise(resolve=>canvas.toBlob(resolve, exportType === 'png' ? 'image/png' : 'image/jpeg', 0.92))
    const filesArray = [new File([blob], exportType === 'png' ? 'meme.png' : 'meme.jpg', { type: blob.type })]
    if(navigator.canShare && navigator.canShare({ files: filesArray })){
      try{ await navigator.share({ files: filesArray, title: 'My Meme', text: 'Created with Meme Generator' }) }catch(err){ console.warn('Share failed', err) }
    } else {
      // fallback: open in a new tab
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
    }
  }

  function centerTop(){ setTopPos({x:width/2, y: Math.max(40, fontSize + 12)}) }
  function centerBottom(){ setBottomPos({x:width/2, y: Math.min(height - 20, height - fontSize)}) }
  function clearImage(){ setImage(null); imageRef.current = null; setStickers([]) }

  function removeSticker(id){ setStickers(s=>s.filter(x=>x.id !== id)) }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div className="h1">Meme Generator — Next.js + Canvas</div>
          <div style={{marginLeft:'auto'}} className="small">Static-ready · client-only · exportable</div>
        </div>

        <div className="controls">
          <div className="left">
            <div className="canvas-wrap">
              <canvas ref={canvasRef} style={{width:'100%',height:'auto',maxHeight:'80vh',borderRadius:8,cursor:'grab'}} />
            </div>

            <div className="canvas-controls">
              <div style={{display:'flex',gap:8}}>
                <button className="button" onClick={()=>fileInputRef.current.click()}>Upload Image</button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} />

                <button className="button" onClick={()=>stickerFileRef.current.click()}>Add Sticker Image</button>
                <input ref={stickerFileRef} type="file" accept="image/*" onChange={handleStickerFile} style={{display:'none'}} />

                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  <button className="button" onClick={()=>addEmoji('😀')}>😀</button>
                  <button className="button" onClick={()=>addEmoji('🔥')}>🔥</button>
                  <button className="button" onClick={()=>addEmoji('❤️')}>❤️</button>
                </div>

                <select value={exportType} onChange={e=>setExportType(e.target.value)} style={{padding:8,borderRadius:8}}>
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                </select>

                <button className="button" onClick={download}>Download</button>
                <button className="button" onClick={share}>Share</button>
                <button className="button" onClick={clearImage} style={{background:'#ef4444'}}>Clear</button>
              </div>
            </div>

            <div className="footer">Tip: Drag stickers or text directly on the image. Use the multi-line textareas for line breaks (press Enter). Use rounded corner or circle mask for stylized output.</div>

          </div>

          <div className="right">
            <div className="card" style={{padding:12}}>
              <div className="input-row">
                <label>Top Text</label>
                <textarea rows={3} value={topText} onChange={e=>setTopText(e.target.value)} style={{flex:1,padding:8,borderRadius:8}} />
              </div>

              <div className="input-row">
                <label>Bottom Text</label>
                <textarea rows={3} value={bottomText} onChange={e=>setBottomText(e.target.value)} style={{flex:1,padding:8,borderRadius:8}} />
              </div>

              <div className="input-row">
                <label>Font Size</label>
                <input type="number" value={fontSize} onChange={e=>setFontSize(Math.max(10,Number(e.target.value)||24))} />
              </div>

              <div className="input-row">
                <label>Font</label>
                <select value={fontFamily} onChange={e=>setFontFamily(e.target.value)}>
                  <option>Impact</option>
                  <option>Arial</option>
                  <option>Helvetica</option>
                  <option>Comic Sans MS</option>
                  <option>Times New Roman</option>
                </select>
              </div>

              <div className="input-row">
                <label>Text Color</label>
                <input type="color" value={textColor} onChange={e=>setTextColor(e.target.value)} />
              </div>

              <div className="input-row">
                <label>Stroke</label>
                <input type="color" value={strokeColor} onChange={e=>setStrokeColor(e.target.value)} />
                <input type="number" value={strokeWidth} onChange={e=>setStrokeWidth(Math.max(0,Number(e.target.value)||1))} style={{width:80}} />
              </div>

              <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
                <button className="button" onClick={centerTop}>Center Top</button>
                <button className="button" onClick={centerBottom}>Center Bottom</button>
              </div>

              <div className="input-row">
                <label>Rounded</label>
                <input type="checkbox" checked={rounded} onChange={e=>setRounded(e.target.checked)} />
                <label style={{width:80}}>Radius</label>
                <input type="number" value={radius} onChange={e=>setRadius(Number(e.target.value)||24)} style={{width:80}} />
              </div>

              <div className="input-row">
                <label>Circle Mask</label>
                <input type="checkbox" checked={circleMask} onChange={e=>setCircleMask(e.target.checked)} />
              </div>

              <div className="instructions">Stickers: upload PNG/JPG or click an emoji. Remove a sticker by clicking the "Remove" button shown next to the sticker list below.</div>

              <div style={{marginTop:10}}>
                <div style={{fontSize:13,color:'#9aa4b2',marginBottom:6}}>Stickers on canvas</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {stickers.map(s=> (
                    <div key={s.id} style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',background:'#071229',borderRadius:6}}>
                        {s.type === 'emoji' ? <div style={{fontSize:18}}>{s.content}</div> : <img src={s.content.src} style={{maxWidth:28,maxHeight:28}} />}
                      </div>
                      <div style={{flex:1,fontSize:13}}>{s.type==='emoji'? 'Emoji' : 'Image sticker'}</div>
                      <button className="button" onClick={()=>removeSticker(s.id)} style={{background:'#ef4444'}}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

    
          </div>
        </div>

      </div>
    </div>
  )
}