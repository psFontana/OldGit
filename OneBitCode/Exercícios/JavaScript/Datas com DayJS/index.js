let dayjs = require("dayjs");

function dia(dd, mm, yyyy) {
  let hoje = dayjs();
  let nascimento = dayjs()
    .set("date", dd)
    .set("month", mm - 1)
    .set("year", yyyy);
  let idade = hoje.diff(nascimento, "year");
  let aniversario = nascimento.add(idade + 1, "year");
  console.log(`Sua Data de nascimento informada foi: ${nascimento.format(
    "DD/MMMM/YYYY"
  )}
  Tendo como base essa informação como correta podemos dizer que:
  Sua idade atual é: ${idade}
  Seu próximo aniversário é no dia ${aniversario.format(
    "DD/MM/YYYY"
  )}, daqui ${aniversario.diff(hoje, "days")} dias`);
}
dia(27, 05, 2005);
