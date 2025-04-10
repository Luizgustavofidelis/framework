let linkCounter = 1;  // Contador para gerar IDs únicos para os links

document.getElementById("addLinkButton").addEventListener("click", function () {
    // Cria novos campos de entrada para links e arquivos
    const newLinkInput = document.createElement("input");
    newLinkInput.type = "text";
    newLinkInput.name = "links";
    newLinkInput.id = `links-${linkCounter}`;
    newLinkInput.placeholder = `link${linkCounter + 1}`;

    const newFileInput = document.createElement("input");
    newFileInput.type = "file";
    newFileInput.name = "href";
    newFileInput.id = `href-${linkCounter}`;

    // Adiciona os novos campos ao DOM
    const container = document.getElementById("addLinkButton").parentElement;
    container.insertBefore(newLinkInput, container.querySelector("label"));
    container.insertBefore(newFileInput, container.querySelector("label"));
    
    linkCounter++;
});

function configHtmlLinks() {
    const linksHtml = [];
    let linkIndex = 0;

    while (document.getElementById(`links-${linkIndex}`)) {
        const linksInput = document.querySelector(`#links-${linkIndex}`).value;
        const hrefInput = document.querySelector(`#href-${linkIndex}`).files[0];

        // Verifique se o campo de links está vazio
        if (!linksInput.trim()) {
            linkIndex++;
            continue; // Pula para o próximo link, caso o campo esteja vazio
        }

        const nomeArquivo = hrefInput ? hrefInput.name : "#";
        const texto = linksInput || "Link";

        linksHtml.push(`<a href="${nomeArquivo}">${texto}</a>\n`);
        linkIndex++;
    }

    return linksHtml.join("");  // Concatena todos os links configurados em um único HTML
}

function configEstiloCabecalho() {
    const bg = document.getElementById("corFundo").value;
    const corFonte = document.getElementById("corFonte").value;
    const tamFonte = document.getElementById("tamFonte").value;
    const altura = document.getElementById("alturaCabecalho").value;
    const largura = document.getElementById("larguraCabecalho").value;

    let ctxCabecalho = "#cabecalho {\n";
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
    const bgColorLinks = document.getElementById("bgColorLinks").value;
    const altura = document.getElementById("alturaLinks").value;
    const largura = document.getElementById("larguraLinks").value;

    let ctxLinks = "a {\n";
    ctxLinks += `  color: ${corLink};\n`;
    ctxLinks += `  background-color: ${bgColorLinks};\n`;
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

function configHTMLCabecalho() {
    const texto = document.querySelector("#textoCabecalho").value;
    return `<h1>${texto}</h1>`;
}

function gerarCodigo() {
    const codeCSS = document.querySelector("#codeCSS");
    const css = configEstiloCabecalho() + configEstiloLinks();
    codeCSS.value = css;

    const codeHTML = document.querySelector("#codeHTML");
    let ctxHTML = "<!DOCTYPE html>\n<html>\n<head>\n";
    ctxHTML += "  <meta charset='UTF-8'>\n";
    ctxHTML += "  <title>Minha página</title>\n";
    ctxHTML += "  <link rel='stylesheet' href='estilo.css'>\n";
    ctxHTML += "</head>\n<body>\n";
    ctxHTML += `  <div id='cabecalho'>\n    ${configHTMLCabecalho()}\n  </div>\n`;

    // Só gera a seção de links se houver links configurados
    const htmlLinks = configHtmlLinks();
    if (htmlLinks) {
        ctxHTML += `  <nav id='links'>\n    ${htmlLinks}\n  </nav>\n`;
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
    const conteudo = document.getElementById(campo).value;
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo;
    a.click();
}
