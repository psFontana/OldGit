// Classe base com o método Template
class ReportGenerator {
  constructor() {
    // Não usamos mais o DOM, nem o parâmetro containerId
  }

  // Método Template
  generateReport(content) {
    this.clearContainer();
    this.openDocument();
    this.addContent(content);
    this.saveDocument();
  }

  clearContainer() {
    console.log("Limpar conteúdo do relatório...");
  }

  // Métodos abstratos que as subclasses devem implementar
  openDocument() {
    throw new Error("Este método deve ser implementado pela subclasse.");
  }

  addContent(content) {
    throw new Error("Este método deve ser implementado pela subclasse.");
  }

  saveDocument() {
    throw new Error("Este método deve ser implementado pela subclasse.");
  }
}

// Subclasse para relatórios em PDF (simulação)
class PDFReport extends ReportGenerator {
  openDocument() {
    console.log("<h2>Relatório PDF</h2>");
  }

  addContent(content) {
    console.log(`<p>${content}</p>`);
  }

  saveDocument() {
    console.log("<p><strong>Relatório PDF gerado com sucesso.</strong></p>");
  }
}

// Subclasse para relatórios em HTML
class HTMLReport extends ReportGenerator {
  openDocument() {
    console.log("<h2>Relatório HTML</h2>");
  }

  addContent(content) {
    console.log(`<p>${content}</p>`);
  }

  saveDocument() {
    console.log("<p><strong>Relatório HTML gerado com sucesso.</strong></p>");
  }
}

// Função para gerar relatório baseado na escolha do usuário
function generateUserReport(format, content) {
  let report;
  if (format === "PDF") {
    report = new PDFReport();
  } else if (format === "HTML") {
    report = new HTMLReport();
  } else {
    alert("Formato inválido! Escolha PDF ou HTML.");
    return;
  }

  report.generateReport(content);
}

// Exemplo de uso

// Instanciando a classe HTMLReport
let sla = new HTMLReport();

// Adicionando conteúdo ao relatório
sla.addContent(
  "Este é um conteúdo longo para testar a geração de relatório HTML."
);

// Chamando a função para gerar o relatório com o conteúdo adicionado
generateUserReport("HTML", "Este é o conteúdo gerado para o relatório HTML.");
