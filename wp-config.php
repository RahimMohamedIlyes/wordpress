<?php
define( 'WP_CACHE', true ); // Added by WP Rocket

define('WP_AUTO_UPDATE_CORE', 'minor');
define('WP_HOME','http://fmtperformance.com');
define('WP_SITEURL','http://fmtperformance.com');
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 
 /* @package WordPress
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'fmtperfo_wp');
/** MySQL database username */
define('DB_USER', 'fmtperfo_wpuser');
/** MySQL database password */
define('DB_PASSWORD', '597c9243fa43f3f08bd5d3');
/** MySQL hostname */
define('DB_HOST', 'localhost');
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');
/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'FGWD^Fh]eZ&@;?:(P&7=EoB,v^]=$3Zj~RIY;+,bD1Kh#+C)%98$LeJRcA^TKbI0');
define('SECURE_AUTH_KEY',  'SSlfhP 0HaEH+n9uN}Z7ACFa{[:qC?q?m(F+R-T`Yz`HUg&R,C373>*7Nnr ;FBm');
define('LOGGED_IN_KEY',    'p,$wBVQSMO!iSk[FA `L|koS%0;_b=++IfJajU%noFPh7_##4eY*F>Z& ]fyyjv6');
define('NONCE_KEY',        'Q,3^[00#?dmlC-n.!tJ-4DN#k=Hv[-^K,/|uL4#c}ql,8!&tR,fu!!H|/GzJ%[j2');
define('AUTH_SALT',        '#X:Su_mqZ_TOh|]K>PNy2F:K@bQF0vS!ixOUJ]crPxleWWS*u7wb 0D2@C zbg%v');
define('SECURE_AUTH_SALT', 'H2))p%L(N$_|rsNl%koBQw*lGFJWwUmAW!#>#!D!YQFqa7)bpO^z_I*[W:}qAH$G');
define('LOGGED_IN_SALT',   'S9S P@&jg`MSBA=Q*qWa2NJyq{=&OHJ!h[g6v^yC$W;4v*]JIbF.qi6N}qlhS86q');
define('NONCE_SALT',       'xmJEE8h*2(_Y&-]B{qrL#XbRt7(C4@c yjp3(#rULfgw?rMzEkUs9a6O$<~~avZm');
/**#@-*/
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'qYsfL6IC5_';
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);
/* Multisite */
define( 'WP_ALLOW_MULTISITE', true );
define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', true);
define('DOMAIN_CURRENT_SITE', 'fmtperformance.com');
define('PATH_CURRENT_SITE', '/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);
define ('FORCE_SSL_ADMIN' , true);
define( 'CONCATENATE_SCRIPTS', false );
define( 'DISALLOW_FILE_EDIT', true );
/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
