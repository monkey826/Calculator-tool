﻿/*
    *
    * Wijmo Library 5.20163.259
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
/*
 * Wijmo culture file: de (German)
 */
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            name: 'de',
            displayName: 'German',
            numberFormat: {
                '.': ',',
                ',': '.',
                percent: { pattern: ['-n %', 'n %'] },
                currency: { decimals: 2, symbol: '€', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '.',
                ':': ':',
                firstDay: 1,
                days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                daysAbbr: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                monthsAbbr: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                am: ['', ''],
                pm: ['', ''],
                eras: ['n. Chr.'],
                patterns: {
                    d: 'dd.MM.yyyy', D: 'dddd, d. MMMM yyyy',
                    f: 'dddd, d. MMMM yyyy HH:mm', F: 'dddd, d. MMMM yyyy HH:mm:ss',
                    t: 'HH:mm', T: 'HH:mm:ss',
                    m: 'd. MMMM', M: 'd. MMMM',
                    y: 'MMMM yyyy', Y: 'MMMM yyyy',
                    g: 'dd.MM.yyyy HH:mm', G: 'dd.MM.yyyy HH:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} Artikel ausgewählt'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} Elemente)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 Aufsteigend',
            descending: '\u2193 Absteigend',
            apply: 'Anwenden',
            clear: 'Löschen',
            conditions: 'Nach Zustand filtern',
            values: 'Nach Wert filtern',
            // value filter
            search: 'Suche',
            selectAll: 'Alles auswählen',
            null: '(nichts)',
            // condition filter
            header: 'Zeige Elemente mit dem Wert',
            and: 'Und',
            or: 'Oder',
            stringOperators: [
                { name: '(nicht eingestellt)', op: null },
                { name: 'Ist gleich', op: 0 },
                { name: 'Ist nicht gleich', op: 1 },
                { name: 'Fängt an mit', op: 6 },
                { name: 'Endet mit', op: 7 },
                { name: 'Enthält', op: 8 },
                { name: 'Enthält nicht', op: 9 }
            ],
            numberOperators: [
                { name: '(nicht eingestellt)', op: null },
                { name: 'Ist gleich', op: 0 },
                { name: 'Ist nicht gleich', op: 1 },
                { name: 'Ist größer als', op: 2 },
                { name: 'Ist größer als oder gleich', op: 3 },
                { name: 'Weniger als', op: 4 },
                { name: 'Kleiner oder gleich', op: 5 }
            ],
            dateOperators: [
                { name: '(nicht eingestellt)', op: null },
                { name: 'Ist gleich', op: 0 },
                { name: 'Ist vor', op: 4 },
                { name: 'ist nach', op: 3 }
            ],
            booleanOperators: [
                { name: '(nicht eingestellt)', op: null },
                { name: 'Ist gleich', op: 0 },
                { name: 'Ist nicht gleich', op: 1 }
            ]
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: 'Feldeinstellungen:',
                header: 'Header:',
                summary: 'Zusammenfassung:',
                showAs: 'Zeigen Sie als an:',
                weighBy: 'Wiegen von:',
                sort: 'Sortieren:',
                filter: 'Filter:',
                format: 'Formatierung:',
                sample: 'Sampling:',
                edit: 'Bearbeiten…',
                clear: 'Löschen',
                ok: 'OK',
                cancel: 'Abbrechen',
                none: '(kein)',
                sorts: {
                    asc: 'Aufsteigend',
                    desc: 'Absteigend'
                },
                aggs: {
                    sum: 'Summe',
                    cnt: 'Anzahl',
                    avg: 'Mittelwert',
                    max: 'Max',
                    min: 'Min.',
                    rng: 'Bereich',
                    std: 'Standardabweichung (Stichprobe)',
                    var: 'Varianz',
                    stdp: 'StdDevPop',
                    varp: 'VarPop'
                },
                calcs: {
                    noCalc: 'Keine Berechnung',
                    dRow: 'Unterschied zu vorherigen Zeile',
                    dRowPct: '% Unterschied zu vorherigen Zeile',
                    dCol: 'Unterschied zu vorherigen Spalte',
                    dColPct: '% Unterschied zu vorherigen Spalte',
                    dPctGrand: '% der Gesamtsumme',
                    dPctRow: '% der gesamten Zeile',
                    dPctCol: '% der Spalte Gesamt',
                    dRunTot: 'Laufende Summe',
                    dRunTotPct: 'laufende Summe %'
                },
                formats: {
                    n0: 'Ganzzahl (n0)',
                    n2: 'Schwimmer (n2)',
                    c: 'Währung (c)',
                    p0: 'Prozentsatz (p0)',
                    p2: 'Prozentsatz (p2)',
                    n2c: 'Tausende (n2)',
                    n2cc: 'Millionen (n2),,',
                    n2ccc: 'Milliarden (n2,,,)',
                    d: 'Datum (d)',
                    MMMMddyyyy: 'Monat Tag Jahr (MMMM Dd, Yyyy)',
                    dMyy: 'Tag Monat Jahr (d/M/Yy)',
                    ddMyy: 'Tag Monat Jahr (Dd/M/Yy)',
                    dMyyyy: 'Tag Monat Jahr (M/TT/JJJJ)',
                    MMMyyyy: 'Monat Jahr (MMM Yyyy)',
                    MMMMyyyy: 'Monat Jahr (MMMM Yyyy)',
                    yyyyQq: 'Quartal des Jahres (Yyyy "Q" Q)',
                    FYEEEEQU: 'Geschäftsjahr-Viertel ("FY" EEEE "Q" U)'
                }
            },
            PivotEngine: {
                grandTotal: 'Gesamtsumme',
                subTotal: 'Teilergebnis'
            },
            PivotPanel: {
                fields: 'Wählen Sie Felder zum Bericht hinzufügen:',
                drag: 'Felder zwischen den Bereichen unten ziehen:',
                filters: 'Filter',
                cols: 'Spalten',
                rows: 'Zeilen',
                vals: 'Werte',
                defer: 'Updates zu verschieben',
                update: 'Aktualisieren'
            },
            _ListContextMenu: {
                up: 'Nach oben',
                down: 'Nach unten',
                first: 'An den Anfang',
                last: 'Zum Ende bewegen',
                filter: 'Wechseln zu Berichtsfilter',
                rows: 'Wechseln zu Zeilenbeschriftungen',
                cols: 'Wechseln zu Spaltenbeschriftungen',
                vals: 'Wechseln zu Werten',
                remove: 'Feld entfernen',
                edit: 'Feldeinstellungen…',
                detail: 'Details anzeigen…'
            },
            PivotChart: {
                by: 'von',
                and: 'und'
            },
            DetailDialog: {
                header: 'Detailansicht:',
                ok: 'OK',
                items: '{cnt:n0} Elemente',
                item: '{cnt} Element',
                row: 'ROW',
                col: 'Spalte'
            }
        },
        Viewer: {
            cancel: 'Abbrechen',
            ok: 'OK',
            bottom: 'Unten:',
            top: 'Oben:',
            right: 'Rechts:',
            left: 'Links:',
            margins: 'Ränder (Zoll)',
            orientation: 'Orientierung:',
            paperKind: 'Papierart:',
            pageSetup: 'Seiteneinrichtung',
            landscape: 'Querformat',
            portrait: 'Hochformat',
            pageNumber: 'Seitenzahl',
            zoomFactor: 'Zoom-Faktor',
            paginated: 'Drucklayout',
            print: 'Drucken',
            search: 'Suche',
            matchCase: 'Groß-/Kleinschreibung beachten',
            wholeWord: 'Nur ganzes Wort suchen',
            searchResults: 'Suchergebnisse',
            previousPage: 'Vorherige Seite',
            nextPage: 'Nächste Seite',
            firstPage: 'Erste Seite',
            lastPage: 'Letzte Seite',
            backwardHistory: 'Rückwärts',
            forwardHistory: 'Vorwärts',
            pageCount: 'Seitenanzahl',
            selectTool: 'Werkzeug auswählen',
            moveTool: 'Verschieben-Werkzeug',
            continuousMode: 'Kontinuierliche Seitenansicht',
            singleMode: 'Seite Einzelansicht',
            wholePage: 'Fit ganze Seite',
            pageWidth: 'Seitenbreite passen',
            zoomOut: 'Verkleinern Sie die Ansicht',
            zoomIn: 'Zoom In',
            exports: 'Exportieren',
            fullScreen: 'Vollbild',
            exitFullScreen: 'Vollbildmodus beenden',
            thumbnails: 'Seitenminiaturen',
            outlines: 'Dokumentstruktur',
            loading: 'Werden geladen…',
            pdfExportName: 'Adobe-PDF',
            docxExportName: 'Open XML-Wort',
            xlsxExportName: 'Open XML-Excel',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: 'Webarchiv (MHTML)',
            htmlExportName: 'HTML-Dokument',
            rtfExportName: 'RTF-Dokument',
            metafileExportName: 'Komprimierte Metadateien',
            csvExportName: 'CSV',
            tiffExportName: 'TIFF-Bilder',
            bmpExportName: 'BMP-Bilder',
            emfExportName: 'Erweiterte Metadatei',
            gifExportName: 'GIF-Bilder',
            jpgExportName: 'JPEG-Bilder',
            jpegExportName: 'JPEG-Bilder',
            pngExportName: 'PNG-Bilder',
            parameters: 'Parameter',
            requiringParameters: 'Bitte geben Sie Parameter.',
            nullParameterError: 'Der Wert darf nicht NULL sein.',
            invalidParameterError: 'Ungültige Eingabe.',
            parameterNoneItemsSelected: '(kein)',
            parameterAllItemsSelected: '(alle)',
            parameterSelectAllItemText: '(Alle auswählen)',
            selectParameterValue: '(Wählen Sie Wert)',
            apply: 'Anwenden',
            errorOccured: 'Es ist ein Fehler aufgetreten.'
        }
    };
    var updc = window['wijmo']._updateCulture;
    if (updc) {
        updc();
    }
})(wijmo || (wijmo = {}));
;

