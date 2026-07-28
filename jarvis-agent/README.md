# Jarvis Agent releases

Canal público y orientado a máquinas para distribuir Jarvis Agent.

## Canales

- `update/candidate.json`: release candidata para validar instalación y self-update.
- `update/stable.json`: canal estable. Se publicará después de superar las pruebas reales
  de Windows y macOS.

Los manifests son JSON puro. Cada artefacto declara tamaño y SHA-256. Los ZIP son
genéricos: no contienen `.env`, tokens, pairing codes ni configuración privada.

## Release 0.3.0

La primera instalación desde 0.2.9 es manual. Una vez instalada 0.3.0, el agente puede
descubrir versiones posteriores mediante el manifest configurado.

Para probar el canal candidato:

```text
JARVIS_AGENT_UPDATE_URL=https://asvgithub01.github.io/nuborisar.github.io/jarvis-agent/update/candidate.json
JARVIS_AGENT_UPDATE_CHANNEL=candidate
```

No debe promoverse `candidate.json` a `stable.json` hasta validar los dos sistemas
operativos y el rollback con una versión candidata posterior.
