=== Really Simple SSL pro multisite ===
Contributors: RogierLankhorst
Tags: mixed content, insecure content, secure website, website security, ssl, https, tls, security, secure socket layers, hsts, multisite
Requires at least: 5.7
License: license.txt
Tested up to: 6.3
Requires PHP: 7.2
Stable tag: 7.0.2

Premium support and extra features for Really Simple SSL

== Description ==
Really Simple SSL Pro multisite is Really Simple SSL pro with dedicated multisite features.

= Installation =
* Install the Really Simple SSL plugin, which is needed with this one.
* Go to “plugins” in your Wordpress Dashboard, and click “add new”
* Click “upload”, and select the zip file you downloaded after the purchase.
* Activate
* Navigate to “settings”, “SSL”.
* Click “license”
* Enter your license key, and activate.

For more information: go to the [website](https://www.really-simple-ssl.com/), or
[contact](https://www.really-simple-ssl.com/contact/) me if you have any questions or suggestions.

== Frequently Asked Questions ==

== Changelog ==
= 7.0.2 =
* July 6th 2023
* Improvement: prevent use of subdirectories in custom login url

= 7.0.1 =
* Fix: change login url functionality not working in 7.0

= 7.0.0 =
* New: Vulnerability Detection is in Beta - [Read more](https://really-simple-ssl.com/vulnerability-detection/)

= 6.2.5 =
* Improvement: stop trying the database rename if it fails on first attempt

= 6.2.4 =
* New: change login url
* Fix: Exclude deprecated x-content-security-policy from header detection
* Improvement: Update to functional components Rest API for free core
* Improvement: Disable Content Security Policy if the maximum header size has been reached

= 6.2.3 =
* Fix: rename db prefix using not available function

= 6.2.2 =
* Fix: follow redirects in third party header detection.

= 6.2.1 =
* Fix: prefix replacement in wp-config too broad, causing issues if wp_ is used other then in the prefix.
* Fix: Update prefix site_id in user roles when changing the database prefix, to preserve capabilities for users in subsites

= 6.2.0 =
* Improvement: add support for BLOB and Filesystem
* Improvement: disable CSP reporting mode paused status when switching to disabled or enforced

= 6.1.1 =
* Fix: not all security settings available on multisite
* Improvement: Use ABSPATH constant instead of path when writing path to debug.log
* Fix: script-src-elem in Content Security Policy not including source URL

= 6.1.0 =
* Improvement: CSP policy for back and front-end separate
* Improvement: also allow non-recommended X-XSS options
* Improvement: frame ancestors allow other values than 'none'

= 6.0.5 =
* Fix: Debug.log setting not saving on first save action

= 6.0.4 =
* New: automatically detect wrong Security Header values from other sources, and duplicate headers
* Improvement: auto enable Insecure Requests header only when SSL enabled
* Improvement: remove unnecessary notices load in licenses block

= 6.0.3 =
* Fix: isset check on $_SERVER['HTTPS'] to support environments where this key is missing
* Improvement: add headers_set() check for situations where the headers already have been sent, possibly due to an error earlier in the system.
* Improvement: Update CSP reporting URI on permalink structure change

= 6.0.2 =
* Fix: HSTS not running on hosting environments with load balanced configuration because SSL is not detected
* Fix: when wp-config.php is not writable, renaming database prefix could cause tables to get removed

= 6.0.1 =
* Fix: upgrade to 6 logic running more than once

= 6.0.0 =
* Tested up to WordPress 6.1.0
* Improvement: User Interface
* New: Server Health Check - powered by SSLLabs
* New: WordPress Hardening Features

= 5.5.3 =
* Fix: advanced-headers.php did not generated CSP correctly
* Fix: Browsers support for new report-to reporting attribute not good enought to use it yet.

= 5.5.2 =
* Dropped PHP header in favor of advanced-headers.php

= 5.5.1 =
* Fix: Missing file in core loader

= 5.5.0 =
* New: introducing advanced-headers.php, a robust and stable method to set headers in all types of configurations and caching configurations

= 5.4.0 =
* Improvement: New default Referrer Policy => strict-origin-when-cross-origin
* Improvement: New default for X-XSS header
* Improvement: Dropped Expect-CT header as it's now deprecated, integrated by default in certificates
* Improvement: Updated Permissions Policy with improved defaults, updated to new values as currently supported in browsers
* Improvement: dropped access-control-allow-origin header, as it can only be used dynamically, which is not feasible in most WP environments

= 5.3.6 =
* Improvement: new languages
* Improvement: several small bug fixes and typo's

= 5.3.5.1 =
* Fix: new license check causing continuous license checking, resulting in slow response

= 5.3.5 =
* Improvement: language files
* Improvement: some small bug fixes

= 5.3.4 =
* Improvement: language files
* Change: license

= 5.3.3 =
* Removed credentialless from CORP setting as it caused some issues with embedded videos

= 5.3.2 =
* Fix: PHP <7 compatibility

= 5.3.1 =
* Improvement: fix site health still showing header notice if activated in pro
* Improvement: set ssl verify to false on failed license check
* Improvement: improved CORS settings

= 5.3.0 =
* Improvement: add support for report-to in CSP
* Improvement: increase CSP display limit

= 5.2.4 =
* Improvement: feedback on not detected headers

= 5.2.3.1 =
* Fix: Rest API and pretty permalinks check inverted, causing false positive notification in dashboard about the permalink structure

= 5.2.3 =
* Improvement: various Content Security Improvements: added override to 20 reporting/100 display limit. Fixed CSS when 100+ pages
* Improvement: added default required WordPress rules to Content Security Policy
* Improvement: fixed advanced header warning position
* Disable scan on invalid license
* Improvement: moved recommended security headers notice to free, added override in Pro
* Added Cross-Origin resource policy security headers

= 5.2.2 =
* Fix: double quotes in php headers causing issues since recent browser updates

= 5.2.1 =
* Improvement: replaced admin notice on inactivate license
* Improvement: move security headers above WP Rocket .htaccess rules to prevent compatibility issues
* Improvement: enable auto updates
* Improvement: Content Security Policy did not allow for wss:// and ws:// web socket protocol
* Improvement: removed trailing slash from rest api
* Improvement: added rsssl_pause_after_request_count filter to adjust request count on which CSP pauses
* Improvement: fixed some reporting variations

= 5.2.0 =
* Improvement: changed PHP header option to dropdown
* Improvement: remove unnecessary parameter in file scan
* Improvement: request header origin sometimes returns null. Changing to 'host' resolves the Content Security Policy reporting API in those cases
* Improvement: styling issue on scan UX

= 5.1.0 =
* Improvement: comment on multisite environments caused layout issue

= 5.0 =
* Updated translations

= 4.1.11 =
* Fix: for very long .htaccess files, support form in the plugin gave an invalid response. props Vincent

= 4.1.10 =
* Fix: typo in reset license key obfuscation
* Translations update

= 4.1.9 =
* Improvement: 'none' or '*' attribute deprecated for Permissions Policy
* Improvement: Content Security Policy for unsafe inline
* Improvement: Interest Cohort added to permissions policy

= 4.1.8 =
* Fix: PHP headers were set with quotes, causing issues on some servers.
* Fix: When switching from "enforce" to "paused", CSP headers were not removed
* Improvement: generalized wrap_header function for more robust header generation
* Improvement: disable remove .htaccess headers on activation of PHP headers.

= 4.1.7 =
* Moved secure cookies to free

= 4.1.6 =
* Improved WP Engine compatibility
* Improved Content Security Policy, added option to revoke result from overview
* Lowered Content Security Policy request limit

= 4.1.5 =
* Fix: set defaults firing even when dependency check not validated
* Fix: Constant RSSSL_DOING_CSP not set when running the CSP API

= 4.1.4 =
* Improvement: Added report-paused mode to Content Security Policy generator. Reporting will now automatically pause after 200 requests to prevent high server load
* Improvement: Further restricted access to Content Security Policy generator REST API calls
* Fix: Default options won't be reconfigured after plugin deactivation/activation

= 4.1.3 =
* Improvement: wrap example code in comments
* Made PHP header option available on all configurations

= 4.1.2 =
* Fix: File name in upgrade function

= 4.1.1 =
* Fix: condition for .htaccess writing in combination with do not edit .htaccess option

= 4.1.0 =
* New: PHP headers support for all security headers, autodetecting necessity for NGINX.
* New: Changed feature policy into permissions policy.

= 4.0.7 =
* Fix: always activate multisite license for main site url

= 4.0.6 =
* Improvement: moved renamed folder notice to free plugin
* Improvement: PHP 8 compatibility

= 4.0.5 =
* Improvement: 404 redirect check expiration set to one year when test is successful
* Fix: multisite license decoding key not stored on network level

= 4.0.4 =
* Fix: hsts header on multisite not saving

= 4.0.3 =
* Fix: network settings link
* Fix: multisite hsts preload option not saving
* Improvement: License notifications. Differ between remaining activations when current site is activated, and when not.

= 4.0.2 =
* Improvement: exclude .htaccess from edits outside settings page

= 4.0.1 =
* Fix: decode license for support ticket
* Fix: made some untranslatable strings translatable

= 4.0.0 =
* New user interface
* Fix: transient stored with 'WEEK_IN_SECONDS' as string instead of constant
* Improvement: notices dashboard, with dismissable notices
* Improvement: improved naming of settings, and instructions
* Improvement: new translations
* Improvement: new fix options in scan
* Fix: scan mixed content detection false positive
* Improvement: removal of .htaccess lines and wpconfig lines on deactivation
* Fix: CSP generation bug for some types
* Fix: is_writable check on secure cookies write
* Improvement: do not insert default security headers if SSL not enabled yet

= 2.0.35 =
* Extend uninstall options cleanup
* PHP Docs
* Fix: when installed on non multisite environments, a php notice was shown regarding a multisite option

= 2.0.34 =
* Restricted assets to only load on settings page

= 2.0.33 =
* Improved Elementor URL update
* Improvement: add env=https based on apache version, if available.

= 2.0.32 =
* Fix: defaults for feature policy header not set correctly.
* Improvement: directory check for free plugin

= 2.0.31 =
* Automatically replace Elementor URL's
* Added function_exists checks

= 2.0.30 =
* Added Feature Policy security header

= 2.0.29 =
* Added plugin settings link to network plugin overview

= 2.0.28 =
* Added security headers tab if SSL is activated networkwide

= 2.0.27 =
* Sites overview tab now also shows private sites

= 2.0.25 =
* Added right-to-left text support
* Improved licensing notices
* Fix: certificate expiration date only shows when option has been checked.

= 2.0.24 =
* fixed a bug where a deprecated function could be called

= 2.0.23 =
* Tweak: updated dashboard structure

= 2.0.22 =
* Fix: renamed class caused ajax call not to execute, preventing enabling of sites in the network settings

= 2.0.21 =
* Tweak: notices no longer being shown on Gutenberg edit screens
* Tweak: limit activation to public sites
* Tweak: updated license tab
* Fix: plugin now shows correct blog count for multi-networks

= 2.0.20 =
* Fix: fixed a bug in redirect_to_http() function.

= 2.0.19 =
* Added support tab
* Tweak: improved mixed content scan regexes
* Tweak: added a redirect to http:// check before activating SSL

= 2.0.18 =
* Fix: fixed a bug where ignored url's were being added to the ignored url's array, even if they were already present.
* Tweak: the /plugins/, /wp-admin/ and /wp-includes/ directories have been excluded from the scan to increase performance.

= 2.0.17 =
* Tweak: removed HTML from translatable strings

= 2.0.16 =
* Tweak: updated notices to be in line with free notices

= 2.0.15 =
* Fix: limited the datatables Javascript to settings page
* Fix: removed HSTS warning from site dashboard when plugin is per site enabled
* Fix: HSTS link now points to network settings menu

= 2.0.14 =
* Fix: limited enqueue to settings page

= 2.0.13 =
* Added datatables for sites overview

= 2.0.12 =
* Tweak: when the scan is finished it now shows the text Scan Finished and the progress bar turns green
* Fix: improved external css and js detection regex pattern

= 2.0.11 =
* Fix: run javascript only on own settings page
* Fix: ajax url on some functions not correct
* Fix: scan results only outputting after a refresh

= 2.0.10 =
* Tweak: updated the scan cron to prevent it from running without first starting the scan manually

= 2.0.9 =
* fix: remove cookie settings now only executes if there are cookie settings in the wp-config.php

= 2.0.8 =
* Updated the scan functionality with usage of cron

= 2.0.7 =
* Fix: updated secure logged in cookie function
* Fix: removed license tab from subsites

= 2.0.6 =
* Tweak: added a header to force insecure requests over https
* Tweak: updated the scan to also include the image widget
* Tweak: added secure logged in cookie filter

= 2.0.5 =
* Fix: the plugin will no longer scan its own folder for mixed content
* Fix: the scan now contains a number of common false positives in the $safe_domains array to prevent them showing up in the scan

= 2.0.4 =
* Tweak: option to disable flushing of rewrite rules on activation
* Tweak: added warning when using PHP HSTS headers
* Tweak: prefixed icon classnames
* Fix: secure cookie settings are now removed on plugin deactivation

= 2.0.3 =
* Fix: Activation message visible on subsites
* Tweak: added secure cookie settings for networkwide activated SSL setups.
* Tweak: updated the Easy Digital Downloads plugin updater to version 1.6.14

= 2.0.2 =
* Fix: hsts preload option not appearing in network settings page

= 2.0.1 =
* Fix: after activating license, user was redirected to a site settings page, causing the “activate your license” nag not to get dismissed.

= 2.0.0 =
* Fix: moved scan data to transients, so large scan data arrays won't clutter the database
* Updated the 'Scan for issues tab'
* Fix: scan results are now shown in a responsive layout
* Fix: fixed a bug where protocol independent (//) files and/or stylesheet were not being scanned

= 1.0.3 =
* Fix: adjusted the HSTS header so it will also work in three redirects
* Fix: not all hot linked images were matched correctly in the scan

= 1.0.2 =
* Fix: When mixed content fixer is activated, urls are replaced to https, which prevented the scanner from finding these urls. A replace to http fixes this.
* Fix: Regex pattern updated to match the pattern in the free version, to prevent cross elemen matches.
* Fix: Changed priority of main class instantiation to make sure it instantiates after the core plugin

= 1.0.1 =
* Fixed issue where preload HSTS setting wasn't saved when HSTS header was already in place.
* limited .htaccess edit to settings save action.

== Upgrade notice ==

== Screenshots ==
