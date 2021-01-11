export enum AvailableMimeTypes {
    bin = 'application/octet-stream',
    json = 'application/json',
    xml = 'application/xml',
    txt = 'text/plain',
    png = 'image/png',
    bmp = 'image/bmp',
    cpp = 'application/x-cplusplus'
}

export const ExtensionMimeTypes = {
    bin: AvailableMimeTypes.bin,
    json: AvailableMimeTypes.json,
    xml: AvailableMimeTypes.xml,
    txt: AvailableMimeTypes.txt,
    png: AvailableMimeTypes.png,
    bmp: AvailableMimeTypes.bmp,
    hxx: AvailableMimeTypes.cpp
};