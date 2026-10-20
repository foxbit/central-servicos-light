import { useEffect, useState } from 'react';

type Destino = 'links' | 'videos' | 'skills';

const ROTULO: Record<Destino, string> = { links: 'Links', videos: 'Vídeos', skills: 'Skills' };

function baseApi(): string {
  const p = window.location.pathname;
  const base = p.endsWith('/') ? p : p + '/';
  return base + 'api/sugestoes';
}

export function SugestaoLink() {
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState<{ texto: string; ok: boolean } | null>(null);
  const [aguardando, setAguardando] = useState<number | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch(baseApi(), { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d && typeof d.aguardando === 'number') setAguardando(d.aguardando); })
      .catch(() => {});
  }, []);

  async function enviar() {
    const limpo = url.trim();
    if (!/^https?:\/\//i.test(limpo)) {
      setMsg({ texto: 'Cole um link começando com https://', ok: false });
      return;
    }
    setEnviando(true);
    setMsg(null);
    try {
      const r = await fetch(baseApi(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ url: limpo }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.status === 409) {
        setMsg({ texto: 'Este link já foi sugerido e aguarda curadoria.', ok: false });
      } else if (!r.ok) {
        setMsg({ texto: 'Falha: ' + (d.erro || ('HTTP ' + r.status)), ok: false });
      } else {
        const dest = (d.destino && ROTULO[d.destino as Destino]) || 'coleção';
        setMsg({ texto: `Recebido, vai para ${dest} (${d.aguardando} aguardando).`, ok: true });
        setUrl('');
        if (typeof d.aguardando === 'number') setAguardando(d.aguardando);
      }
    } catch {
      setMsg({ texto: 'Falha de rede, tente de novo.', ok: false });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="card p-5 mt-10 max-w-5xl" aria-labelledby="sugerir-titulo">
      <p className="kicker">Curadoria</p>
      <h2 id="sugerir-titulo" className="font-serif text-2xl font-semibold text-paper mb-2">
        Sugerir link
      </h2>
      <p className="font-serif text-muted leading-relaxed mb-4 max-w-2xl">
        Cole um link para entrar na coleção. YouTube vai para Vídeos, GitHub vai para Skills, o resto vai para Links.
        {aguardando !== null && aguardando > 0 && ` ${aguardando} aguardando curadoria.`}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          inputMode="url"
          autoComplete="off"
          placeholder="https://..."
          aria-label="Link para sugerir"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') enviar(); }}
          className="ds-input flex-1"
        />
        <button type="button" className="btn" onClick={enviar} disabled={enviando}>
          {enviando ? 'Enviando...' : 'Sugerir'}
        </button>
      </div>
      {msg && (
        <p role="status" className={`font-mono text-xs tracking-wide mt-3 ${msg.ok ? 'text-accent' : 'text-danger'}`}>
          {msg.texto}
        </p>
      )}
    </section>
  );
}
