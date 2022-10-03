// ==UserScript==
// @name         GCWebMessenger
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Matt McPhee Demo Script
// @author       matt.mcphee@genesys.com
// @match        http*://*/*
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js
//
// @downloadURL  https://github.com/darren-adrian/tampermonkey/raw/main/GCWebMessenger.user.js
// @updateURL  https://github.com/darren-adrian/tampermonkey/raw/main/GCWebMessenger.user.js
// ==/UserScript==
(function() {

    'use strict';
    jQuery.noConflict();
    jQuery("head").append(`

<script type="text/javascript" charset="utf-8">
  (function (g, e, n, es, ys) {
    g['_genesysJs'] = e;
    g[e] = g[e] || function () {
      (g[e].q = g[e].q || []).push(arguments)
    };
    g[e].t = 1 * new Date();
    g[e].c = es;
    ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8'; document.head.appendChild(ys);
  })(window, 'Genesys', 'https://apps.mypurecloud.com.au/genesys-bootstrap/genesys.min.js', {
    environment: 'apse2',
    deploymentId: '36d55c99-c16a-46de-87e7-f84114adc2fd',
    debug: true
  });
</script>

<meta name="referrer" content="no-referrer-when-downgrade" />
`);

    jQuery(document).ready(function() { //When document has loaded

            //-------------------------------------------------------BASIC SECTION------------------------------------------------------------------------------------------------

            //Alt+9
            function PageView() { Genesys('command', 'Journey.pageview', {}) }
            //Alt+8
            function Search() { Genesys('command', 'Journey.record', {eventName: 'search_performed', customAttributes: { label: 'search performed', Search: "whats my TFN" },}) }
            //Alt+7
            function FormSubmitted() { Genesys('command', 'Journey.record', {eventName: 'form_submitted', customAttributes: { label: 'form submitted'},}) }
            //Alt+6
            function FormAbandoned() { Genesys('command', 'Journey.record', {eventName: 'form_abandoned', customAttributes: { label: 'form abandoned'},}) }
            //Alt+5
            function webChat() { Genesys('command', 'Journey.record', {eventName: 'GenericMessage', customAttributes: { label: 'Resedency'},})}
            //Alt+4
            function Identify() {
            Genesys("command", "Journey.pageview", {customAttributes: {"email":"julia_t@email.com", "givenName": "Julia"}, traitsMapper: [{"fieldName":"email"}, {"fieldName":"givenName"}]});
            }
            //Alt+3
            function RemovedFromCart() { Genesys('command', 'Journey.record', {eventName: 'product_removed', customAttributes: { label: 'product removed'},}) }
            //Alt+2
            function AddedToCart() { Genesys('command', 'Journey.record', {eventName: 'product_added', customAttributes: { label: 'product added', data: 'hello'},}) }
            //Alt+1
            function custom() { Genesys('command', 'Database.set', { messaging: { customAttributes: { customerId: "332b3d36-0238-4308-976c-18d7e0c16360", customerName: "Julia" }}}) }

            //-------------------------------------------------------USER SECTION------------------------------------------------------------------------------------------------
        if(document.domain === "www.csc.gov.auxxx"){
            try{
                Genesys("command", "Database.set", { messaging: { customAttributes: { customerId: '456115', customerName: 'Marcella' }}});
                console.log("customerId: " + '456115');
                console.log("customerName: " + 'Marcella');
            } catch(err){ console.error(err); }
        }

        if(document.domain === "luxuryescapes.com"){
            console.log('****')
            try{
                var token = document.cookie.match(RegExp('(?:^|;\\s*)' + "ssr_access_token".replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1') + '=([^;]*)'))[1];
                if(token != undefined){
                    fetch('https://api.luxuryescapes.com/me', {headers: {Authorization: 'Bearer ' + token}}).then(response => response.json()).then(data => {
                        console.log(data);
                        Genesys("command", "Journey.pageview", {customAttributes: {"email":data.result.email, "givenName": data.result.givenName}, traitsMapper: [{"fieldName":"email"}, {"fieldName":"givenName"}]});
                    });
                }
            } catch(err){ console.error(err); }
        }
            //-------------------------------------------------------END USER SECTION--------------------------------------------------------------------------------------------

            /////////////////////
            // HOT KEY MONITOTING
            /////////////////////
            function doc_keyUp(e) {

                if (e.altKey && e.keyCode == 49) {
                    console.log("alt+1");
                    custom();
                }
                if (e.altKey && e.keyCode == 50) {
                    console.log("alt+2");
                    AddedToCart();
                }
                if (e.altKey && e.keyCode == 51) {
                    console.log("alt+3");
                    RemovedFromCart();
                }
                if (e.altKey && e.keyCode == 52) {
                    console.log("alt+4");
                    Identify();
                }
                if (e.altKey && e.keyCode == 53) {
                    console.log("alt+5");
                    webChat();
                }
                if (e.altKey && e.keyCode == 54) {
                    console.log("alt+6");
                    FormAbandoned();
                }
                if (e.altKey && e.keyCode == 55) {
                    console.log("alt+7");
                    FormSubmitted();
                }
                if (e.altKey && e.keyCode == 56) {
                    console.log("alt+8");
                    Search();
                }
                if (e.altKey && e.keyCode == 57) {
                    console.log("alt+9 - PAGEVIEW");
                    PageView();
                }
            }
            document.addEventListener('keyup', doc_keyUp, false);

            //-------------------------------------------------------------------------------------------------------------------------------------------------------

            //Button to clear-Destroy AltoCloud session cookies
            var zNode = document.createElement('div');
            zNode.innerHTML = '<button id="myButton" type="button">' +
                'Clear Session</button>';
            zNode.setAttribute('id', 'myContainer');
            document.body.appendChild(zNode);

            //--- Activate the newly added button.
            document.getElementById("myButton").addEventListener(
                "click", ButtonClickAction, false
            );

            function ButtonClickAction(zEvent) {
                //localStorage.removeItem('_actmu');
                //localStorage.removeItem('_actec');
                Genesys('command', 'Identifiers.purgeAll')
                console.log('GPE Session Destroyed');
            }
        //Button to login session
            var zNode1 = document.createElement('div');
            zNode1.innerHTML = '<button id="myButton1" type="button">' +
                'Login Session</button>';
            zNode1.setAttribute('id', 'myContainer1');
            document.body.appendChild(zNode1);

            //--- Activate the newly added button.
            document.getElementById("myButton1").addEventListener(
                "click", ButtonClickAction1, false
            );

            function ButtonClickAction1(zEvent) {
                Identify();
                console.log('GPE Session Logged in');
            }
        }) //End of on ready
})();
