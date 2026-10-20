#!/usr/bin/env python3
"""Second Brain: serve o dist/ sob /central-servicos-light e recebe sugestoes de links.

Biblioteca padrao, sem venv. Rotas:
  /                                   -> 301 para /central-servicos-light/
  /central-servicos-light/            -> index.html do dist
  /central-servicos-light/<arquivo>   -> arquivo do dist (404 se ausente)
  /central-servicos-light/api/sugestoes (GET)  -> {total, aguardando}
  /central-servicos-light/api/sugestoes (POST) -> {ok, destino, aguardando}

Uso:
    python3 api.py --porta 8090
"""

import argparse
import json
import mimetypes
import os
import re
import threading
import urllib.parse
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

RAIZ = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(RAIZ, "dist")
PREFIXO = "/central-servicos-light"
CAIXA = os.path.join(RAIZ, "sugestoes.jsonl")
TRAVA = threading.Lock()
LIMITE_CORPO = 8 * 1024


def destino_de(url):
    u = url.lower()
    if re.search(r"youtube\.com/watch|youtu\.be/|youtube\.com/shorts", u):
        return "videos"
    if "github.com/" in u:
        return "skills"
    return "links"


def ler_caixa():
    itens = []
    if os.path.exists(CAIXA):
        with open(CAIXA, encoding="utf-8") as f:
            for linha in f:
                linha = linha.strip()
                if linha:
                    try:
                        itens.append(json.loads(linha))
                    except ValueError:
                        pass
    return itens


def salvar_caixa(itens):
    with open(CAIXA, "w", encoding="utf-8") as f:
        for item in itens:
            f.write(json.dumps(item, ensure_ascii=False) + "\n")


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, format, *args):  # noqa: A002, mesma assinatura da base
        print("%s - %s" % (self.address_string(), format % args), flush=True)

    def _responder(self, codigo, corpo, tipo, extras=None):
        if isinstance(corpo, str):
            corpo = corpo.encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", tipo)
        self.send_header("Content-Length", str(len(corpo)))
        self.send_header("Cache-Control", "no-store")
        for chave, valor in (extras or {}).items():
            self.send_header(chave, valor)
        self.end_headers()
        try:
            self.wfile.write(corpo)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def _json(self, codigo, obj):
        self._responder(codigo, json.dumps(obj, ensure_ascii=False),
                        "application/json; charset=utf-8")

    def _indice(self):
        with open(os.path.join(DIST, "index.html"), "rb") as f:
            self._responder(200, f.read(), "text/html; charset=utf-8")

    def do_GET(self):
        caminho = urllib.parse.urlparse(self.path).path
        if caminho in ("", "/"):
            self._responder(301, "ver /central-servicos-light/", "text/plain; charset=utf-8",
                            {"Location": PREFIXO + "/"})
            return
        if caminho == PREFIXO + "/api/sugestoes":
            with TRAVA:
                itens = ler_caixa()
            return self._json(200, {
                "total": len(itens),
                "aguardando": sum(1 for i in itens if not i.get("processada_em")),
            })
        if caminho == PREFIXO or caminho == PREFIXO + "/":
            return self._indice()
        if caminho.startswith(PREFIXO + "/"):
            rel = caminho[len(PREFIXO) + 1:]
            alvo = os.path.normpath(os.path.join(DIST, rel))
            if not alvo.startswith(DIST + os.sep) and alvo != DIST:
                return self._responder(404, "nao encontrado", "text/plain; charset=utf-8")
            if os.path.isfile(alvo):
                tipo, _ = mimetypes.guess_type(alvo)
                with open(alvo, "rb") as f:
                    return self._responder(200, f.read(), tipo or "application/octet-stream")
            return self._responder(404, "nao encontrado", "text/plain; charset=utf-8")
        return self._responder(404, "nao encontrado", "text/plain; charset=utf-8")

    def do_POST(self):
        caminho = urllib.parse.urlparse(self.path).path
        if caminho != PREFIXO + "/api/sugestoes":
            return self._responder(404, "nao encontrado", "text/plain; charset=utf-8")
        try:
            tamanho = int(self.headers.get("Content-Length", 0) or 0)
        except ValueError:
            tamanho = 0
        if tamanho <= 0 or tamanho > LIMITE_CORPO:
            return self._json(400, {"erro": "corpo inválido"})
        try:
            payload = json.loads(self.rfile.read(tamanho).decode("utf-8") or "{}")
        except ValueError:
            return self._json(400, {"erro": "JSON inválido"})
        url = ((payload.get("url") or "").strip()
               if isinstance(payload, dict) else "")
        partes = urllib.parse.urlparse(url)
        if partes.scheme not in ("http", "https") or not partes.netloc:
            return self._json(400, {"erro": "URL inválida: use http(s)://..."})
        with TRAVA:
            itens = ler_caixa()
            if any(i.get("url") == url and not i.get("processada_em") for i in itens):
                return self._json(409, {"erro": "link já sugerido e aguardando curadoria"})
            itens.append({
                "url": url,
                "destino": destino_de(url),
                "origem": "site",
                "sugerida_em": datetime.now().strftime("%Y-%m-%d %H:%M"),
                "processada_em": None,
                "detalhe": None,
            })
            salvar_caixa(itens)
            aguardando = sum(1 for i in itens if not i.get("processada_em"))
        return self._json(201, {"ok": True, "destino": destino_de(url),
                                "aguardando": aguardando})


def main():
    ap = argparse.ArgumentParser(description="Second Brain: estatico + inbox de sugestoes")
    ap.add_argument("--porta", type=int, default=8090)
    ap.add_argument("--bind", default="0.0.0.0")
    args = ap.parse_args()
    if not os.path.isfile(os.path.join(DIST, "index.html")):
        raise SystemExit("dist/index.html ausente: rode npm run build antes")
    srv = ThreadingHTTPServer((args.bind, args.porta), Handler)
    print(f"second-brain servindo {DIST} em http://{args.bind}:{args.porta}{PREFIXO}/",
          flush=True)
    srv.serve_forever()


if __name__ == "__main__":
    main()
