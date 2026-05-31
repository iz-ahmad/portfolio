'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const COLS = 32, ROWS = 18, CELL = 28
const BUG_TOKENS = ['{}', '</>', '()', ';;', '==', '&&', '||', '[]', '??', 'TS', 'JS', 'fn']

type Point = { x: number; y: number }
type Particle = { x: number; y: number; vx: number; vy: number; life: number; c: string }
type Bug = { x: number; y: number; label: string; pulse: number }

export function BugSnake() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [running, setRunning] = useState(false)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => {
    if (typeof window === 'undefined') return 0
    return +(localStorage.getItem('iz_snake_best') || 0)
  })
  const [over, setOver] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [gameKey, setGameKey] = useState(0)

  const openInstructions = useCallback(() => {
    import('@/lib/sfx').then(({ SFX }) => SFX.play('click'))
    setShowInstructions(true)
  }, [])

  const startGame = useCallback(() => {
    setPaused(false)
    pausedRef.current = false
    setShowInstructions(false)
    setOver(false)
    setScore(0)
    setRunning(true)
    setGameKey((k) => k + 1)
  }, [])

  const togglePause = useCallback(() => {
    setPaused((p) => {
      pausedRef.current = !p
      return !p
    })
  }, [])

  const quitGame = useCallback(() => {
    setPaused(false)
    pausedRef.current = false
    setRunning(false)
    setOver(false)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  useEffect(() => {
    if (!running) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = COLS * CELL
    canvas.height = ROWS * CELL
    const W = canvas.width, H = canvas.height

    let snake: Point[] = [{x:8,y:9},{x:7,y:9},{x:6,y:9}]
    let dir = {x:1,y:0}, nextDir = {x:1,y:0}
    let bug: Bug = spawnBug(snake)
    let particles: Particle[] = []
    let scoreLocal = 0
    let lastScore = 0
    let speed = 130, last = 0, alive = true

    function spawnBug(s: Point[]): Bug {
      let x=0,y=0,ok=false
      while (!ok) {
        x = Math.floor(Math.random() * COLS)
        y = Math.floor(Math.random() * ROWS)
        ok = !s.some(p => p.x===x && p.y===y)
      }
      return { x, y, label: BUG_TOKENS[Math.floor(Math.random() * BUG_TOKENS.length)], pulse: 0 }
    }

    const onKey = (e: KeyboardEvent) => {
      const k = e.key
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(k)) e.preventDefault()
      if (k === ' ' || k === 'Escape' || k === 'p') { togglePause(); return }
      if (pausedRef.current) return
      if ((k==='ArrowUp'||k==='w') && dir.y!==1)  nextDir={x:0,y:-1}
      else if ((k==='ArrowDown'||k==='s') && dir.y!==-1) nextDir={x:0,y:1}
      else if ((k==='ArrowLeft'||k==='a') && dir.x!==1) nextDir={x:-1,y:0}
      else if ((k==='ArrowRight'||k==='d') && dir.x!==-1) nextDir={x:1,y:0}
    }
    window.addEventListener('keydown', onKey)

    let raf: number
    const tick = (t: number) => {
      if (pausedRef.current) {
        raf = requestAnimationFrame(tick)
        return
      }

      if (t - last > speed) {
        last = t
        dir = nextDir
        const head = { x: (snake[0].x + dir.x + COLS) % COLS, y: (snake[0].y + dir.y + ROWS) % ROWS }
        if (snake.some(s => s.x===head.x && s.y===head.y)) {
          alive = false
        } else {
          snake.unshift(head)
          if (head.x===bug.x && head.y===bug.y) {
            scoreLocal += 10
            import('@/lib/sfx').then(({ SFX }) => SFX.play('eat'))
            for (let k=0;k<18;k++) particles.push({
              x: bug.x*CELL+CELL/2, y: bug.y*CELL+CELL/2,
              vx: (Math.random()-.5)*5, vy: (Math.random()-.5)*5,
              life: 30+Math.random()*20,
              c: Math.random()<.5?'#ff2d3d':'#ff5a3c',
            })
            bug = spawnBug(snake)
            speed = Math.max(55, speed - 3)
          } else {
            snake.pop()
          }
        }
      }

      ctx.fillStyle = 'rgba(5,5,16,0.4)'
      ctx.fillRect(0,0,W,H)

      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 1
      for (let x=0;x<=COLS;x++) { ctx.beginPath();ctx.moveTo(x*CELL,0);ctx.lineTo(x*CELL,H);ctx.stroke() }
      for (let y=0;y<=ROWS;y++) { ctx.beginPath();ctx.moveTo(0,y*CELL);ctx.lineTo(W,y*CELL);ctx.stroke() }

      bug.pulse += 0.1
      const pulse = (Math.sin(bug.pulse)+1)*0.5
      ctx.save()
      ctx.translate(bug.x*CELL+CELL/2, bug.y*CELL+CELL/2)
      ctx.strokeStyle=`rgba(255,90,60,${0.5+pulse*0.5})`
      ctx.lineWidth=1.5
      ctx.shadowColor='#ff5a3c'
      ctx.shadowBlur=10+pulse*8
      ctx.beginPath()
      const r=CELL*0.42, sides=6
      for (let i=0;i<=sides;i++) {
        const a=(i/sides)*Math.PI*2
        const rr=r+Math.sin(a*3+bug.pulse)*2
        ctx.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)
      }
      ctx.stroke()
      ctx.shadowBlur=0
      ctx.fillStyle='#fafafa'
      ctx.font='bold 11px JetBrains Mono, monospace'
      ctx.textAlign='center';ctx.textBaseline='middle'
      ctx.fillText(bug.label,0,0)
      ctx.restore()

      snake.forEach((s,i)=>{
        const isHead=i===0
        ctx.save()
        const cx=s.x*CELL+CELL/2, cy=s.y*CELL+CELL/2
        const size=CELL-4-i*0.15
        const t01=1-i/Math.max(snake.length,1)
        if (isHead) { ctx.fillStyle='#ff2d3d';ctx.shadowColor='#ff2d3d';ctx.shadowBlur=14 }
        else { ctx.fillStyle=`rgba(255,45,61,${0.35+t01*0.55})` }
        ctx.fillRect(cx-size/2,cy-size/2,Math.max(4,size),Math.max(4,size))
        ctx.restore()
        if (isHead) {
          ctx.fillStyle='#fafafa'
          const ex=cx+dir.x*5,ey=cy+dir.y*5,off=4
          ctx.fillRect(ex-off-1,ey-off-1,2,2)
          ctx.fillRect(ex+off-1,ey+off-1,2,2)
        }
      })

      particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.life--;p.vx*=0.94;p.vy*=0.94})
      particles=particles.filter(p=>p.life>0)
      particles.forEach(p=>{
        ctx.fillStyle=p.c
        ctx.globalAlpha=Math.max(0,p.life/40)
        ctx.fillRect(p.x,p.y,3,3)
      })
      ctx.globalAlpha=1

      // Only re-render React when the score actually changes — the canvas
      // is drawn imperatively, so the rAF loop shouldn't trigger a render/frame.
      if (scoreLocal !== lastScore) {
        lastScore = scoreLocal
        setScore(scoreLocal)
      }

      if (alive) {
        raf = requestAnimationFrame(tick)
      } else {
        const b = Math.max(scoreLocal, +(localStorage.getItem('iz_snake_best')||0))
        localStorage.setItem('iz_snake_best', String(b))
        setBest(b)
        setOver(true)
        setRunning(false)
        import('@/lib/sfx').then(({ SFX }) => SFX.play('over'))
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
    }
  }, [running, gameKey, togglePause])

  return (
    <section id="game" className="section" aria-label="Bug Snake game">
      <div className="section-head">
        <div>
          <h2 className="h-display section-title">Eat the bugs.</h2>
        </div>
        <div className="section-aside">
          <p>Classic snake — but the food is your worst enemies. Arrow keys / WASD. Walls wrap around.</p>
        </div>
      </div>

      <div className="game-frame glass">
        <div className="game-hud" aria-live="polite" aria-atomic="true">
          <div><span className="muted">SCORE </span><span className="glow-cyan">{String(score).padStart(5,'0')}</span></div>
          <div><span className="muted">LENGTH </span><span>{String(Math.floor(score/10)+3).padStart(2,'0')}</span></div>
          <div><span className="muted">BEST </span><span className="glow-magenta">{String(best).padStart(5,'0')}</span></div>
          {running && (
            <div className="game-hud-controls">
              <button className="game-ctrl-btn" onClick={togglePause} data-cursor="hover" aria-label={paused ? 'Resume' : 'Pause'}>
                {paused ? '▸' : '⏸'}
              </button>
              <button className="game-ctrl-btn" onClick={startGame} data-cursor="hover" aria-label="Restart">↺</button>
              <button className="game-ctrl-btn game-ctrl-quit" onClick={quitGame} data-cursor="hover" aria-label="Quit">✕</button>
            </div>
          )}
        </div>

        <div className="game-stage">
          <canvas ref={canvasRef} className="game-canvas" aria-label="Snake game canvas" />

          {/* Pause overlay */}
          {running && paused && (
            <div className="game-overlay">
              <div className="game-overlay-inner glass">
                <div className="hud-label">// PAUSED</div>
                <div className="game-keys">
                  <span><kbd>Space</kbd> or <kbd>P</kbd> to resume</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <button className="btn btn-primary" onClick={togglePause} data-cursor="hover">RESUME ▸</button>
                  <button className="btn" onClick={startGame} data-cursor="hover">RESTART</button>
                  <button className="btn" onClick={quitGame} data-cursor="hover">QUIT</button>
                </div>
              </div>
            </div>
          )}

          {/* Idle / game over overlay */}
          {!running && !showInstructions && (
            <div className="game-overlay">
              <div className="game-overlay-inner glass">
                <div className="hud-label">// {over ? 'GAME_OVER' : 'READY_TO_DEPLOY'}</div>
                {over && <div className="game-final">Score · <span className="glow-cyan">{score}</span></div>}
                <button className="btn btn-primary" onClick={over ? startGame : openInstructions} data-cursor="hover">
                  {over ? 'RUN AGAIN' : 'BOOT MISSION'} <span aria-hidden>▸</span>
                </button>
                {over && (
                  <div className="game-keys" aria-label="Controls">
                    <span><kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd> MOVE</span>
                    <span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> ALT</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Instructions overlay */}
          {showInstructions && (
            <div className="game-overlay">
              <div className="game-instructions glass" role="dialog" aria-modal="true" aria-label="Game instructions">
                <div className="hud-label">// MISSION_BRIEF</div>
                <h3 className="game-instr-title">BUG_EATER · v1.0</h3>
                <ul className="game-instr-list" aria-label="Rules">
                  <li><span className="game-instr-glyph">▸</span> Eat the glowing code tokens to grow</li>
                  <li><span className="game-instr-glyph">▸</span> Walls wrap around — use them</li>
                  <li><span className="game-instr-glyph">▸</span> Don&apos;t bite your own tail</li>
                  <li><span className="game-instr-glyph">▸</span> Speed increases with each bug eaten</li>
                </ul>
                <div className="game-instr-controls">
                  <div className="game-instr-ctrl-row">
                    <div className="game-instr-ctrl-group">
                      <div className="game-keys"><span><kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd></span></div>
                      <div className="game-instr-ctrl-label">ARROW KEYS</div>
                    </div>
                    <div className="game-instr-ctrl-sep">or</div>
                    <div className="game-instr-ctrl-group">
                      <div className="game-keys"><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span></div>
                      <div className="game-instr-ctrl-label">WASD</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <span className="game-instr-ctrl-label"><kbd>Space</kbd> / <kbd>P</kbd> / <kbd>Esc</kbd> — pause</span>
                  </div>
                </div>
                <div className="game-instr-foot">
                  <button className="btn" onClick={() => setShowInstructions(false)} data-cursor="hover">CANCEL</button>
                  <button className="btn btn-primary" onClick={startGame} data-cursor="hover">
                    ENGAGE <span aria-hidden>▸</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
