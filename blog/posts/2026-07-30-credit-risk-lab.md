---
title: "Credit Risk Lab: scoring bancario explicable, de los datos crudos a la API"
title_en: "Credit Risk Lab: explainable credit scoring, from raw data to the API"
title_pt: "Credit Risk Lab: scoring bancário explicável, dos dados crus à API"
title_fr: "Credit Risk Lab : scoring bancaire explicable, des données brutes à l'API"
date: "2026-07-30"
description: "Cómo construí un sistema de scoring de crédito completo — XGBoost sobre 307.000 préstamos, reason codes con SHAP, contrato de fairness testeado y API en Docker — y las decisiones que lo hacen defendible ante un comité de riesgo."
description_en: "How I built a complete credit scoring system — XGBoost on 307,000 loans, SHAP reason codes, a tested fairness contract and a Dockerized API — and the decisions that make it defensible before a risk committee."
description_pt: "Como construí um sistema completo de scoring de crédito — XGBoost sobre 307.000 empréstimos, reason codes com SHAP, contrato de fairness testado e API em Docker — e as decisões que o tornam defensável perante um comité de risco."
description_fr: "Comment j'ai construit un système complet de scoring de crédit — XGBoost sur 307 000 prêts, reason codes SHAP, contrat de fairness testé et API Dockerisée — et les décisions qui le rendent défendable devant un comité des risques."
category: "Machine Learning"
---

