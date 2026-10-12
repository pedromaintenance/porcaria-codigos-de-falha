# Guia do instrutor — P.O.R.C.A.R.I.A. Códigos de Falha

## Objetivo

Desenvolver raciocínio técnico na interpretação de **códigos eletrônicos em equipamentos pesados**. Treinar diferenciação entre código ativo e registrado, causa física versus defeito de sensoriamento, falhas de alimentação, comunicação J1939/CDL, atuação de solenoide e diagnóstico pós-intervenção.

## Roteiro de atividade (40–60 minutos)

1. **5 minutos:** peça que o participante descreva a diferença entre código, sintoma e defeito confirmado.
2. **10 minutos:** escolha uma das missões de elétrica. Os alunos comparam `FMI 03`, `FMI 04` e o significado de entrada pull-up/pull-down (sem aplicar valores reais genéricos).
3. **15 minutos:** cada participante executa duas missões com o **mesmo código** e compara a causa verdadeira. Incentive registrar por escrito qual teste foi capaz de distinguir as alternativas.
4. **10 minutos:** execute uma missão de evento físico de motor. Discuta por que trocar um sensor pode ser decisão grave quando o alerta mede uma condição real.
5. **10 minutos:** revisão de segurança, fluxo de registro e causas descartadas. Oriente o aluno a escrever um relatório objetivo: condição, código, inspeção, medição, evidência, causa provável, reparo e validação.

## Rubrica sugerida (100 pontos)

| Critério | Pontos | Evidência esperada |
|---|---:|---|
| Triagem de risco e isolamento | 25 | Escolhe condição segura sem submeter pessoas ou equipamento a risco |
| Seleção de testes | 25 | Dois testes mínimos, pontuação máxima quando combina inspeção e medição |
| Hipótese coerente | 30 | Hipótese apoiada nos resultados apresentados, sem condenação a priori |
| Intervenção e validação | 20 | Escolhe correção causal em vez de limpeza de código ou troca por tentativa |

## Exercícios de extensão

- **FMI 05:** comparar bobina realmente aberta, condutor rompido e terminal recuado. Como seria o teste de bancada e o teste de continuidade, com isolamento e literatura vigentes?
- **FMI 08:** distinguir sensor fora da folga, alvo mecânico danificado e intermitência do cabo. Por que “sensor de rotação defeituoso” não é sempre causa?
- **FMI 09:** mapear perdas simultâneas de atualização, identificando módulo, alimentação e rede antes de trocar um ECM.
- **FMI 13:** estudar quando uma calibração é devida e por que não deve ser feita fora da referência mecânica.
- **Evento de motor:** avaliar o que deve ser parado e o que pode ser testado sem violar medidas de proteção.
- **Economia:** comparar crédito usado para testar versus comprar componente por tentativa. Discuta custos, risco, indisponibilidade e incerteza — não confunda valores fictícios com custos reais de manutenção.

## Códigos usados nas 24 bases de casos

O arquivo `js/data.js` contém todos os cenários. Os exemplos básicos incluem:

- Alimentação: CAT MID 390 CID 168 FMI 04; MID 272 CID 168 FMI 03.
- Sensor de motor: CAT MID 036 CID 100 FMI 04; MID 263 CID 274 FMI 03.
- Transmissão: CAT MID 389 CID 585 FMI 08; MID 390 CID 1402 FMI 05.
- Implementos: CAT MID 299 CID 1143 FMI 05; CID 1598 FMI 05.
- Controle e direção: CID 430 FMI 03, CID 2201 FMI 08, CID 2994 FMI 08.
- Rede: CID 247 FMI 09 (CAT), mais conceitos de DM1/DM2 da SAE J1939.
- Eventos: SPN 100 FMI 18/01, SPN 110 FMI 16, SPN 102 FMI 18, SPN 105 FMI 15, SPN 101 FMI 16.
- DEUTZ MD1: SPN 190 FMI 02.
- Danfoss PVED-CL: SPN 627 FMI 04, SPN 1079 FMI 04.
- Danfoss JS1: SPN 2660 FMI 03 e FMI 13.

As combinações e aplicações citadas devem sempre ser confirmadas na literatura OEM aplicável antes de qualquer uso prático. O jogo as emprega apenas como **âncoras didáticas** e **não dispõe de arquivos de configuração reais**.

## Limites de validação

Os cenários são elaborados para treinar método e não funcionar como procedimento operacional padrão. Leituras de instrumento, cronologias e condições de falha são construídas para permitir inferência. Não fornecem pinagem, torque, pressão, condição de bloqueio específico, valores de calibração, autorização de substituição ou instrução prática de intervenção.

As tabelas OEM podem sofrer alterações e a correspondência entre código e diagnóstico depende do módulo. Necessita-se de aprovação técnica antes de usar as missões como avaliação formal de competência.
