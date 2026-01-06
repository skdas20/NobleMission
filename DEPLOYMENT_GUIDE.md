# Noble Mission WordPress Deployment Guide

## Files to Upload
1. **noblemission_wordpress.tar.gz** (27MB) - Complete WordPress installation
2. **noblemission_db.sql** (1.2MB) - Database export

---

## Server Requirements
- PHP 8.0 or higher
- MySQL/MariaDB 5.7 or higher
- Apache with mod_rewrite enabled
- Required PHP extensions: mysqli, gd, curl, mbstring, xml, zip

---

## Deployment Steps

### Step 1: Create Directory on Server
```bash
ssh root@82.29.162.16
cd /var/www/
mkdir noblemission
cd noblemission
```

### Step 2: Upload Files
Upload both files to `/var/www/noblemission/` on your server using SCP, FTP, or your hosting control panel.

**Option A - Using SCP (from your local machine):**
```bash
scp noblemission_wordpress.tar.gz root@82.29.162.16:/var/www/noblemission/
scp noblemission_db.sql root@82.29.162.16:/var/www/noblemission/
```

**Option B - Using cPanel/Plesk:**
- Use File Manager to upload to `/var/www/noblemission/`

### Step 3: Extract WordPress Files
```bash
cd /var/www/noblemission/
tar -xzf noblemission_wordpress.tar.gz
mv wordpress/* ./
rm -rf wordpress noblemission_wordpress.tar.gz
```

### Step 4: Create Database
```bash
# Login to MySQL
mysql -u root -p

# In MySQL prompt:
CREATE DATABASE noblemission_wp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'noblemission_user'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON noblemission_wp.* TO 'noblemission_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 5: Import Database
```bash
mysql -u noblemission_user -p noblemission_wp < noblemission_db.sql
rm noblemission_db.sql  # Clean up
```

### Step 6: Update WordPress Configuration
```bash
cd /var/www/noblemission/
nano wp-config.php
```

Update these lines:
```php
define('DB_NAME', 'noblemission_wp');
define('DB_USER', 'noblemission_user');
define('DB_PASSWORD', 'YOUR_STRONG_PASSWORD_HERE');
define('DB_HOST', 'localhost');
```

**IMPORTANT:** Update the site URL:
```php
// Add these lines after the database settings
define('WP_HOME', 'http://82.29.162.16/noblemission');
define('WP_SITEURL', 'http://82.29.162.16/noblemission');
```

Or if you have a domain:
```php
define('WP_HOME', 'http://yourdomain.com');
define('WP_SITEURL', 'http://yourdomain.com');
```

### Step 7: Update Database URLs
```bash
mysql -u noblemission_user -p noblemission_wp
```

Run these queries:
```sql
UPDATE wp_options SET option_value = 'http://82.29.162.16/noblemission' WHERE option_name = 'siteurl';
UPDATE wp_options SET option_value = 'http://82.29.162.16/noblemission' WHERE option_name = 'home';
EXIT;
```

Replace `http://82.29.162.16/noblemission` with your actual domain/path.

### Step 8: Set Permissions
```bash
cd /var/www/noblemission/
chown -R www-data:www-data .
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;
chmod 600 wp-config.php
```

### Step 9: Configure Apache Virtual Host

Create new config file:
```bash
nano /etc/apache2/sites-available/noblemission.conf
```

Add this configuration:
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    
    DocumentRoot /var/www/noblemission
    
    <Directory /var/www/noblemission>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/noblemission_error.log
    CustomLog ${APACHE_LOG_DIR}/noblemission_access.log combined
</VirtualHost>
```

**If using subdirectory instead of domain:**
```apache
Alias /noblemission /var/www/noblemission

<Directory /var/www/noblemission>
    Options -Indexes +FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

Enable the site:
```bash
a2ensite noblemission.conf
a2enmod rewrite
systemctl restart apache2
```

### Step 10: Test the Site
Visit: `http://82.29.162.16/noblemission` or `http://yourdomain.com`

**Login credentials:**
- URL: `http://yoursite.com/wp-admin`
- Username: (your admin username)
- Password: (your admin password)

---

## Troubleshooting

### If you see "Error establishing database connection":
1. Check wp-config.php database credentials
2. Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`
3. Verify user permissions: `mysql -u root -p -e "SHOW GRANTS FOR 'noblemission_user'@'localhost';"`

### If pages show 404 errors:
1. Check .htaccess exists in `/var/www/noblemission/`
2. Ensure mod_rewrite is enabled: `a2enmod rewrite`
3. Check AllowOverride is set to All in Apache config
4. Restart Apache: `systemctl restart apache2`

### If images/CSS not loading:
1. Check file permissions
2. Update URLs in database (Step 7)
3. Clear browser cache

### To reset admin password:
```bash
mysql -u noblemission_user -p noblemission_wp
```
```sql
UPDATE wp_users SET user_pass=MD5('newpassword123') WHERE user_login='admin';
```

---

## Post-Deployment Checklist
- [ ] Site loads correctly
- [ ] Admin panel accessible
- [ ] All pages display properly (Home, About, Gallery, FAQ, Contact, Insights)
- [ ] Navigation menu works
- [ ] Blog posts show on Insights page
- [ ] Contact form works
- [ ] Images load correctly
- [ ] SSL certificate installed (recommended)
- [ ] Backup configured

---

## Important Notes

1. **Security:** Change the database password to something strong
2. **Backups:** Set up regular backups of `/var/www/noblemission/` and database
3. **SSL:** Install SSL certificate for HTTPS (use Let's Encrypt/Certbot)
4. **Updates:** Keep WordPress core and theme files updated

---

## Files Included in Export

### WordPress Installation (noblemission_wordpress.tar.gz)
- WordPress core files (version 6.9)
- Noble Mission custom theme with all templates
- All CSS, JavaScript, and image assets
- wp-config.php (needs updating with new database credentials)

### Database (noblemission_db.sql)
- All WordPress tables
- 6 Pages: Home, About Us, Gallery, FAQ, Contact Us, Insights
- 4 Blog posts
- Theme settings and configurations
- Contact form submissions table

---

## Need Help?

If you encounter any issues:
1. Check Apache error logs: `tail -f /var/log/apache2/error.log`
2. Check PHP errors: Enable WP_DEBUG in wp-config.php
3. Verify PHP version: `php -v` (should be 8.0+)
4. Test database connection: `mysql -u noblemission_user -p noblemission_wp -e "SELECT COUNT(*) FROM wp_posts;"`

---

**Your WordPress site is ready to deploy!** 🚀
