(this.webpackJsonpletzebuergesch=this.webpackJsonpletzebuergesch||[]).push([[0],{45:function(e,n,t){},46:function(e,n,t){},59:function(e,n,t){"use strict";t.r(n);var r,a,o=t(0),i=t.n(o),c=t(31),l=t.n(c),s=(t(45),t(37)),u=t(2),d=(t(46),t(4)),h=t(1),f={shades:{text:"#021216",selectedText:"#02161b",border:"#808080",separation:"#808080",boxShadow:"#C0C0C0"},colors:{cardBackground:"#f3fbfe",highlight:"#ff3554"},sizes:{font:{welcome:"60px",headline:"40px",subHeadline:"28px",text:"20px",smallText:"16px"},width:{content:"70%"},height:{selection:"32px"},borderRadius:{selection:"16px"}},padding:{}},p=o.createContext(f);function b(){return o.useContext(p)}function m(e){var n=b(),t=Object(h.a)(r||(r=Object(d.a)(["\n    label: background;\n    background-color: ",";\n    height: 100%;\n  "])),n.colors.cardBackground);return Object(h.b)("div",{css:t},e.children)}function v(e){var n=Object(h.a)(a||(a=Object(d.a)(["\n    label: clear-styles;\n    \n    height: 100%;\n\n    ","\n    a {\n      color: inherit;\n      text-decoration: none; /* no underline */\n    }\n  "])),"");return Object(h.b)("div",{css:n},e.children)}var g,x=t(38),k=t(33),E=t(19),O=t(61);!function(e){e.en="en",e.de="de"}(g||(g={}));x.a.use(k.a).use(E.e).init({fallbackLng:"en",resources:{de:{translation:{welcome:"Willkommen bei project template!",artikeleMatchenInstruction:"Bitte warten Sie, w\xe4hrend die Daten geladen werden."}},en:{translation:{welcome:"Welcome to project template!",artikeleMatchenInstruction:"Please wait while the data is being fetched."}}}});var C,w=t(11),j=t(26),D=t(10);function y(e,n){return Object(h.a)(C||(C=Object(d.a)(["\n    label: dropdown-component;\n\n    .header {\n      cursor: pointer;\n\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n\n      color: ",";\n      font-size: ",";\n\n      .label {\n        margin: 8px 8px 8px ",";\n      }\n    }\n\n    .items {\n      position: absolute;\n      display: flex;\n      flex-direction: column;\n      background-color: white;\n      box-shadow: 5px 5px 11px -2px ",";\n\n      border-radius: 4px;\n      border-top-left-radius: 0;\n      overflow: hidden;\n    }\n\n    .item {\n      padding: 4px 12px;\n      font-size: ",";\n\n      &.selected {\n        color: ",";\n        background-color: ",";\n      }\n\n      &:hover {\n        color: ",";\n        background-color: ",';\n      }\n\n      input[type="checkbox"] {\n        cursor: pointer;\n      }\n\n      label {\n        margin: 8px 0;\n      }\n    }\n  '])),e.shades.text,e.sizes.font.text,n>0?"2px":"4px",e.shades.boxShadow,e.sizes.font.smallText,e.shades.text,e.colors.cardBackground,e.shades.text,e.colors.cardBackground)}function N(e){var n=o.useState(!1),t=Object(D.a)(n,2),r=t[0],a=t[1],i=o.useCallback((function(){return a(!r)}),[r,a]),c=o.useCallback((function(n){return e.onSelect(n)}),[e]),l=b(),s=o.useMemo((function(){return e.items.filter((function(e){return e.selected})).length}),[e]);return Object(h.b)("div",{css:y(l,s)},Object(h.b)("div",{className:"header",onClick:i},s>0&&Object(h.b)("div",{className:"number-selected"},s),Object(h.b)("div",{className:"label"},e.label)),r&&Object(h.b)("div",{className:"items"},e.items.map((function(e){return function(e){var n=e.id,t=e.label,r=e.selected,a=e.onClick;return Object(h.b)("div",{key:"".concat(n,"-").concat(t),className:"item"},Object(h.b)("input",{type:"checkbox",name:n,checked:r,onChange:function(){return a(n)}}),Object(h.b)("label",{htmlFor:n},t))}(Object(j.a)(Object(j.a)({},e),{},{onClick:c}))}))))}function S(e){var n=o.useState((new Date).getUTCMilliseconds()),t=Object(D.a)(n,2)[1],r=o.useCallback((function(){return t((new Date).getUTCMilliseconds())}),[t]);o.useEffect((function(){return e.registerOnUpdateCallback(r),function(){return e.removeOnUpdateCallback(r)}}),[e,r])}var A,z=t(14),T=t(15),R=t(40),P=t(39),H=t(22),L=t.n(H);!function(e){e.UPDATED="UPDATED"}(A||(A={}));var M,U=function(){function e(n){Object(z.a)(this,e),this.initialData=n,this.currentData=void 0,this.updateEmitter=new L.a,this.currentData=n}return Object(T.a)(e,[{key:"reset",value:function(){this.updateEmitter.removeAllListeners(),this.currentData=this.initialData}},{key:"produceNewData",value:function(e){this.currentData=e(this.currentData),this.updateEmitter.emit(A.UPDATED)}},{key:"getCurrentData",value:function(){return this.currentData}},{key:"getCurrentDataAdapted",value:function(){return this.adaptData(this.currentData)}},{key:"registerOnUpdateCallback",value:function(e){this.updateEmitter.on(A.UPDATED,e)}},{key:"removeOnUpdateCallback",value:function(e){this.updateEmitter.off(A.UPDATED,e)}}]),e}();!function(e){e.UPDATED="UPDATED"}(M||(M={}));var I,W=function(){function e(n){Object(z.a)(this,e),this.config=n,this.response=void 0,this.fetchPromise=void 0,this.fetchError=void 0,this.updateEmitter=new L.a,this.wrapFetch()}return Object(T.a)(e,[{key:"wrapFetch",value:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.response&&!n||(this.fetchPromise=this.config.fetch().then((function(n){return e.onFetchPromiseResult(n)}),(function(n){return e.fetchError=n})))}},{key:"onFetchPromiseResult",value:function(e){this.response=e,this.fetchPromise=void 0,this.updateEmitter.emit(M.UPDATED)}},{key:"get",value:function(){var e;if(this.fetchError)throw this.fetchError;if(this.fetchPromise)throw this.fetchPromise;return null!==(e=this.response)&&void 0!==e?e:{}}},{key:"refresh",value:function(){this.fetchError=void 0,this.fetchPromise=void 0,this.wrapFetch(!0)}},{key:"registerOnUpdateCallback",value:function(e){this.updateEmitter.on(M.UPDATED,e)}},{key:"removeOnUpdateCallback",value:function(e){this.updateEmitter.off(M.UPDATED,e)}}]),e}();!function(e){e.WEIBLECH="WEIBLECH",e.MAENNLECH="MAENNLECH",e.SAECHLECH="SAECHLECH"}(I||(I={}));var F,B="https://sheets.googleapis.com/v4/spreadsheets/",K="1XmFamG1heiKzXAw1mAy4sYz4-RHTXCCbyQ7kSGKXKD8",_="key=AIzaSyCT_QOJe1zwRcSQUpFMFwSsxNqfOS_nRs4",X=new(function(e){Object(R.a)(t,e);var n=Object(P.a)(t);function t(e){var r;return Object(z.a)(this,t),(r=n.call(this,e)).cellFetchCallback=function(){r.produceNewData((function(e){return{spreadSheetRoot:e.spreadSheetRoot,spreadSheetCellRoot:new W({fetch:function(e){function n(){return e.apply(this,arguments)}return n.toString=function(){return e.toString()},n}((function(){return fetch("".concat(B).concat(K,"/values/A2:E").concat(e.spreadSheetRoot.get().sheets[0].properties.gridProperties.rowCount,"?").concat(_)).then((function(e){return e.json()}))}))})}})),setTimeout((function(){return r.removeOnUpdateCallback(r.cellFetchCallback)}),0)},e.spreadSheetRoot.registerOnUpdateCallback(r.cellFetchCallback),r}return Object(T.a)(t,[{key:"adaptData",value:function(e){var n,t,r=this;return{words:null!==(n=null===(t=e.spreadSheetCellRoot)||void 0===t?void 0:t.get().values.map((function(e){var n=Object(D.a)(e,5),t=n[0],a=n[1],o=n[2],i=n[3],c=n[4];return{sex:r.adaptSex(t),singular:a,translation:o,book:i,chapter:c}})))&&void 0!==n?n:[]}}},{key:"adaptSex",value:function(e){switch(e){case"maennlech":return I.MAENNLECH;case"weiblech":return I.WEIBLECH;case"saechlech":return I.SAECHLECH}}}]),t}(U))({spreadSheetRoot:new W({fetch:function(e){function n(){return e.apply(this,arguments)}return n.toString=function(){return e.toString()},n}((function(){return fetch("".concat(B).concat(K,"?").concat(_)).then((function(e){return e.json()}))}))})}),J=Object(w.proxy)({booksAndChapters:[]});function Q(){S(X);var e=o.useCallback((function(){J.booksAndChapters=X.getCurrentDataAdapted().words.map((function(e){var n=e.book,t=e.chapter;return{id:"".concat(n).concat("-").concat(t),book:n,chapter:t,selected:!0}})).filter((function(e,n,t){return t.findIndex((function(n){return n.id===e.id}))===n}))}),[]);o.useEffect((function(){var n;return null===(n=X.getCurrentData().spreadSheetCellRoot)||void 0===n||n.registerOnUpdateCallback(e),function(){var n;return null===(n=X.getCurrentData().spreadSheetCellRoot)||void 0===n?void 0:n.removeOnUpdateCallback(e)}}),[X.getCurrentData().spreadSheetCellRoot,e]);var n=Object(w.useSnapshot)(J);return Object(h.b)(N,{items:n.booksAndChapters.map((function(e){return{id:e.id,label:"".concat(e.book," ").concat(e.chapter),selected:e.selected}})),label:"Bicher a Lektiounen",onSelect:function(e){var n=J.booksAndChapters.find((function(n){return n.id===e}));n.selected=!n.selected}})}var G,q,Y=function(e){return Object(h.a)(F||(F=Object(d.a)(["\n  label: navbar;\n\n  display: flex;\n  width: ",";\n  height: 100px;\n\n  margin: auto;\n  padding: 12px 0;\n\n  .page-name-wrapper {\n    display: flex;\n    flex: 12 6 200px;\n\n    height: 100%;\n    align-items: center;\n  }\n\n  .link-wrapper {\n    display: flex;\n    flex: 1 2 300px;\n    font-size: ",";\n\n    height: 100%;\n    align-items: center;\n\n    margin-top: 8px;\n  }\n\n  .page-name {\n    font-size: ",";\n    margin: 16px 16px 14px;\n    color: ",";\n  }\n"])),e.sizes.width.content,e.sizes.font.text,e.sizes.font.subHeadline,e.shades.text)};function V(){var e=b();return Object(h.b)("div",{css:Y(e)},Object(h.b)("div",{className:"page-name-wrapper"},Object(h.b)("span",{className:"page-name"},"L\xebtzebuergesch l\xe9ieren"),Object(h.b)(Q,null)))}function Z(e){return Object(h.a)(G||(G=Object(d.a)(["\n    label: ArtikeleMatchen-page;\n\n    display: flex;\n\n    margin: 80px auto;\n    flex-direction: column;\n    width: 70%;\n    text-align: center;\n\n    .welcome {\n      font-size: ",";\n      color: ",";\n    }\n\n    .instruction {\n      font-size: ",";\n      color: ",";\n    }\n  "])),e.sizes.font.welcome,e.shades.text,e.sizes.font.headline,e.shades.text)}function $(e){return Object(h.a)(q||(q=Object(d.a)(["\n    label: ArtikeleMatchen-page;\n    height: 80%;\n\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n\n    .header {\n      display: flex;\n      width: 70%;\n      margin: auto;\n      align-content: center;\n      justify-content: space-around;\n      padding: 16px;\n      text-align: left;\n\n      > * {\n        flex: 1 0 0;\n        color: ",";\n        font-size: ",";\n        text-align: center;\n      }\n\n      .name {\n        text-align: left;\n      }\n    }\n\n    .scrollable-content {\n      overflow-y: auto;\n      height: calc(100% - 60px);\n    }\n\n    .correct {\n      background-color: green !important;\n    }\n\n    .incorrect {\n      background-color: red !important;\n    }\n\n    .width-wrapper {\n      width: 40%;\n      height: 50%;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n    }\n\n    .word-card {\n      display: flex;\n      justify-content: space-between;\n      flex-direction: column;\n      background-color: white;\n      height: 80%;\n      border-radius: 4px;\n      padding: 8px;\n    }\n\n    .help {\n      flex: 4 0 0;\n      font-size: ",";\n      align-self: flex-end;\n      display: flex;\n      width: 100%;\n      justify-content: space-between;\n\n      span {\n        width: 10px;\n        height: 10px;\n        cursor: pointer;\n      }\n    }\n\n    .word {\n      display: flex;\n      flex: 12 0 0;\n      font-size: ",";\n      align-self: center;\n\n      span {\n        display: flex;\n        margin: auto;\n      }\n    }\n\n    .translation {\n      flex: 6 0 0;\n      font-size: ",";\n      align-self: center;\n\n      span {\n        margin: auto;\n      }\n    }\n\n    .artikelen {\n      display: flex;\n      justify-content: space-between;\n      flex-direction: column;\n      width: 100%;\n    }\n\n    .artikele-option {\n      flex: 12 0 0;\n      border-radius: ",";\n      height: ",";\n      background-color: ",";\n      cursor: pointer;\n      text-align: center;\n      margin-top: 16px;\n    }\n\n    .artikele-option-label {\n      margin: auto;\n      color: ",";\n      vertical-align: middle;\n      font-size: ",";\n    }\n\n    //desktop\n    @media only screen and (min-width: 768px) {\n      .artikelen {\n        flex-direction: row;\n      }\n\n      .artikele-option {\n        margin: 0 8px 0 8px;\n      }\n\n      .word-card {\n        box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 40%);\n      }\n\n      .help {\n        font-size: ",";\n      }\n\n      .word {\n        font-size: ",";\n      }\n\n      .translation {\n        font-size: ",";\n      }\n    }\n  "])),e.shades.text,e.sizes.font.smallText,e.sizes.font.smallText,e.sizes.font.text,e.sizes.font.smallText,e.sizes.borderRadius.selection,e.sizes.height.selection,e.shades.separation,e.colors.cardBackground,e.sizes.font.text,e.sizes.font.text,e.sizes.font.subHeadline,e.sizes.font.text)}function ee(){var e=Object(O.a)(),n=Object(D.a)(e,1)[0],t=b();return i.a.createElement("div",{css:Z(t)},i.a.createElement("span",{className:"welcome"},n("welcome")),i.a.createElement("span",{className:"instruction"},n("artikeleMatchenInstruction")))}function ne(){return Object(h.b)(i.a.Suspense,{fallback:Object(h.b)(ee,null)},Object(h.b)(le,null))}var te,re,ae=["h","a","t","z","i","y","e","n","d","u","o"];!function(e){e.DE="De",e.DEN="Den",e.D="D'"}(te||(te={})),function(e){e.OPEN="OPEN",e.CORRECT="CORRECT",e.INCORRECT="INCORRECT"}(re||(re={}));var oe=Object(w.proxy)({filteredWords:function(){return X.getCurrentDataAdapted().words.filter((function(e){return J.booksAndChapters.filter((function(e){return e.selected})).map((function(e){var n=e.id.split("-"),t=Object(D.a)(n,2);return{book:t[0],chapter:t[1]}})).find((function(n){var t=n.book,r=n.chapter;return t===e.book&&r===e.chapter}))}))},showTranslation:!1,resolvedState:re.OPEN});var ie,ce,le=function(){var e,n,t=b();S(X),Object(w.useSnapshot)(J);var r=Object(w.useSnapshot)(oe);function a(){return function(e){for(var n=e.length-1;n>0;n--){var t=Math.floor(Math.random()*(n+1)),r=[e[t],e[n]];e[n]=r[0],e[t]=r[1]}return e}(r.filteredWords().slice(0))[0]}void 0===r.currentWord&&(oe.currentWord=a());var o=r.resolvedState===re.CORRECT?"correct":r.resolvedState===re.INCORRECT?"incorrect":"";return Object(h.b)("div",{css:$(t),onClick:function(){return r.resolvedState!==re.OPEN&&(oe.resolvedState=re.OPEN,oe.resolvedArtikele=void 0,oe.showTranslation=!1,void(oe.currentWord=a()))}},Object(h.b)("div",{className:"width-wrapper"},Object(h.b)("div",{className:"word-card ".concat(o)},Object(h.b)("div",{className:"help"},Object(h.b)("span",{onClick:function(){oe.showTranslation=!0}},"?")),Object(h.b)("div",{className:"word"},Object(h.b)("span",null,null===(e=r.currentWord)||void 0===e?void 0:e.singular)),Object(h.b)("div",{className:"translation"},Object(h.b)("span",null,r.showTranslation&&"(".concat(null===(n=r.currentWord)||void 0===n?void 0:n.translation,")")))),Object(h.b)("div",{className:"artikelen"},[te.D,te.DE,te.DEN].map((function(e){return Object(h.b)(se,{key:"".concat(e,"-option"),artikele:e,resolvedStateClass:o})})))))};function se(e){var n=Object(w.useSnapshot)(oe);function t(e){oe.resolvedState=re.INCORRECT,oe.resolvedArtikele=e}function r(e){oe.resolvedState=re.CORRECT,oe.resolvedArtikele=e}return Object(h.b)("div",{className:"artikele-option ".concat(n.resolvedArtikele===e.artikele?e.resolvedStateClass:""),onClick:function(){return function(e){var a,o,i;switch(e){case te.D:[I.WEIBLECH,I.SAECHLECH].includes(null===(a=n.currentWord)||void 0===a?void 0:a.sex)?r(e):t(e);break;case te.DE:(null===(o=n.currentWord)||void 0===o?void 0:o.sex)!==I.MAENNLECH||ae.includes(n.currentWord.singular[0].toLocaleLowerCase())?t(e):r(e);break;case te.DEN:(null===(i=n.currentWord)||void 0===i?void 0:i.sex)===I.MAENNLECH&&ae.includes(n.currentWord.singular[0].toLocaleLowerCase())?r(e):t(e)}}(e.artikele)}},Object(h.b)("span",{className:"artikele-option-label"},e.artikele))}function ue(e){return Object(h.a)(ce||(ce=Object(d.a)(["\n    label: home-page;\n\n    display: flex;\n    flex-direction: column;\n    margin: auto;\n\n    width: 30%;\n\n    .list-element {\n      width: 100%;\n      border-radius: ",";\n      height: ",";\n      background-color: ",";\n      cursor: pointer;\n      text-align: center;\n    }\n\n    .list-element-label {\n      margin: auto;\n      color: ",";\n      vertical-align: middle;\n      font-size: ",";\n    }\n\n  "])),e.sizes.borderRadius.selection,e.sizes.height.selection,e.shades.separation,e.colors.cardBackground,e.sizes.font.text)}!function(e){e.HOME="/home",e.ARTIKELE_MATCHEN="/artikele-matchen"}(ie||(ie={}));var de=[{route:ie.ARTIKELE_MATCHEN,label:"Artikele matchen"}];function he(){var e=Object(u.g)(),n=b(),t=o.useCallback((function(n){e.push(n)}),[e]);return Object(h.b)("div",{css:ue(n),className:"list"},de.map((function(e){var n=e.route,r=e.label;return Object(h.b)("div",{key:n,className:"list-element",onClick:function(){return t(n)}},Object(h.b)("span",{className:"list-element-label"},r))})))}var fe=function(){return o.createElement(p.Provider,{value:f},o.createElement(v,null,o.createElement(m,null,o.createElement(s.a,null,o.createElement(V,null),o.createElement(u.d,null,o.createElement(u.b,{path:ie.ARTIKELE_MATCHEN},o.createElement(ne,null)),o.createElement(u.b,{path:ie.HOME},o.createElement(he,null)),o.createElement(u.b,{path:"/"},o.createElement(u.a,{to:ie.HOME})))))))},pe=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,62)).then((function(n){var t=n.getCLS,r=n.getFID,a=n.getFCP,o=n.getLCP,i=n.getTTFB;t(e),r(e),a(e),o(e),i(e)}))};l.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(fe,null)),document.getElementById("root")),pe()}},[[59,1,2]]]);
//# sourceMappingURL=main.24ff940e.chunk.js.map