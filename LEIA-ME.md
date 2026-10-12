# P.O.R.C.A.R.I.A. — CÓDIGOS DE FALHA

**v1.0.0 | PWA offline, instalável, sem backend nem dependências externas.**

O simulador é um projeto didático independente, destinado a técnicos e profissionais de manutenção de equipamentos pesados que queiram treinar interpretação de códigos, coleta de evidências, diagnóstico diferencial, decisões de reparo e impacto econômico das escolhas.

## O que está dentro do jogo

- **72 missões**, derivadas de **24 situações-código**, cada uma com três causas concorrentes de falha (total de 72 cenários). É comum o mesmo identificador eletrônico aparecer em condições diferentes; a resposta nunca deve ser decorada pelo número.
- **8 campanhas** de eletricidade, atuadores, transmissão, comunicação, motores, admissão, controles especiais e perícia avançada.
- **54 entradas** de índice de códigos, incluindo FMIs e pares CID/FMI, SPN/FMI e alguns eventos; cada exemplo possui referência.
- **22 artigos didáticos** sobre codificação, diagnóstico eletrônico, circuito, evento real, segurança, CAN/J1939, solenoides, calibração e melhores práticas de registro.
- **27 referências web pesquisadas**, priorizando fabricantes e instituições especializadas, listadas no jogo e no arquivo `PESQUISA_FONTES.md`.
- Terminal ECM **inventado para treinamento**, com código ativo, ocorrência, horímetro simulado e parâmetros do caso; **não reproduz nem se conecta ao CAT ET, INSITE, EST ou outra ferramenta OEM**.
- Sequência de seis fases: triagem de segurança; leitura do ECM; escolha dos testes; comparação de hipóteses; decisão de reparo; relatório de aprendizagem.
- Economia fictícia de Créditos (Cr$), ferramentas permanentes, peças em estoque, compra emergencial, exames, biblioteca desbloqueável e penalidades por condenação prematura.
- Progressão de XP, patentes, medalhas, missões desbloqueáveis e incentivo a avançar nos diferentes casos (repetições pagam 25% da premiação).
- **Modo Instrutor**: acessado em Perfil. Mostra aviso de **reset total**, botão de exportação JSON e confirmação explícita. Liga ou desliga apenas após limpar o progresso. Enquanto ativo, todos os manuais e missões ficam liberados.
- Save local do navegador e **exportação/importação em JSON**. Sem banco de dados e sem coletar informações do jogador.

## Instalar e publicar no GitHub Pages

1. Descompactar o ZIP.
2. Criar um repositório GitHub, por exemplo `porcaria-codigos`.
3. Enviar todos os arquivos **do diretório raiz do pacote** para a raiz do repositório. Não deixe a pasta do projeto como subpasta adicional, caso esteja publicando de `/ (root)`.
4. No GitHub, abrir **Settings → Pages → Build and deployment**.
5. Selecionar **Deploy from a branch**, branch **main**, pasta **/(root)**.
6. Aguardar o endereço HTTPS gerado. No Chrome/Edge Android ou desktop usar a opção **Instalar aplicativo**. No iPhone, no Safari utilizar **Compartilhar → Adicionar à Tela de Início** (suporte varia conforme versão).
7. Abrir ao menos uma vez com conexão para que o service worker faça cache dos arquivos. Depois será possível jogar offline.

> Abrir `index.html` por `file://` não permite registrar service worker. O projeto também pode servir páginas por um servidor HTTP local para desenvolvimento, mas a instalação real deve ocorrer por `https://` (ou localhost, quando aceito pelo navegador).

## Estrutura dos arquivos

```text
index.html                 interface de entrada
manifest.webmanifest       metadados de instalação
service-worker.js          cache PWA
css/style.css              layout responsivo
js/data.js                 casos, manuais, catálogo e fontes
js/core.js                 engine de pontuação, saldos e validação de save
js/app.js                  navegação, escolhas e telas
icons/icon-192.png         ícone para PWA
icons/icon-512.png         ícone para PWA
PESQUISA_FONTES.md         bibliografia de páginas encontradas
GUIA_DO_INSTRUTOR.md       exercícios, critérios e limites
NOTAS_DA_VERSAO.md         conteúdo e verificações
_build_data.py             gerador editorial de dados JS (opcional)
tests/smoke.cjs            teste automatizado da estrutura e do motor
tests/browser_smoke.py     teste de interface em Chromium por injeção de scripts
```

## Como jogar

**Triagem:** o equipamento ou componente precisa estar em condição segura antes de testar. Escolhas arriscadas geram penalidade independente de acerto técnico.

**ECM:** identifique se a notação é CID/FMI, SPN/FMI ou evento. A tela mostra ocorrência didática; registre antes de investigar.

**Testes:** escolha inspeção visual, medição elétrica, histórico, medida independente e literatura/esquema. Os custos são reduzidos quando existe ferramenta comprada na loja. Há uma pequena reserva inicial de exames gratuitos. É necessário selecionar no mínimo dois.

