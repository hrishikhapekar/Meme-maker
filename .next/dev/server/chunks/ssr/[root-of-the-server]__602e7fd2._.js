module.exports = [
"[project]/pages/index.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
// Helper: draw rounded rect path on canvas context
function roundRectPath(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
}
function Home() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const imageRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const stickerFileRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [image, setImage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [topText, setTopText] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('WHEN YOU...');
    const [bottomText, setBottomText] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('...REALIZE');
    const [fontSize, setFontSize] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(48);
    const [fontFamily, setFontFamily] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('Impact');
    const [textColor, setTextColor] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('#FFFFFF');
    const [strokeColor, setStrokeColor] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('#000000');
    const [strokeWidth, setStrokeWidth] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(6);
    const [scaleMode, setScaleMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('contain');
    const [width, setWidth] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(800);
    const [height, setHeight] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(800);
    // position state for texts and stickers
    const [topPos, setTopPos] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        x: 200,
        y: 60
    });
    const [bottomPos, setBottomPos] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        x: 200,
        y: 740
    });
    const [stickers, setStickers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]) // {id, type:'emoji'|'image', content, x,y, size}
    ;
    // rounded corners / mask
    const [rounded, setRounded] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [radius, setRadius] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(24);
    const [circleMask, setCircleMask] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // export
    const [exportType, setExportType] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('png');
    // refs for bounding boxes and dragging
    const topBoxRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const bottomBoxRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const stickerBoxesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])({});
    const draggingRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])({
        active: false,
        which: null,
        id: null,
        offsetX: 0,
        offsetY: 0
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        draw();
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.style.touchAction = 'none';
        canvas.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointermove', onPointerMove);
        return ()=>{
            canvas.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointermove', onPointerMove);
        };
    }, [
        image,
        topText,
        bottomText,
        fontSize,
        fontFamily,
        textColor,
        strokeColor,
        strokeWidth,
        width,
        height,
        topPos,
        bottomPos,
        scaleMode,
        stickers,
        rounded,
        radius,
        circleMask
    ]);
    function handleFile(e) {
        const f = e.target.files?.[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = ()=>{
            imageRef.current = img;
            const max = 1000;
            let w = img.width;
            let h = img.height;
            if (Math.max(w, h) > max) {
                const ratio = max / Math.max(w, h);
                w = Math.round(w * ratio);
                h = Math.round(h * ratio);
            }
            setWidth(w);
            setHeight(h);
            setTopPos({
                x: w / 2,
                y: Math.max(40, fontSize + 12)
            });
            setBottomPos({
                x: w / 2,
                y: Math.min(h - 20, h - fontSize)
            });
            setImage(url);
        };
        img.onerror = ()=>{
            alert('Could not read image');
        };
        img.src = url;
    }
    function handleStickerFile(e) {
        const f = e.target.files?.[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = ()=>{
            const id = Date.now().toString();
            setStickers((s)=>[
                    ...s,
                    {
                        id,
                        type: 'image',
                        content: img,
                        x: width / 2,
                        y: height / 2,
                        size: Math.min(200, Math.max(64, img.width / 4))
                    }
                ]);
        };
        img.src = url;
    }
    function addEmoji(emoji) {
        const id = Date.now().toString();
        setStickers((s)=>[
                ...s,
                {
                    id,
                    type: 'emoji',
                    content: emoji,
                    x: width / 2,
                    y: height / 2,
                    size: 72
                }
            ]);
    }
    function toCanvasCoords(e) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }
    function onPointerDown(e) {
        const p = toCanvasCoords(e);
        // check stickers from topmost (end) to start
        for(let i = stickers.length - 1; i >= 0; i--){
            const s = stickers[i];
            const box = stickerBoxesRef.current[s.id];
            if (box && p.x >= box.x && p.x <= box.x + box.w && p.y >= box.y && p.y <= box.y + box.h) {
                draggingRef.current = {
                    active: true,
                    which: 'sticker',
                    id: s.id,
                    offsetX: p.x - box.x,
                    offsetY: p.y - box.y
                };
                e.target.setPointerCapture(e.pointerId);
                return;
            }
        }
        // check top box
        const tb = topBoxRef.current;
        if (tb && p.x >= tb.x && p.x <= tb.x + tb.w && p.y >= tb.y && p.y <= tb.y + tb.h) {
            draggingRef.current = {
                active: true,
                which: 'top',
                offsetX: p.x - tb.x,
                offsetY: p.y - tb.y
            };
            e.target.setPointerCapture(e.pointerId);
            return;
        }
        const bb = bottomBoxRef.current;
        if (bb && p.x >= bb.x && p.x <= bb.x + bb.w && p.y >= bb.y && p.y <= bb.y + bb.h) {
            draggingRef.current = {
                active: true,
                which: 'bottom',
                offsetX: p.x - bb.x,
                offsetY: p.y - bb.y
            };
            e.target.setPointerCapture(e.pointerId);
            return;
        }
    }
    function onPointerMove(e) {
        if (!draggingRef.current.active) return;
        const p = toCanvasCoords(e);
        const { which, id, offsetX, offsetY } = draggingRef.current;
        if (which === 'top') {
            setTopPos({
                x: p.x - offsetX + topBoxRef.current.w / 2,
                y: p.y - offsetY + topBoxRef.current.h / 2
            });
        } else if (which === 'bottom') {
            setBottomPos({
                x: p.x - offsetX + bottomBoxRef.current.w / 2,
                y: p.y - offsetY + bottomBoxRef.current.h / 2
            });
        } else if (which === 'sticker') {
            setStickers((s)=>s.map((st)=>st.id === id ? {
                        ...st,
                        x: p.x - offsetX + (stickerBoxesRef.current[id]?.w || 0) / 2,
                        y: p.y - offsetY + (stickerBoxesRef.current[id]?.h || 0) / 2
                    } : st));
        }
    }
    function onPointerUp(e) {
        if (draggingRef.current.active) {
            draggingRef.current = {
                active: false,
                which: null,
                id: null,
                offsetX: 0,
                offsetY: 0
            };
            try {
                canvasRef.current.releasePointerCapture(e.pointerId);
            } catch (_) {}
        }
    }
    function getTextLines(text, ctx, fontSize, fontFamily, maxWidth) {
        if (!text) return [];
        ctx.font = `bold ${fontSize}px ${fontFamily}, Impact, sans-serif`;
        const words = text.split(' ');
        const lines = [];
        let cur = '';
        for (const w of words){
            const test = cur ? cur + ' ' + w : w;
            const measure = ctx.measureText(test).width;
            if (measure > maxWidth && cur) {
                lines.push(cur);
                cur = w;
            } else cur = test;
        }
        if (cur) lines.push(cur);
        return lines;
    }
    function getTextBoxWidth(text, fontSize, fontFamily, maxWidth) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `bold ${fontSize}px ${fontFamily}, Impact, sans-serif`;
        const lines = getTextLines(text, ctx, fontSize, fontFamily, maxWidth);
        let w = 0;
        for (const l of lines)w = Math.max(w, ctx.measureText(l).width);
        return Math.min(maxWidth, w) + 20;
    }
    function draw() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw background
        ctx.fillStyle = '#0b1220';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // draw image with optional rounded/circle mask
        if (imageRef.current) {
            const img = imageRef.current;
            // compute draw region (contain or cover)
            let drawX, drawY, drawW, drawH;
            if (scaleMode === 'cover') {
                const r = Math.max(canvas.width / img.width, canvas.height / img.height);
                drawW = img.width * r;
                drawH = img.height * r;
                drawX = (canvas.width - drawW) / 2;
                drawY = (canvas.height - drawH) / 2;
            } else {
                const r = Math.min(canvas.width / img.width, canvas.height / img.height);
                drawW = img.width * r;
                drawH = img.height * r;
                drawX = (canvas.width - drawW) / 2;
                drawY = (canvas.height - drawH) / 2;
            }
            ctx.save();
            if (circleMask) {
                const cx = canvas.width / 2, cy = canvas.height / 2;
                const rad = Math.min(drawW, drawH) / 2;
                ctx.beginPath();
                ctx.arc(cx, cy, rad, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(img, drawX, drawY, drawW, drawH);
            } else if (rounded) {
                roundRectPath(ctx, drawX, drawY, drawW, drawH, radius);
                ctx.clip();
                ctx.drawImage(img, drawX, drawY, drawW, drawH);
            } else {
                ctx.drawImage(img, drawX, drawY, drawW, drawH);
            }
            ctx.restore();
        }
        // draw stickers (track bounding boxes)
        stickerBoxesRef.current = {};
        for (const st of stickers){
            if (st.type === 'emoji') {
                ctx.font = `${st.size}px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(st.content, st.x, st.y);
                const w = ctx.measureText(st.content).width;
                const h = st.size;
                stickerBoxesRef.current[st.id] = {
                    x: st.x - w / 2,
                    y: st.y - h / 2,
                    w: w,
                    h: h
                };
            } else if (st.type === 'image') {
                const img = st.content;
                const s = st.size;
                ctx.drawImage(img, st.x - s / 2, st.y - s / 2, s, s);
                stickerBoxesRef.current[st.id] = {
                    x: st.x - s / 2,
                    y: st.y - s / 2,
                    w: s,
                    h: s
                };
            }
        }
        // draw texts and compute bounding boxes
        ctx.textAlign = 'center';
        ctx.lineJoin = 'round';
        ctx.miterLimit = 2;
        const drawMemeText = (text, pos, saveBoxRef)=>{
            if (!text) return;
            const maxWidth = canvas.width - 40;
            ctx.font = `bold ${fontSize}px ${fontFamily}, Impact, sans-serif`;
            ctx.fillStyle = textColor;
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = Math.max(1, strokeWidth * (fontSize / 48));
            const lines = getTextLines(text, ctx, fontSize, fontFamily, maxWidth);
            const lineHeight = fontSize * 1.05;
            const totalH = lines.length * lineHeight;
            let startY = pos.y - totalH / 2 + lineHeight / 2;
            for(let i = 0; i < lines.length; i++){
                const y = startY + i * lineHeight;
                ctx.strokeText(lines[i].toUpperCase(), pos.x + 0.5, y + 0.5);
                ctx.fillText(lines[i].toUpperCase(), pos.x, y);
            }
            const w = getTextBoxWidth(text, fontSize, fontFamily, maxWidth);
            const h = totalH;
            const boxX = pos.x - w / 2;
            const boxY = startY - lineHeight / 2;
            saveBoxRef.current = {
                x: boxX,
                y: boxY,
                w,
                h
            };
        };
        drawMemeText(topText, topPos, topBoxRef);
        drawMemeText(bottomText, bottomPos, bottomBoxRef);
    }
    async function download() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (exportType === 'png') {
            const link = document.createElement('a');
            link.download = 'meme.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } else {
            // jpeg
            const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
            const link = document.createElement('a');
            link.download = 'meme.jpg';
            link.href = dataUrl;
            link.click();
        }
    }
    async function share() {
        if (!navigator.canShare || !navigator.canShare()) {
        // some browsers do not support canShare with files; try fallback to blob URL open
        }
        const canvas = canvasRef.current;
        if (!canvas) return;
        const blob = await new Promise((resolve)=>canvas.toBlob(resolve, exportType === 'png' ? 'image/png' : 'image/jpeg', 0.92));
        const filesArray = [
            new File([
                blob
            ], exportType === 'png' ? 'meme.png' : 'meme.jpg', {
                type: blob.type
            })
        ];
        if (navigator.canShare && navigator.canShare({
            files: filesArray
        })) {
            try {
                await navigator.share({
                    files: filesArray,
                    title: 'My Meme',
                    text: 'Created with Meme Generator'
                });
            } catch (err) {
                console.warn('Share failed', err);
            }
        } else {
            // fallback: open in a new tab
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        }
    }
    function centerTop() {
        setTopPos({
            x: width / 2,
            y: Math.max(40, fontSize + 12)
        });
    }
    function centerBottom() {
        setBottomPos({
            x: width / 2,
            y: Math.min(height - 20, height - fontSize)
        });
    }
    function clearImage() {
        setImage(null);
        imageRef.current = null;
        setStickers([]);
    }
    function removeSticker(id) {
        setStickers((s)=>s.filter((x)=>x.id !== id));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "container",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "h1",
                            children: "Meme Generator — Next.js + Canvas"
                        }, void 0, false, {
                            fileName: "[project]/pages/index.jsx",
                            lineNumber: 344,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                marginLeft: 'auto'
                            },
                            className: "small",
                            children: "Static-ready · client-only · exportable"
                        }, void 0, false, {
                            fileName: "[project]/pages/index.jsx",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/index.jsx",
                    lineNumber: 343,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "controls",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "canvas-wrap",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("canvas", {
                                        ref: canvasRef,
                                        style: {
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '80vh',
                                            borderRadius: 8,
                                            cursor: 'grab'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 351,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.jsx",
                                    lineNumber: 350,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "canvas-controls",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "button",
                                                onClick: ()=>fileInputRef.current.click(),
                                                children: "Upload Image"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                ref: fileInputRef,
                                                type: "file",
                                                accept: "image/*",
                                                onChange: handleFile,
                                                style: {
                                                    display: 'none'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "button",
                                                onClick: ()=>stickerFileRef.current.click(),
                                                children: "Add Sticker Image"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                ref: stickerFileRef,
                                                type: "file",
                                                accept: "image/*",
                                                onChange: handleStickerFile,
                                                style: {
                                                    display: 'none'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 360,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: 6,
                                                    alignItems: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "button",
                                                        onClick: ()=>addEmoji('😀'),
                                                        children: "😀"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 363,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "button",
                                                        onClick: ()=>addEmoji('🔥'),
                                                        children: "🔥"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 364,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "button",
                                                        onClick: ()=>addEmoji('❤️'),
                                                        children: "❤️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 365,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 362,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                value: exportType,
                                                onChange: (e)=>setExportType(e.target.value),
                                                style: {
                                                    padding: 8,
                                                    borderRadius: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "png",
                                                        children: "PNG"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 369,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "jpeg",
                                                        children: "JPEG"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 370,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 368,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "button",
                                                onClick: download,
                                                children: "Download"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 373,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "button",
                                                onClick: share,
                                                children: "Share"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 374,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "button",
                                                onClick: clearImage,
                                                style: {
                                                    background: '#ef4444'
                                                },
                                                children: "Clear"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 375,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 355,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.jsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "footer",
                                    children: "Tip: Drag stickers or text directly on the image. Use the multi-line textareas for line breaks (press Enter). Use rounded corner or circle mask for stylized output."
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.jsx",
                                    lineNumber: 379,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.jsx",
                            lineNumber: 349,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "right",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "card",
                                style: {
                                    padding: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "input-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Top Text"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 386,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                rows: 3,
                                                value: topText,
                                                onChange: (e)=>setTopText(e.target.value),
                                                style: {
                                                    flex: 1,
                                                    padding: 8,
                                                    borderRadius: 8
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 387,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "input-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Bottom Text"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                rows: 3,
                                                value: bottomText,
                                                onChange: (e)=>setBottomText(e.target.value),
                                                style: {
                                                    flex: 1,
                                                    padding: 8,
                                                    borderRadius: 8
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 392,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "input-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Font Size"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 396,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: fontSize,
                                                onChange: (e)=>setFontSize(Math.max(10, Number(e.target.value) || 24))
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "input-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Font"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 401,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                value: fontFamily,
                                                onChange: (e)=>setFontFamily(e.target.value),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        children: "Impact"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 403,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        children: "Arial"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 404,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        children: "Helvetica"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 405,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        children: "Comic Sans MS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 406,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        children: "Times New Roman"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 407,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "input-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Text Color"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 412,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "color",
                                                value: textColor,
                                                onChange: (e)=>setTextColor(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 413,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 411,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "input-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Stroke"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 417,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "color",
                                                value: strokeColor,
                                                onChange: (e)=>setStrokeColor(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 418,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: strokeWidth,
                                                onChange: (e)=>setStrokeWidth(Math.max(0, Number(e.target.value) || 1)),
                                                style: {
                                                    width: 80
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 419,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 416,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 8,
                                            alignItems: 'center',
                                            marginBottom: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "button",
                                                onClick: centerTop,
                                                children: "Center Top"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 423,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "button",
                                                onClick: centerBottom,
                                                children: "Center Bottom"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 424,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 422,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "input-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 428,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: rounded,
                                                onChange: (e)=>setRounded(e.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 429,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                style: {
                                                    width: 80
                                                },
                                                children: "Radius"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 430,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: radius,
                                                onChange: (e)=>setRadius(Number(e.target.value) || 24),
                                                style: {
                                                    width: 80
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 431,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 427,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "input-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                children: "Circle Mask"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 435,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: circleMask,
                                                onChange: (e)=>setCircleMask(e.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 436,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 434,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "instructions",
                                        children: 'Stickers: upload PNG/JPG or click an emoji. Remove a sticker by clicking the "Remove" button shown next to the sticker list below.'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 13,
                                                    color: '#9aa4b2',
                                                    marginBottom: 6
                                                },
                                                children: "Stickers on canvas"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 442,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 6
                                                },
                                                children: stickers.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    width: 32,
                                                                    height: 32,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    background: '#071229',
                                                                    borderRadius: 6
                                                                },
                                                                children: s.type === 'emoji' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: 18
                                                                    },
                                                                    children: s.content
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/index.jsx",
                                                                    lineNumber: 447,
                                                                    columnNumber: 47
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                                    src: s.content.src,
                                                                    style: {
                                                                        maxWidth: 28,
                                                                        maxHeight: 28
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/index.jsx",
                                                                    lineNumber: 447,
                                                                    columnNumber: 94
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/index.jsx",
                                                                lineNumber: 446,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    flex: 1,
                                                                    fontSize: 13
                                                                },
                                                                children: s.type === 'emoji' ? 'Emoji' : 'Image sticker'
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/index.jsx",
                                                                lineNumber: 449,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "button",
                                                                onClick: ()=>removeSticker(s.id),
                                                                style: {
                                                                    background: '#ef4444'
                                                                },
                                                                children: "Remove"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/index.jsx",
                                                                lineNumber: 450,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, s.id, true, {
                                                        fileName: "[project]/pages/index.jsx",
                                                        lineNumber: 445,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.jsx",
                                                lineNumber: 443,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.jsx",
                                        lineNumber: 441,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.jsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/index.jsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/index.jsx",
                    lineNumber: 348,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/index.jsx",
            lineNumber: 342,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/index.jsx",
        lineNumber: 341,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__602e7fd2._.js.map