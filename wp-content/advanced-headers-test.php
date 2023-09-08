<?php
/**
* This file is created by Really Simple SSL to test the CSP header length
* It will not load during regular wordpress execution
*/


if ( !headers_sent() ) {
header("Cross-Origin-Resource-Policy: cross-origin");
header("X-REALLY-SIMPLE-SSL-TEST: oI%EB%89%23%A0t%3B%B4H%FF%C1%B4%CD%91%BF%FC%14%25%04l%D7YMG%D0HRnh%7B%84%BC%7D%91%02%9CZF%11%15C%D5A%14%D5%93%17wYpM%B9W%F5%E4%BD%E8%02%11c%1A0%5B%C6%7FO%D0%85%29%C8%24%85D%3C%D4C%FF%A6-%EE%1F5K%DE%A30%F5%9D%99%B0%DE%22%2F%B1s%08%3F%A1%05%B8%91c%DD%25J1%C0%C3%A9%17%7C%B9%FE%09%B2%26%11%AB%19%0Awo%81%98%97%C9%B0%AA%B1%1B2%BC%7C%DA%E7o%9C%0F%F1%0C%1C%01%12%1B%96%ED%B3%97%E8%F3%D9%CC%E7n%E0%F8_%04%7F%AF%C6%ED%1C%24%B7ne%D3%ED%1D%AE%1A%02U%E9%16%0B%40vT%FB%C4%2Aj%01%B5%2A%9F%86v%1D%E4Rb%2CB%9E%B9%82");
}

 echo '<html><head><meta charset="UTF-8"><META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW"></head><body>Really Simple SSL headers test page</body></html>';