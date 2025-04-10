var ctxCabecalho = "";
var ctxLinks = "";
var ctxHTML = "";

function configEstiloCabecalho() {
    const bg = document.getElementById("corFundo").value;
    const corFonte = document.getElementById("corFonte").value;
    const tamFonte = document.getElementById("tamFonte").value;
    const altura = document.getElementById("alturaCabecalho").value;
    const largura = document.getElementById("larguraCabecalho").value;

    ctxCabecalho = "#cabecalho {\n";
    ctxCabecalho += `  background-color: ${bg};\n`;
    ctxCabecalho += `  color: ${corFonte};\n`;
    ctxCabecalho += `  font-size: ${tamFonte}pt;\n`;

    if (altura) ctxCabecalho += `  height: ${altura}px;\n`;
    if (largura) ctxCabecalho += `  width: ${largura}%;\n`;

    ctxCabecalho += "}\n";

    return ctxCabecalho;
}

function configEstiloLinks() {
    const corLink = document.getElementById("corLinks").value;
    const estiloLinks = document.querySelector('input[name="estiloLinks"]:checked')?.value || "0";
    const hoverColor = document.getElementById("hoverColor").value;
    const altura = document.getElementById("alturaLinks").value;
    const largura = document.getElementById("larguraLinks").value;

    ctxLinks = "a {\n";
    ctxLinks += `  color: ${corLink};\n`;
    ctxLinks += `  text-decoration: ${estiloLinks === "1" ? "underline" : "none"};\n`;
    if (altura) ctxLinks += `  height: ${altura}px;\n`;
    if (largura) ctxLinks += `  width: ${largura}%;\n`;
    ctxLinks += "  display: inline-block;\n";
    ctxLinks += "  padding: 5px;\n";
    ctxLinks += "}\n";

    if (hoverColor) {
        ctxLinks += "a:hover {\n";
        ctxLinks += `  color: ${hoverColor};\n`;
        ctxLinks += "}\n";
    }

    return ctxLinks;
}

function configHtmlLinks() {
    const linksInput = document.querySelector("#links").value;
    const hrefInputs = document.querySelector("#href").files;

    // Verifique se o campo de links está vazio
    if (!linksInput.trim()) {
        return ""; // Retorna uma string vazia se não houver links
    }

    const vetLinks = linksInput.split(";");
    let html = "";

    for (let i = 0; i < vetLinks.length; i++) {
        const file = hrefInputs[i];
        const nomeArquivo = file ? file.name : "#";
        const texto = vetLinks[i] || "Link";

        html += `<a href="${nomeArquivo}">${texto}</a>\n`;
    }

    return html;
}

function configHTMLCabecalho() {
    const texto = document.querySelector("#textoCabecalho").value;
    return `<h1>${texto}</h1>`;
}

function gerarCodigo() {
    const codeCSS = document.querySelector("#codeCSS");
    const css = configEstiloCabecalho() + configEstiloLinks();
    codeCSS.value = css;

    const codeHTML = document.querySelector("#codeHTML");
    ctxHTML = "<!DOCTYPE html>\n<html>\n<head>\n";
    ctxHTML += "  <meta charset='UTF-8'>\n";
    ctxHTML += "  <title>Minha página</title>\n";
    ctxHTML += "  <link rel='stylesheet' href='estilo.css'>\n";
    ctxHTML += "</head>\n<body>\n";
    ctxHTML += `  <div id='cabecalho'>\n    ${configHTMLCabecalho()}\n  </div>\n`;

    // Só gera a seção de links se houver links configurados
    const htmlLinks = configHtmlLinks();
    if (htmlLinks) {
        ctxHTML += `  <nav id='links'>\n    ${htmlLinks}  </nav>\n`;
    }

    ctxHTML += "  <div id='conteudo'></div>\n";
    ctxHTML += "</body>\n</html>";
    codeHTML.value = ctxHTML;
}

function download(campo, nomeArquivo) {
    if (nomeArquivo.trim() === '') {
        nomeArquivo = document.getElementById('nomeHTML').value || 'pagina';
        nomeArquivo += '.html';
    }

    const text = document.getElementById(campo).value;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