El scoring de crédito es el problema de machine learning más maduro y regulado de la banca. Un modelo que predice bien no basta: la normativa europea (EBA, AI Act) exige poder **explicar cada decisión individual**. [Credit Risk Lab](https://github.com/JonDScode/credit-risk-lab) es mi respuesta completa a ese problema, construida en cinco fases que se pueden leer commit a commit.

## Baseline honesto antes que modelo espectacular

Empecé con 30.000 clientes reales (UCI) y dos modelos: una regresión logística — el estándar interpretable del sector — y XGBoost. Las métricas son las de la casa: además del ROC AUC, el **KS statistic** (la métrica clásica de scorecards) y el Brier score para calibración.

| Modelo | ROC AUC | KS |
|--------|---------|-----|
| Regresión logística | 0.708 | 0.364 |
| XGBoost | 0.780 | 0.429 |

Un KS por encima de 0.4 es territorio de scorecard fuerte. Pero el número no es lo interesante — lo interesante es lo que viene después.

## Reason codes: explicar sin LLM, a propósito

Cada scoring se traduce a motivos legibles con SHAP values:

```json
{
  "p_default": 0.87,
  "reason_codes": [
    "Estado de pago del último mes: 2 mes(es) de retraso",
    "Importe facturado el último mes con patrón de uso atípico"
  ]
}
```

Dos decisiones de diseño que defendería en cualquier comité:

1. **Los reason codes son deterministas** — plantillas sobre los SHAP values, no texto generado por un LLM. Una explicación de denegación debe ser reproducible ante un regulador: mismo input, misma explicación, siempre.
2. **La dirección se calcula, no se asume.** Mi primera versión decía "facturación elevada" a un cliente con 2.500 NT$ de facturación — un SHAP positivo puede venir tanto de facturación alta como de una cuenta casi inactiva. Ahora cada razón se contrasta con la mediana de la cartera.

Y un contrato de fairness convertido en test automatizado: los atributos protegidos o sensibles (sexo, edad, estado civil, educación) **nunca** aparecen como motivo de denegación. Hay un test en CI que falla si eso cambia.

## Deep Learning, probado y descartado con datos

Entrené un MLP en PyTorch con el mismo split y las mismas métricas: AUC 0.771 contra el 0.780 de XGBoost, y bastante peor calibrado. Es el resultado que documenta la literatura — en datos tabulares de este tamaño, el gradient boosting sigue ganando. Elegir XGBoost no fue una preferencia: fue una medición.

## La liga grande: Home Credit

La última fase migra el sistema al benchmark estándar del sector: **307.000 solicitudes reales en 7 tablas relacionales** — buró externo, créditos previos, pago de cuotas, saldos mensuales. El trabajo duro es el feature engineering: ~80 features agregadas con lectura de negocio (ratios de capacidad de pago, tasa de aprobación histórica, retraso medio real en cuotas, utilización de tarjeta).

Resultado: **AUC 0.783** con un modelo único e interpretable — los ganadores de la competición de Kaggle rondaron 0.80 con ensembles masivos. Y el sanity check más importante: las features dominantes (scores de buró, utilización de tarjeta, retrasos en cuotas) son exactamente las que un analista de riesgo predeciría. El modelo aprende lo que el negocio ya sabe — y lo cuantifica.

## Cierre

Todo el sistema termina en una API FastAPI dockerizada con un endpoint `/score` que devuelve probabilidad, banda de riesgo y reason codes, más una demo interactiva en Streamlit. El código completo, commit a commit, está en [github.com/JonDScode/credit-risk-lab](https://github.com/JonDScode/credit-risk-lab).

<!-- lang:en -->
Credit scoring is the most mature and regulated machine learning problem in banking. A model that predicts well is not enough: European regulation (EBA, AI Act) requires being able to **explain every individual decision**. [Credit Risk Lab](https://github.com/JonDScode/credit-risk-lab) is my complete answer to that problem, built in five phases you can read commit by commit.

## An honest baseline before a spectacular model

I started with 30,000 real clients (UCI) and two models: a logistic regression — the industry's interpretable standard — and XGBoost. The metrics are the house metrics: besides ROC AUC, the **KS statistic** (the classic scorecard metric) and the Brier score for calibration.

| Model | ROC AUC | KS |
|-------|---------|-----|
| Logistic regression | 0.708 | 0.364 |
| XGBoost | 0.780 | 0.429 |

A KS above 0.4 is strong-scorecard territory. But the number isn't the interesting part — the interesting part comes next.

## Reason codes: explaining without an LLM, on purpose

Every score is translated into readable reasons with SHAP values:

```json
{
  "p_default": 0.87,
  "reason_codes": [
    "Most recent payment status: 2 month(s) overdue",
    "Latest monthly bill amount with atypical usage pattern"
  ]
}
```

Two design decisions I would defend in any committee:

1. **Reason codes are deterministic** — templates over SHAP values, not LLM-generated text. A denial explanation must be reproducible before a regulator: same input, same explanation, always.
2. **Direction is computed, not assumed.** My first version told a client with NT$2,500 of billing that their "billing was high" — a positive SHAP can come from high billing or from a nearly inactive account. Now every reason is checked against the portfolio median.

And a fairness contract turned into an automated test: protected or sensitive attributes (sex, age, marital status, education) **never** appear as a denial reason. There is a CI test that fails if that changes.

## Deep Learning, tried and ruled out with data

I trained a PyTorch MLP with the same split and metrics: AUC 0.771 against XGBoost's 0.780, and noticeably worse calibrated. It is the result the literature documents — on tabular data of this size, gradient boosting still wins. Choosing XGBoost was not a preference: it was a measurement.

## The big league: Home Credit

The final phase migrates the system to the industry's standard benchmark: **307,000 real applications across 7 relational tables** — external bureau, previous loans, installment payments, monthly balances. The hard work is feature engineering: ~80 aggregated features with a business reading (payment capacity ratios, historical approval rate, real average installment delay, card utilization).

Result: **AUC 0.783** with a single, interpretable model — the Kaggle competition winners reached ~0.80 with massive ensembles. And the most important sanity check: the dominant features (bureau scores, card utilization, installment delays) are exactly what a risk analyst would predict. The model learns what the business already knows — and quantifies it.

## Closing

The whole system ends in a Dockerized FastAPI with a `/score` endpoint returning probability, risk band and reason codes, plus an interactive Streamlit demo. The full code, commit by commit, is at [github.com/JonDScode/credit-risk-lab](https://github.com/JonDScode/credit-risk-lab).

<!-- lang:pt -->
O scoring de crédito é o problema de machine learning mais maduro e regulado da banca. Um modelo que prevê bem não chega: a regulação europeia (EBA, AI Act) exige poder **explicar cada decisão individual**. O [Credit Risk Lab](https://github.com/JonDScode/credit-risk-lab) é a minha resposta completa a esse problema, construída em cinco fases que se podem ler commit a commit.

## Baseline honesto antes de modelo espetacular

Comecei com 30.000 clientes reais (UCI) e dois modelos: uma regressão logística — o padrão interpretável do setor — e XGBoost. As métricas são as da casa: além do ROC AUC, o **KS statistic** (a métrica clássica de scorecards) e o Brier score para calibração.

| Modelo | ROC AUC | KS |
|--------|---------|-----|
| Regressão logística | 0.708 | 0.364 |
| XGBoost | 0.780 | 0.429 |

Um KS acima de 0.4 é território de scorecard forte. Mas o número não é o interessante — o interessante vem a seguir.

## Reason codes: explicar sem LLM, de propósito

Cada scoring traduz-se em motivos legíveis com SHAP values:

```json
{
  "p_default": 0.87,
  "reason_codes": [
    "Estado de pagamento do último mês: 2 mês(es) de atraso",
    "Montante faturado no último mês com padrão de uso atípico"
  ]
}
```

Duas decisões de design que defenderia em qualquer comité:

1. **Os reason codes são determinísticos** — templates sobre os SHAP values, não texto gerado por um LLM. Uma explicação de recusa deve ser reproduzível perante um regulador: mesmo input, mesma explicação, sempre.
2. **A direção calcula-se, não se assume.** A minha primeira versão dizia "faturação elevada" a um cliente com 2.500 NT$ de faturação — um SHAP positivo pode vir tanto de faturação alta como de uma conta quase inativa. Agora cada motivo é contrastado com a mediana da carteira.

E um contrato de fairness convertido em teste automatizado: os atributos protegidos ou sensíveis (sexo, idade, estado civil, educação) **nunca** aparecem como motivo de recusa. Há um teste em CI que falha se isso mudar.

## Deep Learning, testado e descartado com dados

Treinei um MLP em PyTorch com o mesmo split e as mesmas métricas: AUC 0.771 contra 0.780 do XGBoost, e bastante pior calibrado. É o resultado que a literatura documenta — em dados tabulares deste tamanho, o gradient boosting continua a ganhar. Escolher XGBoost não foi uma preferência: foi uma medição.

## A liga grande: Home Credit

A última fase migra o sistema para o benchmark padrão do setor: **307.000 pedidos reais em 7 tabelas relacionais** — bureau externo, créditos anteriores, pagamento de prestações, saldos mensais. O trabalho duro é o feature engineering: ~80 features agregadas com leitura de negócio (rácios de capacidade de pagamento, taxa de aprovação histórica, atraso médio real nas prestações, utilização de cartão).

Resultado: **AUC 0.783** com um modelo único e interpretável — os vencedores da competição do Kaggle rondaram 0.80 com ensembles massivos. E o sanity check mais importante: as features dominantes (scores de bureau, utilização de cartão, atrasos nas prestações) são exatamente as que um analista de risco preveria. O modelo aprende o que o negócio já sabe — e quantifica-o.

## Fecho

Todo o sistema termina numa API FastAPI dockerizada com um endpoint `/score` que devolve probabilidade, banda de risco e reason codes, mais uma demo interativa em Streamlit. O código completo, commit a commit, está em [github.com/JonDScode/credit-risk-lab](https://github.com/JonDScode/credit-risk-lab).

<!-- lang:fr -->
Le scoring de crédit est le problème de machine learning le plus mûr et le plus régulé de la banque. Un modèle qui prédit bien ne suffit pas : la réglementation européenne (EBA, AI Act) exige de pouvoir **expliquer chaque décision individuelle**. [Credit Risk Lab](https://github.com/JonDScode/credit-risk-lab) est ma réponse complète à ce problème, construite en cinq phases lisibles commit par commit.

## Une baseline honnête avant un modèle spectaculaire

J'ai commencé avec 30 000 clients réels (UCI) et deux modèles : une régression logistique — le standard interprétable du secteur — et XGBoost. Les métriques sont celles du métier : outre le ROC AUC, le **KS statistic** (la métrique classique des scorecards) et le Brier score pour la calibration.

| Modèle | ROC AUC | KS |
|--------|---------|-----|
| Régression logistique | 0.708 | 0.364 |
| XGBoost | 0.780 | 0.429 |

Un KS au-dessus de 0.4, c'est le territoire des scorecards solides. Mais le chiffre n'est pas l'intéressant — l'intéressant vient ensuite.

## Reason codes : expliquer sans LLM, à dessein

Chaque scoring se traduit en motifs lisibles avec les SHAP values :

```json
{
  "p_default": 0.87,
  "reason_codes": [
    "Statut de paiement du dernier mois : 2 mois de retard",
    "Montant facturé du dernier mois avec un profil d'usage atypique"
  ]
}
```

Deux décisions de conception que je défendrais devant n'importe quel comité :

1. **Les reason codes sont déterministes** — des templates sur les SHAP values, pas du texte généré par un LLM. Une explication de refus doit être reproductible devant un régulateur : même entrée, même explication, toujours.
2. **La direction se calcule, ne se suppose pas.** Ma première version disait "facturation élevée" à un client avec 2 500 NT$ de facturation — un SHAP positif peut venir d'une facturation élevée comme d'un compte quasi inactif. Désormais chaque motif est confronté à la médiane du portefeuille.

Et un contrat de fairness transformé en test automatisé : les attributs protégés ou sensibles (sexe, âge, état civil, éducation) n'apparaissent **jamais** comme motif de refus. Un test en CI échoue si cela change.

## Le Deep Learning, essayé et écarté avec des données

J'ai entraîné un MLP en PyTorch avec le même split et les mêmes métriques : AUC 0.771 contre 0.780 pour XGBoost, et nettement moins bien calibré. C'est le résultat que documente la littérature — sur du tabulaire de cette taille, le gradient boosting gagne encore. Choisir XGBoost n'était pas une préférence : c'était une mesure.

## La cour des grands : Home Credit

La dernière phase migre le système vers le benchmark standard du secteur : **307 000 demandes réelles sur 7 tables relationnelles** — bureau externe, crédits antérieurs, paiements d'échéances, soldes mensuels. Le vrai travail, c'est le feature engineering : ~80 features agrégées avec une lecture métier (ratios de capacité de paiement, taux d'approbation historique, retard moyen réel des échéances, utilisation de carte).

Résultat : **AUC 0.783** avec un modèle unique et interprétable — les vainqueurs de la compétition Kaggle ont atteint ~0.80 avec des ensembles massifs. Et le sanity check le plus important : les features dominantes (scores de bureau, utilisation de carte, retards d'échéances) sont exactement celles qu'un analyste risque prédirait. Le modèle apprend ce que le métier sait déjà — et le quantifie.

## Conclusion

Tout le système se termine par une API FastAPI dockerisée avec un endpoint `/score` renvoyant probabilité, bande de risque et reason codes, plus une démo interactive Streamlit. Le code complet, commit par commit, est sur [github.com/JonDScode/credit-risk-lab](https://github.com/JonDScode/credit-risk-lab).
