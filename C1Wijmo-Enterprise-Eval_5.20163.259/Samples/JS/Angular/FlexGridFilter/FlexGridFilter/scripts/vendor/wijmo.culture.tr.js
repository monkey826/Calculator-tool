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
 * Wijmo culture file: tr (Turkish)
 */
var wijmo;
(function (wijmo) {
    wijmo.culture = {
        Globalize: {
            name: 'tr',
            displayName: 'Turkish',
            numberFormat: {
                '.': ',',
                ',': '.',
                percent: { pattern: ['-%n', '%n'] },
                currency: { decimals: 2, symbol: '₺', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '.',
                ':': ':',
                firstDay: 1,
                days: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
                daysAbbr: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
                months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                monthsAbbr: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
                am: ['ÖÖ', 'Ö'],
                pm: ['ÖS', 'Ö'],
                eras: ['MS'],
                patterns: {
                    d: 'd.MM.yyyy', D: 'd MMMM yyyy dddd',
                    f: 'd MMMM yyyy dddd HH:mm', F: 'd MMMM yyyy dddd HH:mm:ss',
                    t: 'HH:mm', T: 'HH:mm:ss',
                    m: 'dd MMMM', M: 'dd MMMM',
                    y: 'MMMM yyyy', Y: 'MMMM yyyy',
                    g: 'd.MM.yyyy HH:mm', G: 'd.MM.yyyy HH:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} ürün seçilen'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} öğe)'
        },
        FlexGridFilter: {
            // filter
            ascending: '\u2191 Artan',
            descending: '\u2193 Azalan',
            apply: 'Uygula',
            clear: 'Temizle',
            conditions: 'Koşula Göre Filtrele',
            values: 'Değere Göre Filtrele',
            // value filter
            search: 'Ara',
            selectAll: 'Tümünü Seç',
            null: '(yok)',
            // condition filter
            header: 'Şu değere sahip öğeleri göster',
            and: 'Ve',
            or: 'Veya',
            stringOperators: [
                { name: '(ayarlanmamış)', op: null },
                { name: 'Eşittir', op: 0 },
                { name: 'Eşit değildir', op: 1 },
                { name: 'İle başlayan', op: 6 },
                { name: 'Son harfi', op: 7 },
                { name: 'İçerir', op: 8 },
                { name: 'İçermez', op: 9 }
            ],
            numberOperators: [
                { name: '(ayarlanmamış)', op: null },
                { name: 'Eşittir', op: 0 },
                { name: 'Eşit değildir', op: 1 },
                { name: 'Büyüktür', op: 2 },
                { name: 'Büyük veya eşittir', op: 3 },
                { name: 'Küçüktür', op: 4 },
                { name: 'Küçük veya eşittir', op: 5 }
            ],
            dateOperators: [
                { name: '(ayarlanmamış)', op: null },
                { name: 'Eşittir', op: 0 },
                { name: 'Öncesinde', op: 4 },
                { name: 'Sonrasında', op: 3 }
            ],
            booleanOperators: [
                { name: '(ayarlanmamış)', op: null },
                { name: 'Eşittir', op: 0 },
                { name: 'Eşit değildir', op: 1 }
            ]
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: 'Alan ayarları:',
                header: 'Başlık:',
                summary: 'Özeti:',
                showAs: 'Gibi görüntüler:',
                weighBy: 'Tarafından tartmak:',
                sort: 'Sıralama:',
                filter: 'Filtre:',
                format: 'Biçim:',
                sample: 'Örnek:',
                edit: 'Düzenle…',
                clear: 'Temizle',
                ok: 'Tamam',
                cancel: 'İptal',
                none: '(yok)',
                sorts: {
                    asc: 'Artan',
                    desc: 'Azalan'
                },
                aggs: {
                    sum: 'Toplam',
                    cnt: 'Sayı',
                    avg: 'Ortalama',
                    max: 'En Büyük',
                    min: 'dak',
                    rng: 'Aralık',
                    std: 'StdSapma',
                    var: 'Varyans',
                    stdp: 'StdDevPop',
                    varp: 'VarPop'
                },
                calcs: {
                    noCalc: 'Hesaplama Yok',
                    dRow: 'Önceki satırdan fark',
                    dRowPct: '% Fark önceki satırdan',
                    dCol: 'Önceki sütun arasındaki fark',
                    dColPct: '% Fark--dan önceki sütun',
                    dPctGrand: 'Genel toplam %',
                    dPctRow: 'satır toplam %',
                    dPctCol: 'sütunu toplamı %',
                    dRunTot: 'Toplam çalışan',
                    dRunTotPct: 'çalışan toplam %'
                },
                formats: {
                    n0: 'Tamsayı (n0)',
                    n2: 'Ondalık (n2)',
                    c: 'Para birimi (c)',
                    p0: 'Yüzde (p0)',
                    p2: 'Yüzde (p2)',
                    n2c: 'Binlerce (n2,)',
                    n2cc: 'Milyonlarca (n2,,)',
                    n2ccc: 'Milyarlarca (n2,,,)',
                    d: 'Tarih (d)',
                    MMMMddyyyy: 'Ay gün yıl (AAAA gg, yyyy)',
                    dMyy: 'Gün ay yıl (d/M/yıl)',
                    ddMyy: 'Gün ay yıl (gg/M/yy)',
                    dMyyyy: 'Gün ay yıl (gg/M/yyyy)',
                    MMMyyyy: 'Ay yıl (MMM yyyy)',
                    MMMMyyyy: 'Ay yıl (AAAA yyyy)',
                    yyyyQq: 'Yıl Mahallesi (yyyy "Q" q)',
                    FYEEEEQU: 'Mali yıl çeyrek ("My" EEEE "Q" U)'
                }
            },
            PivotEngine: {
                grandTotal: 'Genel Toplam',
                subTotal: 'Alt Toplam'
            },
            PivotPanel: {
                fields: 'Rapora eklenecek alanları seçin:',
                drag: 'Alanları aşağıdaki bölgeler arasında sürükleyin:',
                filters: 'Filtreler',
                cols: 'Sütunlar',
                rows: 'Satırlar',
                vals: 'Değerler',
                defer: 'Güncelleştirmeleri erteleme',
                update: 'Güncelleştir'
            },
            _ListContextMenu: {
                up: 'Yukarı Taşı',
                down: 'Aşağı Taşı',
                first: 'Başlangıca Taşı',
                last: 'Sona taşı',
                filter: 'Rapor Filtresine Taşı',
                rows: 'Satır Etiketlerine Taşı',
                cols: 'Sütun Etiketlerine Taşı',
                vals: 'Değerlere Taşı',
                remove: 'Alanı Kaldır',
                edit: 'Alan Ayarları…',
                detail: 'Ayrıntı göster…'
            },
            PivotChart: {
                by: 'ölçüt',
                and: 'ile'
            },
            DetailDialog: {
                header: 'Ayrıntı görünümü:',
                ok: 'Tamam',
                items: '{cnt:n0} bileşen',
                item: '{cnt} öğesi',
                row: 'Satır',
                col: 'Sütun'
            }
        },
        Viewer: {
            cancel: 'İptal',
            ok: 'Tamam',
            bottom: 'Alttan:',
            top: 'Üstten:',
            right: 'Sağ:',
            left: 'Sol:',
            margins: 'Kenar Boşlukları (inç)',
            orientation: 'Oryantasyon:',
            paperKind: 'Kağıt türü:',
            pageSetup: 'Sayfa Düzeni',
            landscape: 'Yatay',
            portrait: 'Dikey',
            pageNumber: 'Sayfa Numarası',
            zoomFactor: 'Yakınlaştırma faktörü',
            paginated: 'Yazdırma Düzeni',
            print: 'Yazdır',
            search: 'Ara',
            matchCase: 'Büyük-küçük harf eşleştir',
            wholeWord: 'Sadece tam sözcükleri eşleştir',
            searchResults: 'Arama sonuçları',
            previousPage: 'Önceki Sayfa',
            nextPage: 'Sonraki Sayfa',
            firstPage: 'İlk Sayfa',
            lastPage: 'Son Sayfa',
            backwardHistory: 'Geri',
            forwardHistory: 'İleri',
            pageCount: 'Sayfa Sayısı',
            selectTool: 'Aracını seçin',
            moveTool: 'Taşıma aracı',
            continuousMode: 'Sürekli sayfa görünümü',
            singleMode: 'Tek sayfa görünümü',
            wholePage: 'Tüm Sayfaya Sığdır',
            pageWidth: 'Sayfa genişliğine sığdırma',
            zoomOut: 'Küçült',
            zoomIn: 'Büyüt',
            exports: 'Dışarı Aktar',
            fullScreen: 'Tam Ekran',
            exitFullScreen: 'Tam Ekrandan Çık',
            thumbnails: 'Sayfa minik resimleri',
            outlines: 'Belge Bağlantıları',
            loading: 'Yükleniyor…',
            pdfExportName: 'Adobe PDF',
            docxExportName: 'Açık XML Word',
            xlsxExportName: 'Açık XML Excel',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: 'Web arşivi (MHTML)',
            htmlExportName: 'HTML belgesi',
            rtfExportName: 'RTF belgesi',
            metafileExportName: 'Sıkıştırılmış meta dosyaları',
            csvExportName: 'CSV',
            tiffExportName: 'TIFF görüntüleri',
            bmpExportName: 'BMP resimleri',
            emfExportName: 'Gelişmiş Meta dosyası',
            gifExportName: 'GIF resimleri',
            jpgExportName: 'JPEG görüntüleri',
            jpegExportName: 'JPEG görüntüleri',
            pngExportName: 'PNG resimleri',
            parameters: 'Parameters',
            requiringParameters: 'Lütfen giriş parametreleri.',
            nullParameterError: 'Değer null olamaz.',
            invalidParameterError: 'Geçersiz giriş.',
            parameterNoneItemsSelected: '(yok)',
            parameterAllItemsSelected: '(tümü)',
            parameterSelectAllItemText: '(Tümünü Seç)',
            selectParameterValue: '(değer seçin)',
            apply: 'Uygula',
            errorOccured: 'Hata oluştu.'
        }
    };
    var updc = window['wijmo']._updateCulture;
    if (updc) {
        updc();
    }
})(wijmo || (wijmo = {}));
;

