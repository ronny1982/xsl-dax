// NOTE: Does not work in FireFox!
export function prettyXML(data: string): string {
    const xmlDoc = new DOMParser().parseFromString(data, 'application/xml');
    const xsltDoc = new DOMParser().parseFromString(`
        <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
            <xsl:strip-space elements="*"/>
            <xsl:template match="para[content-style][not(text())]">
                <xsl:value-of select="normalize-space(.)"/>
            </xsl:template>
            <xsl:template match="node()|@*">
                <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>
            </xsl:template>
            <xsl:output indent="yes"/>
        </xsl:stylesheet>
    `, 'application/xml');
    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsltDoc);
    // De-serialize embedded XML content
    const nodes = xmlDoc.querySelectorAll('SerializedLabware, SerializedUIData');
    for(let node of nodes) {
        node.innerHTML = node.textContent || '';
    }
    return new XMLSerializer().serializeToString(xsltProcessor.transformToDocument(xmlDoc));
};