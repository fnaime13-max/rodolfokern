#!/usr/bin/env bash
# Publica o site do Rodolfo no GitHub Pages: cria o repositório fnaime13-max/rodolfokern,
# envia a branch main e liga o Pages. Usa a credencial do GitHub que o Git já tem salva.
set -e
cd "$(dirname "$0")"
REPO=rodolfokern
DONO=fnaime13-max
TOKEN=$(printf "protocol=https\nhost=github.com\n\n" | git credential fill | sed -n 's/^password=//p')
API="https://api.github.com"
H=(-H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json")

echo "1/3 Criando o repositório $DONO/$REPO..."
curl -s "${H[@]}" "$API/user/repos" \
  -d "{\"name\":\"$REPO\",\"description\":\"Site Rodolfo Kern - Nutricionista\",\"homepage\":\"https://$DONO.github.io/$REPO/\",\"private\":false,\"has_issues\":false,\"has_wiki\":false}" \
  | grep -o '"full_name": "[^"]*"\|"message": "[^"]*"' | head -1

echo "2/3 Enviando os arquivos..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$DONO/$REPO.git"
git push -u origin main

echo "3/3 Ligando o GitHub Pages..."
curl -s "${H[@]}" "$API/repos/$DONO/$REPO/pages" -d '{"source":{"branch":"main","path":"/"}}' \
  | grep -o '"html_url": "[^"]*"\|"message": "[^"]*"' | head -1

echo
echo "Pronto. Em 1-2 minutos o site abre em: https://$DONO.github.io/$REPO/"
