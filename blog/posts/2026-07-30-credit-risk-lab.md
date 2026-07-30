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
