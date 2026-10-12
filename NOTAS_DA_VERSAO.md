# P.O.R.C.A.R.I.A. — Códigos de Falha v1.0.0

## Implementado

- Repositório jogável, sem frameworks e com PWA (manifest + cache offline).
- 72 missões, 24 âncoras de códigos, 3 mecanismos de falha por âncora.
- 8 trilhas, 22 manuais, 54 entradas no catálogo e 27 links externos de pesquisa.
- Simulador ECM, cinco opções de testes, hipóteses concorrentes e relatório conclusivo.
- Sistema de créditos e estoque, peças de substituição, ferramentas permanentes, compra emergencial e punições por erro.
- XP, progressão por patentes, medalhas e limitação de recompensas por repetição.
- Biblioteca desbloqueável, importação/exportação de saves e Modo Instrutor com confirmação, oferta de backup JSON e reset integral.

## QA efetuado

- Teste de integridade dos 72 casos, cada um com referência e três variações de causa.
- Teste automatizado de resultado correto e de penalidades para todos os casos.
- Teste de restauração de save com relatório concluído.
- Percurso de interface por Chromium (injetando recursos na página devido a bloqueio de navegação local pelo ambiente): completar missão, gerar pontuação, ativar instrutor, navegar em 22 manuais e 54 códigos, sem erro de JavaScript.
- Verificação de que os arquivos do service worker e os ícones existem.

## Não validado

- Instalação real no Android/iOS, comportamento do cache/service worker em hospedagem HTTPS e interface standalone; devem ser ensaiados após publicação do usuário.
- Equivalência dos casos com máquinas específicas da frota ou documentação confidencial não disponibilizada. Essa equivalência **não foi assumida**.
- Catálogos proprietários que exigem assinatura ou acesso ao portal OEM.

## Prioridade para versões posteriores

- Adicionar exames de osciloscópio com gráficos parametrizados, leitura de snapshots e árvore dinâmica de teste por escolha.
- Expandir conjunto de hipóteses e parâmetros com dados legitimamente publicados para cada ECM.
- Criar grupos de eventos simultâneos e falhas primárias/secundárias como campanha avançada.
- Quando houver documentação oficial de DR410i/DI650i licenciada e autorizada para uso educacional, criar campanhas específicas sem publicar integralmente material protegido.