**Diagnóstico:** selecione uma entre três causas fisicamente plausíveis e uma hipótese extrema (ECM inteiro). O código sozinho não revela qual causa vale para aquela missão: são as evidências selecionadas que diferenciam hipóteses.

**Reparo:** a opção de intervenção fundamentada representa agir conforme a hipótese que você selecionou. Se a hipótese estiver incorreta, o reparo tende a fracassar. Trocar conjunto inteiro sem confirmação gera penalidade forte. A opção correta pode exigir comprar um componente quando um defeito real estiver confirmado.

**Relatório:** detalha os sinais, o mecanismo verdadeiro **dentro daquele cenário fictício**, a intervenção didática correta, pontuação e resultado financeiro.

## Economia, critérios e reinícios

- Saldo inicial: **2.100 Cr$**.
- Os custos, recompensas, perdas e preços são **exclusivamente valores de videogame**, não custos OEM, perdas reais de produção ou estimativas financeiras.
- Uma missão concluída com triagem segura e diagnóstico correto pode receber de aproximadamente 600 a 1.100 Cr$, dependendo de evidências e dificuldade.
- Um diagnóstico certo mas com pouco suporte de testes tem desconto de recompensa.
- Trocar ECM ou conjunto injustificadamente pode gerar perdas de 1.250 a 2.800 Cr$, acrescidas de custos decorrentes de triagem inadequada.
- Quando realmente é necessária uma peça e não há estoque, o jogo compra um kit fictício com adicional de urgência.
- Repetir um caso já concluído rende 25% dos créditos positivos. Pode-se repetir para aprender.
- O modo instrutor **não preserva automaticamente** seu progresso. Exporte o JSON antes de mudar de modo; a transição reinicia inclusive saldo e inventário.
- Em caso de saldo muito baixo, pode-se usar a opção de aporte didático em **Perfil**.

## Fontes e limitações técnicas

O índice mistura **famílias de codificação diferentes** que não devem ser tratadas como sinônimos:

- **Caterpillar (CDL):** módulo (MID), componente/circuito (CID), modo da falha (FMI). Alguns dispositivos exibem também códigos de eventos (`E...`).
- **SAE J1939-73:** parâmetro (SPN), modo da falha (FMI), ocorrência, endereço de origem; DM1/DM2 quando implementados.
- **Fabricantes de motor, módulos e máquinas:** podem empregar nomes e tabelas próprias, dependendo de versão, número de série e software instalado.

**Crucial:** os códigos e descrições do índice foram pesquisados em páginas públicas citadas, porém os **sintomas, horímetros, medições, cronologias e defeitos são sintéticos**. Os casos não afirmam que um código específico é suportado em todas as variantes de 777, 395, 6030, D9 ou perfuratrizes. A confirmação de código e procedimento real deve ser feita na documentação OEM vigente, por número de série, ECM e software. **Não executar ações de campo a partir do jogo.**

Não foi encontrada fonte pública com tabela de códigos proprietários DR410i/DI650i suficientemente verificável para gerar missões específicas. O material público Sandvik encontrado trata de monitoramento e status de módulos CAN em outras máquinas; isso não valida uma lista de falhas das duas perfuratrizes citadas. Portanto, nenhuma tabela fictícia foi atribuída à Sandvik.

## Dados, licenciamento e publicação pública

- Este jogo usa referências educativas públicas para produzir explicações próprias. Não inclui manuais PDF, telas de software proprietário, diagramas OEM originais, tabelas integrais licenciadas nem downloads de bases de terceiros.
- Não contém nomes, tags, números de série, ativos internos, números de ordem, SOS reais ou bases brutas corporativas.
- O save não sai do dispositivo exceto quando o usuário escolhe exportar o JSON.
- O material não é endossado por qualquer fabricante. O nome P.O.R.C.A.R.I.A. e seus ícones são independentes.

## Testes

Para executar os testes do motor em qualquer máquina com Node instalado:

```bash
node tests/smoke.cjs
```

O teste de interface requer Python + Playwright + Chromium; em ambientes que bloqueiam URL local, o script `browser_smoke.py` avalia a interface com injeção de HTML/CSS/JS. A instalação real, cache e modo standalone **precisam de validação complementar no dispositivo do usuário depois da publicação HTTPS**.

## Para ampliar

Editar `_build_data.py` (âncoras de códigos, cenários, artigos, fontes) e regenerar com `python _build_data.py`. Para o jogo funcionar sem Python, apenas os arquivos `.html`, `.js`, `.css`, ícones, manifest e worker precisam ser publicados. Antes de incluir qualquer código novo, confirmar identificador, origem, versão de software e publicação de serviço aplicável. Para cada código novo, escrever **hipóteses alternativas e testes que as discriminem**, em vez de prescrever uma troca automática.
