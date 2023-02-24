function sum(...numbers) {
  return numbers.reduce((accum, num) => accum + num, 0);
}

function mediaAritmetica(...numbers) {
  return (
    numbers.reduce(
      (valorAcumuladoAposSoma, NumeroAtual) =>
        valorAcumuladoAposSoma + NumeroAtual,
      0 /*numero inicial*/
    ) / numbers.length
  );
}

function mediaPonderada(...entries) {
  const sum = entries.reduce(
    (accum, { num, weight }) => accum + num * (weight ?? 1),
    0
  );
  const weightSum = entries.reduce(
    (accum, entry) => accum + (entry.weight ?? 1),
    0
  );
  return sum / weightSum;
}

function mediana(...num) {
  let numOrg = num.sort(function (a, b) {
    return a - b;
  });

  if (numOrg.length % 2 !== 0) {
    return numOrg[(numOrg.length - 1) / 2];
  } else {
    return (numOrg[numOrg.length / 2] + numOrg[numOrg.length / 2 - 1]) / 2;
  }
}

function moda(...numbers) {
  let quantidade = numbers.map((num) => [
    num,
    numbers.filter((n) => num === n).length,
  ]);
  quantidade.sort((a, b) => b[1] - a[1]);
  return quantidade[0][0];
}
