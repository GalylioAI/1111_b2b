/* ----------------------------------------------------------------------------
   Échelle d'axe « nice » — calcule des bornes et graduations arrondies qui
   contiennent toujours les données, afin que les libellés de l'axe vertical ne
   puissent jamais être inférieurs à la valeur tracée (la courbe ne déborde
   jamais en haut du graphique). Algorithme de Heckbert.
---------------------------------------------------------------------------- */

function niceNum(range: number, round: boolean): number {
  if (range <= 0) return 1;
  const exp = Math.floor(Math.log10(range));
  const f = range / 10 ** exp;
  const nf = round
    ? f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10
    : f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return nf * 10 ** exp;
}

export type NiceAxis = {
  min: number;
  max: number;
  ticks: number[];
  decimals: number;
};

/** Bornes/graduations arrondies qui englobent toutes les valeurs fournies. */
export function niceAxis(values: number[], targetTicks = 5): NiceAxis {
  let mn = Infinity;
  let mx = -Infinity;
  for (const v of values) {
    if (Number.isFinite(v)) {
      if (v < mn) mn = v;
      if (v > mx) mx = v;
    }
  }
  if (mn === Infinity) return { min: 0, max: 1, ticks: [0, 1], decimals: 0 };
  if (mn === mx) {
    const pad = mn === 0 ? 1 : Math.abs(mn) * 0.1;
    mn -= pad;
    mx += pad;
  }

  const spacing = niceNum(niceNum(mx - mn, false) / (targetTicks - 1), true);
  const min = Math.floor(mn / spacing) * spacing;
  const max = Math.ceil(mx / spacing) * spacing;
  const decimals = spacing >= 1 ? 0 : spacing >= 0.1 ? 1 : 2;

  const ticks: number[] = [];
  for (let t = min; t <= max + spacing * 0.5; t += spacing) {
    ticks.push(Number(t.toFixed(6)));
  }
  return { min, max, ticks, decimals };
}
